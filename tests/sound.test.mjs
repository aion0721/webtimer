import assert from 'node:assert';
import test from 'node:test';

test('playSound calls react-sounds with success_chime', async () => {
  const calls = [];
  const mod = await import('../src/utils/sound.ts');
  mod.setPlaySoundImpl(async (...args) => {
    calls.push(args);
  });

  await mod.playSound();

  assert.strictEqual(calls.length, 1);
  assert.strictEqual(calls[0][0], 'ui/success_chime');
});
