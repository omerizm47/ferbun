"""
Generate Kurmanji pronunciation clips with Meta MMS TTS
(facebook/mms-tts-kmr-script_latin) for EVERY Kurmanji string the app can speak,
and emit src/data/wordAudio.ts mapping each normalized string -> its bundled mp3.

Spoken sources:
  - vocabulary.ts  wordKu                      (flashcards)
  - exercises.ts   questionKu / questionKuTr   (exercise prompts + teach cards)
  - exercises.ts   correctAnswer(Tr)           (teach cards for "say X in Kurdish",
                                                i.e. exercises with no questionKu)

Clips are content-addressed (sha1 of the cleaned text), so a word reached via
different surfaces shares one file. Re-runnable: existing mp3s are skipped.

Run:  python scripts/generate_word_audio.py
Deps: torch (CPU), transformers, scipy, numpy, imageio-ffmpeg
"""
import re
import sys
import hashlib
import subprocess
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VOCAB = ROOT / "src" / "data" / "vocabulary.ts"
EXERCISES = ROOT / "src" / "data" / "exercises.ts"
OUT_DIR = ROOT / "assets" / "audio" / "words"
MAP_TS = ROOT / "src" / "data" / "wordAudio.ts"
MODEL_ID = "facebook/mms-tts-kmr-script_latin"

OUT_DIR.mkdir(parents=True, exist_ok=True)


def norm(s: str) -> str:
    return unicodedata.normalize("NFC", s).lower().strip()


def clean_for_synth(s: str) -> str:
    """Speak only the Kurmanji: drop a "= gloss" tail and fill-blank underscores."""
    s = re.split(r"\s*=\s*", s)[0]   # "na = yes" -> "na"
    s = s.replace("_", " ")           # "Tu ... ____." -> spaces
    return re.sub(r"\s+", " ", s).strip()


def collect():
    """Return dict: normalized spoken key -> original string."""
    items = []
    vtext = VOCAB.read_text(encoding="utf-8")
    items += re.findall(r"wordKu:\s*'([^']*)'", vtext)

    etext = EXERCISES.read_text(encoding="utf-8")
    for line in etext.splitlines():
        if "type:" not in line:
            continue
        m_ku = re.search(r"\bquestionKu:\s*'([^']*)'", line)
        if m_ku:
            items.append(m_ku.group(1))
            m_ku_tr = re.search(r"\bquestionKuTr:\s*'([^']*)'", line)
            if m_ku_tr:
                items.append(m_ku_tr.group(1))
        else:
            # No Kurmanji prompt -> the correct answer is the Kurmanji word
            # ("say/write X in Kurdish"), which becomes the spoken teach card.
            for field in ("correctAnswer", "correctAnswerTr"):
                m = re.search(rf"\b{field}:\s*'([^']*)'", line)
                if m:
                    items.append(m.group(1))
                m_arr = re.search(rf"\b{field}:\s*\[([^\]]*)\]", line)
                if m_arr:
                    items += re.findall(r"'([^']*)'", m_arr.group(1))

    by_key = {}
    for s in items:
        k = norm(s)
        if k and k not in by_key:
            by_key[k] = s
    return by_key



