import assert from 'node:assert';
import test from 'node:test';
import {
  parseTimerParam,
  incrementMinutes,
  decrementMinutes,
  incrementSeconds,
  decrementSeconds,
} from '../src/utils/timerUtils.ts';

test('parseTimerParam parses mm:ss', () => {
  const input: string = '1:30';
  const fallback: number = 0;
  const expected: number = 90;
  assert.strictEqual(parseTimerParam(input, fallback), expected);
});

test('parseTimerParam handles invalid input', () => {
  const input: string = 'bad';
  const fallback: number = 600;
  const expected: number = 600;
  assert.strictEqual(parseTimerParam(input, fallback), expected);
});

test('incrementMinutes adds 60 seconds', () => {
  const input: number = 10;
  const expected: number = 70;
  assert.strictEqual(incrementMinutes(input), expected);
});

test('decrementMinutes subtracts 60 seconds with floor at 0', () => {
  const lowInput: number = 50;
  const highInput: number = 120;
  assert.strictEqual(decrementMinutes(lowInput), 0);
  assert.strictEqual(decrementMinutes(highInput), 60);
});

test('incrementSeconds increases seconds up to 59', () => {
  const nearLimit: number = 55;
  const normal: number = 40;
  assert.strictEqual(incrementSeconds(nearLimit), 59);
  assert.strictEqual(incrementSeconds(normal), 50);
});

test('decrementSeconds decreases seconds not below 0', () => {
  const small: number = 9;
  const normal: number = 25;
  assert.strictEqual(decrementSeconds(small), 0);
  assert.strictEqual(decrementSeconds(normal), 15);
});
