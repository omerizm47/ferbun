import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * First-run coach-mark controller. Reads a persisted flag on mount and shows
 * the tour only once per device (per storageKey). Local-only; no account.
 */
export function useCoachMarks(storageKey: string, totalSteps: number, enabled = true) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    AsyncStorage.getItem(storageKey)
      .then((v) => { if (active && v !== 'true') setVisible(true); })
      .catch(() => {});
    return () => { active = false; };
  }, [storageKey, enabled]);

  const finish = useCallback(() => {
    setVisible(false);
    AsyncStorage.setItem(storageKey, 'true').catch(() => {});
  }, [storageKey]);

  const next = useCallback(() => {
    setStep((s) => {
      if (s + 1 >= totalSteps) { finish(); return s; }
      return s + 1;
    });
  }, [totalSteps, finish]);

  return { visible, step, next, skip: finish };
}