def main():
    spoken = collect()
    print(f"Collected {len(spoken)} distinct spoken Kurmanji strings")
    if not spoken:
        sys.exit("Nothing collected — check regexes / data format.")

    import numpy as np
    import torch
    import scipy.io.wavfile
    import imageio_ffmpeg
    from transformers import VitsModel, AutoTokenizer

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    print(f"Loading {MODEL_ID} ...")
    model = VitsModel.from_pretrained(MODEL_ID)
    tok = AutoTokenizer.from_pretrained(MODEL_ID)
    model.eval()
    sr = model.config.sampling_rate

    # Clarity tuning — MMS/VITS defaults (noise 0.667, dur-noise 0.8, rate 1.0)
    # sound slurred/"drunk" and rush short words. Lower stochastic noise + a
    # slightly slower pace make every letter land. Set on both model and config
    # so whichever the transformers version reads, it takes effect.
    for obj in (model, model.config):
        if hasattr(obj, "noise_scale"):
            obj.noise_scale = 0.45
        if hasattr(obj, "noise_scale_duration"):
            obj.noise_scale_duration = 0.5
        if hasattr(obj, "speaking_rate"):
            obj.speaking_rate = 0.85
    print(f"Model ready. sampling_rate={sr} (noise=0.45, rate=0.85)")

    tmp_wav = OUT_DIR / "_tmp.wav"
    mapping = {}          # normalized key -> filename stem
    done_files = set()
    failures = []

    # Trim dead air at both ends without clipping soft onsets.
    trim = ("silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,"
            "areverse,"
            "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,"
            "areverse")

    def synth_wave(say: str):
        inputs = tok(say, return_tensors="pt")
        with torch.no_grad():
            wav = model(**inputs).waveform
        return wav.squeeze().cpu().numpy().astype("float32")

    def voiced_segments(data, win):
        """Return [start_frame, end_frame] runs of voiced audio (10 ms frames)."""
        pad = (-len(data)) % win
        d = np.concatenate([data, np.zeros(pad, dtype=data.dtype)])
        energy = np.sqrt((d.reshape(-1, win) ** 2).mean(axis=1) + 1e-9)
        voiced = energy > (energy.max() * 0.08)
        runs, i, n = [], 0, len(voiced)
        while i < n:
            if voiced[i]:
                j = i
                while j < n and voiced[j]:
                    j += 1
                runs.append([i, j])
                i = j
            else:
                i += 1
        # Merge runs split by tiny (<60 ms) intra-word gaps.
        merged = []
        gap = int(0.06 * sr / win)
        for r in runs:
            if merged and r[0] - merged[-1][1] < gap:
                merged[-1][1] = r[1]
            else:
                merged.append(r)
        min_len = int(0.05 * sr / win)
        return [m for m in merged if m[1] - m[0] > min_len]

    def synth(text: str, mp3: Path):
        # Isolated short/single words come out as blips in VITS — give them
        # phonetic context by saying the word 3× (comma-separated), then crop to
        # the cleanest middle repetition. Phrases already have context.
        if " " in text:
            say = text if text[-1:] in ".!?" else text + "."
            data = synth_wave(say)
        else:
            data = synth_wave(f"{text}, {text}, {text}.")
            win = max(1, int(0.01 * sr))
            segs = voiced_segments(data, win)
            if len(segs) >= 2:
                mid = segs[len(segs) // 2]
                s = max(0, mid[0] * win - int(0.03 * sr))
                e = min(len(data), mid[1] * win + int(0.05 * sr))
                data = data[s:e]
            else:
                data = synth_wave(text + ".")  # fallback: single utterance

        peak = float(np.abs(data).max()) or 1.0
        int16 = (data / peak * 32767 * 0.95).astype("int16")
        scipy.io.wavfile.write(str(tmp_wav), sr, int16)
        subprocess.run(
            [ffmpeg, "-y", "-i", str(tmp_wav), "-af", trim,
             "-ac", "1", "-ar", "22050", "-b:a", "48k", str(mp3)],
            check=True, capture_output=True,
        )

    keys = sorted(spoken.keys())
    for i, key in enumerate(keys):
        text = clean_for_synth(spoken[key])
        if not text:
            continue
        stem = hashlib.sha1(norm(text).encode("utf-8")).hexdigest()[:12]
        mp3 = OUT_DIR / f"{stem}.mp3"
        if stem not in done_files and not mp3.exists():
            try:
                synth(text, mp3)
            except Exception as e:  # noqa: BLE001
                failures.append((key, text, str(e)[:120]))
                continue
        done_files.add(stem)
        mapping[key] = stem
        if i % 40 == 0:
            print(f"  {i}/{len(keys)} ...")

    if tmp_wav.exists():
        tmp_wav.unlink()

    # Drop orphaned mp3s no longer referenced (e.g. the old vNNN names).
    referenced = {f"{s}.mp3" for s in mapping.values()}
    removed = 0
    for f in OUT_DIR.glob("*.mp3"):
        if f.name not in referenced:
            f.unlink()
            removed += 1

    lines = [
        "// AUTO-GENERATED by scripts/generate_word_audio.py — do not edit by hand.",
        "// Bundled Kurmanji pronunciation clips (Meta MMS, mms-tts-kmr-script_latin).",
        "// Covers every spoken Kurmanji string (vocab words + lesson/exercise prompts).",
        "// Key = spokenText.normalize('NFC').toLowerCase().trim()",
        "export const WORD_AUDIO: Record<string, number> = {",
    ]
    for key in sorted(mapping):
        esc = key.replace("\\", "\\\\").replace("'", "\\'")
        lines.append(f"  '{esc}': require('../../assets/audio/words/{mapping[key]}.mp3'),")
    lines.append("};")
    lines.append("")
    MAP_TS.write_text("\n".join(lines), encoding="utf-8")

    files = list(OUT_DIR.glob("*.mp3"))
    total = sum(f.stat().st_size for f in files)
    print(f"\nDone. {len(mapping)} keys -> {len(files)} clips ({total/1024/1024:.2f} MB). "
          f"Removed {removed} orphans.")
    if failures:
        print(f"{len(failures)} FAILED:")
        for key, text, err in failures[:25]:
            print(f"  '{key}' ({text}): {err}")


if __name__ == "__main__":
    main()
