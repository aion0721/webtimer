import assert from 'node:assert';
import test from 'node:test';
import { playSound } from '../src/sound.ts';

test('playSound uses AudioContext to start and stop oscillator', () => {
  let started = false;
  let stopArg: number | null = null;

  class MockOscillator {
    type = '';
    frequency = { value: 0 };
    connect() {}
    start() {
      started = true;
    }
    stop(when: number) {
      stopArg = when;
    }
  }

  class MockAudioContext {
    currentTime = 100;
    destination = {};
    createOscillator() {
      return new MockOscillator();
    }
  }

  (global as any).window = {
    AudioContext: MockAudioContext,
  };

  playSound();

  assert.strictEqual(started, true);
  assert.strictEqual(stopArg, 101);
});
