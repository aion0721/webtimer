export function playSound(): void {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = "sine";
    // Schedule a simple "ding-dong" style chime by ramping the frequency
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.3);
    oscillator.frequency.setValueAtTime(523, ctx.currentTime + 0.6);
    oscillator.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 1);
  } catch (e) {
    console.error("Audio error", e);
  }
}
