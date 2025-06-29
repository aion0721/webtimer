import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  parseTimerParam,
  incrementMinutes,
  decrementMinutes,
  incrementSeconds,
  decrementSeconds,
} from "./timerUtils.js";

const INITIAL_TIME = 10 * 60; // 25 minutes

import Button from "./Button";
import TextBox from "./TextBox";

export default function Timer() {
  const [searchParams] = useSearchParams();
  const timerParam = searchParams.get("timer");

  const initialTime = parseTimerParam(timerParam, INITIAL_TIME);

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const playSound = () => {
    try {
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = 440;
      oscillator.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 1);
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  const sendNotification = () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Time is up!");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            new Notification("Time is up!");
          }
        });
      }
    }
  };

  // Highlight when the timer finishes while running
  useEffect(() => {
    const className = "time-up";
    if (finished) {
      document.body.classList.add(className);
      playSound();
      sendNotification();
    } else {
      document.body.classList.remove(className);
    }
    return () => document.body.classList.remove(className);
  }, [finished]);

  useEffect(() => {
    if (timeLeft > 0 && finished) {
      setFinished(false);
    }
  }, [timeLeft, finished]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft === 0) {
      setRunning(false);
      setFinished(true);
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const start = () => setRunning(true);
  const pause = () => setRunning(false);

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const sanitized = isNaN(value) ? 0 : value;
    setTimeLeft(sanitized * 60 + seconds);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      value = 0;
    } else if (value < 0) {
      value = 0;
    } else if (value > 59) {
      value = 59;
    }
    setTimeLeft(minutes * 60 + value);
  };

  const reset = () => {
    setRunning(false);
    setTimeLeft(INITIAL_TIME);
    setFinished(false);
  };

  const incMinutes = () => {
    setTimeLeft((t) => incrementMinutes(t));
  };
  const decMinutes = () => {
    setTimeLeft((t) => decrementMinutes(t));
  };
  const incSeconds = () => {
    setTimeLeft((t) => incrementSeconds(t));
  };
  const decSeconds = () => {
    setTimeLeft((t) => decrementSeconds(t));
  };

  const setPreset = (mins: number) => {
    setRunning(false);
    setFinished(false);
    setTimeLeft(mins * 60);
  };

  return (
    <div className="timer flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center my-4 text-gray-800">
        ⏰ WebTimer ⏰
      </h1>
      <div className="adjust-inc flex space-x-2 mt-2 justify-evenly">
        <Button onClick={incMinutes}>+1 min</Button>
        <Button onClick={incSeconds}>+10 sec</Button>
      </div>
      <div className="time flex items-center justify-evenly">
        <TextBox value={minutes} onChange={handleMinutesChange} />:
        <TextBox value={seconds} onChange={handleSecondsChange} />
      </div>
      <div className="adjust-dec flex space-x-2 justify-evenly">
        <Button onClick={decMinutes}>-1 min</Button>
        <Button onClick={decSeconds}>-10 sec</Button>
      </div>
      <div className="controls flex space-x-2 mt-2">
        {running ? (
          <Button onClick={pause} className="bg-gray-500 hover:bg-gray-700">
            Pause
          </Button>
        ) : (
          <Button onClick={start} className="bg-green-500 hover:bg-green-700">
            Start
          </Button>
        )}
        <Button onClick={reset} className="bg-red-500 hover:bg-red-700">
          Reset
        </Button>
      </div>
      <div className="presets flex space-x-2 mt-2">
        <Button onClick={() => setPreset(1)}>1 min</Button>
        <Button onClick={() => setPreset(3)}>3 min</Button>
        <Button onClick={() => setPreset(5)}>5 min</Button>
        <Button onClick={() => setPreset(10)}>10 min</Button>
      </div>
    </div>
  );
}
