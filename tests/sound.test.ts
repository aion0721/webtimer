import { test, expect } from 'vitest';
import { playSound, setPlaySoundImpl, playSoundImpl } from '../src/utils/sound.ts';

test('playSound calls react-sounds with success_chime', async () => {
  const calls: unknown[][] = [];
  const original = playSoundImpl;
  setPlaySoundImpl(async (...args: unknown[]) => {
    calls.push(args);
  });

  await playSound();

  expect(calls).toHaveLength(1);
  expect(calls[0][0]).toBe('ui/success_chime');

  setPlaySoundImpl(original);
});
