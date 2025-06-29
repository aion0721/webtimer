import assert from 'node:assert';
import test from 'node:test';
import {
  parseTimerParam,
  incrementMinutes,
  decrementMinutes,
  incrementSeconds,
  decrementSeconds,
} from '../src/timerUtils.js';

test('parseTimerParam parses mm:ss', () => {
  assert.strictEqual(parseTimerParam('1:30', 0), 90);
});

test('parseTimerParam handles invalid input', () => {
  assert.strictEqual(parseTimerParam('bad', 600), 600);
});

test('incrementMinutes adds 60 seconds', () => {
  assert.strictEqual(incrementMinutes(10), 70);
});

test('decrementMinutes subtracts 60 seconds with floor at 0', () => {
  assert.strictEqual(decrementMinutes(50), 0);
  assert.strictEqual(decrementMinutes(120), 60);
});

test('incrementSeconds increases seconds up to 59', () => {
  assert.strictEqual(incrementSeconds(55), 59);
  assert.strictEqual(incrementSeconds(40), 50);
});

test('decrementSeconds decreases seconds not below 0', () => {
  assert.strictEqual(decrementSeconds(9), 0);
  assert.strictEqual(decrementSeconds(25), 15);
});
