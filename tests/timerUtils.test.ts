import { describe, it, expect } from 'vitest';
import {
  parseTimerParam,
  incrementMinutes,
  decrementMinutes,
  incrementSeconds,
  decrementSeconds,
} from '../src/utils/timerUtils.ts';

describe('timerUtils', () => {
  it('parseTimerParam parses mm:ss', () => {
    const input: string = '1:30';
    const fallback: number = 0;
    const expected: number = 90;
    expect(parseTimerParam(input, fallback)).toBe(expected);
  });

  it('parseTimerParam handles invalid input', () => {
    const input: string = 'bad';
    const fallback: number = 600;
    const expected: number = 600;
    expect(parseTimerParam(input, fallback)).toBe(expected);
  });

  it('incrementMinutes adds 60 seconds', () => {
    const input: number = 10;
    const expected: number = 70;
    expect(incrementMinutes(input)).toBe(expected);
  });

  it('decrementMinutes subtracts 60 seconds with floor at 0', () => {
    const lowInput: number = 50;
    const highInput: number = 120;
    expect(decrementMinutes(lowInput)).toBe(0);
    expect(decrementMinutes(highInput)).toBe(60);
  });

  it('incrementSeconds increases seconds up to 59', () => {
    const nearLimit: number = 55;
    const normal: number = 40;
    expect(incrementSeconds(nearLimit)).toBe(59);
    expect(incrementSeconds(normal)).toBe(50);
  });

  it('decrementSeconds decreases seconds not below 0', () => {
    const small: number = 9;
    const normal: number = 25;
    expect(decrementSeconds(small)).toBe(0);
    expect(decrementSeconds(normal)).toBe(15);
  });
});
