export function parseTimerParam(param: string | null | undefined, defaultSeconds: number): number {
  if (!param) return defaultSeconds;
  const [minutesStr, secondsStr] = param.split(":");
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);
  if (isNaN(minutes) || isNaN(seconds)) {
    return defaultSeconds;
  }
  return minutes * 60 + seconds;
}

export function incrementMinutes(time: number): number {
  return time + 60;
}

export function decrementMinutes(time: number): number {
  return time >= 60 ? time - 60 : 0;
}

export function incrementSeconds(time: number): number {
  const secs = time % 60;
  const mins = Math.floor(time / 60);
  const newSecs = secs + 10 > 59 ? 59 : secs + 10;
  return mins * 60 + newSecs;
}

export function decrementSeconds(time: number): number {
  const secs = time % 60;
  const mins = Math.floor(time / 60);
  const newSecs = secs > 10 ? secs - 10 : 0;
  return mins * 60 + newSecs;
}
