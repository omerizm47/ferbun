const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// === APP ICON (512x512) ===
function generateAppIcon() {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background — warm fire gradient
  const bgGrad = ctx.createLinearGradient(0, 0, size, size);
  bgGrad.addColorStop(0, '#E85D00');
  bgGrad.addColorStop(1, '#7A2F00');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // Subtle mountain silhouette at bottom
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(60, size * 0.7);
  ctx.lineTo(140, size * 0.82);
  ctx.lineTo(220, size * 0.62);
  ctx.lineTo(300, size * 0.78);
  ctx.lineTo(380, size * 0.65);
  ctx.lineTo(440, size * 0.75);
  ctx.lineTo(size, size * 0.68);
  ctx.lineTo(size, size);
  ctx.closePath();
  ctx.fill();

  // Kurdish sun — center circle with rays
  const cx = size / 2;
  const cy = size * 0.38;
  const innerR = 42;
  const outerR = 85;
  const rays = 21;

  // Sun glow
  const glowGrad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR + 20);
  glowGrad.addColorStop(0, 'rgba(255,255,255,0.2)');
  glowGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR + 20, 0, Math.PI * 2);
  ctx.fill();

  // Sun rays
  for (let i = 0; i < rays; i++) {
    const angle = (i * 360 / rays - 90) * Math.PI / 180;
    const x1 = cx + Math.cos(angle) * (innerR + 4);
    const y1 = cy + Math.sin(angle) * (innerR + 4);
    const x2 = cx + Math.cos(angle) * outerR;
    const y2 = cy + Math.sin(angle) * outerR;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)';
    ctx.lineWidth = i % 2 === 0 ? 3 : 1.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Sun center circle
  const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerR);
  sunGrad.addColorStop(0, '#FFD5A8');
  sunGrad.addColorStop(1, '#FFFFFF');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.fill();

  // Text: "Fêrbûn"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Fêrbûn', cx, size * 0.68);

  // Subtitle
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '600 22px sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('LEARN KURDISH', cx, size * 0.78);

  // Save
  const buffer = canvas.toBuffer('image/png');
  const outPath = path.join(__dirname, 'assets', 'icon-playstore.png');
  fs.writeFileSync(outPath, buffer);
  console.log('App icon saved to:', outPath);
}

// === FEATURE GRAPHIC (1024x500) ===
function generateFeatureGraphic() {
  const w = 1024;
  const h = 500;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#E85D00');
  bgGrad.addColorStop(0.6, '#C44B00');
  bgGrad.addColorStop(1, '#5C2800');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Mountain silhouette
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(80, h * 0.5);
  ctx.lineTo(180, h * 0.65);
  ctx.lineTo(300, h * 0.3);
  ctx.lineTo(420, h * 0.55);
  ctx.lineTo(540, h * 0.35);
  ctx.lineTo(650, h * 0.6);
  ctx.lineTo(760, h * 0.4);
  ctx.lineTo(870, h * 0.55);
  ctx.lineTo(w, h * 0.45);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Kilim pattern at bottom
  const kilimY = h - 20;
  const step = 28;
  const count = Math.floor(w / step);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i < count; i++) {
    const x = i * step + step / 2;
    ctx.beginPath();
    ctx.moveTo(x, kilimY - 8);
    ctx.lineTo(x + step / 4, kilimY);
    ctx.lineTo(x, kilimY + 8);
    ctx.lineTo(x - step / 4, kilimY);
    ctx.closePath();
    if (i % 2 === 0) ctx.fill();
    ctx.stroke();
  }

  // Kurdish sun — left side
  const sunCx = 200;
  const sunCy = h * 0.45;
  const sunInnerR = 35;
  const sunOuterR = 70;
  const sunRays = 21;

  for (let i = 0; i < sunRays; i++) {
    const angle = (i * 360 / sunRays - 90) * Math.PI / 180;
    const x1 = sunCx + Math.cos(angle) * (sunInnerR + 3);
    const y1 = sunCy + Math.sin(angle) * (sunInnerR + 3);
    const x2 = sunCx + Math.cos(angle) * sunOuterR;
    const y2 = sunCy + Math.sin(angle) * sunOuterR;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)';
    ctx.lineWidth = i % 2 === 0 ? 2.5 : 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  const cGrad = ctx.createRadialGradient(sunCx, sunCy, 0, sunCx, sunCy, sunInnerR);
  cGrad.addColorStop(0, '#FFD5A8');
  cGrad.addColorStop(1, '#FFFFFF');
  ctx.fillStyle = cGrad;
  ctx.beginPath();
  ctx.arc(sunCx, sunCy, sunInnerR, 0, Math.PI * 2);
  ctx.fill();

  // Main text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 80px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Fêrbûn', 360, h * 0.38);

  // Subtitle
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '600 28px sans-serif';
  ctx.fillText('Learn Kurmanji Kurdish', 365, h * 0.55);

  // Tagline
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '400 20px sans-serif';
  ctx.fillText('Lessons · Stories · Flashcards', 365, h * 0.67);

  // Save
  const buffer = canvas.toBuffer('image/png');
  const outPath = path.join(__dirname, 'assets', 'feature-graphic.png');
  fs.writeFileSync(outPath, buffer);
  console.log('Feature graphic saved to:', outPath);
}

generateAppIcon();
generateFeatureGraphic();
console.log('Done! Check the assets/ folder.');
