import { playSound as defaultPlaySound } from "react-sounds";

export let playSoundImpl: (name: string) => Promise<void> = defaultPlaySound;

export function setPlaySoundImpl(fn: (name: string) => Promise<void>): void {
  playSoundImpl = fn;
}

export function playSound(): Promise<void> {
  return playSoundImpl("ui/success_chime");
}
