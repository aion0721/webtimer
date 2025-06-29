import { useEffect, useState } from "react";

const INITIAL_TIME = 25 * 60; // 25 minutes

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [running, setRunning] = useState(false);
  const [minutesInput, setMinutesInput] = useState(
    Math.floor(INITIAL_TIME / 60)
  );
  const [secondsInput, setSecondsInput] = useState(INITIAL_TIME % 60);

  useEffect(() => {
    if (!running) return;
    if (timeLeft === 0) {
      setRunning(false);
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const start = () => setRunning(true);
  const pause = () => setRunning(false);

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinutesInput(isNaN(value) ? 0 : value);
    setTimeLeft((isNaN(value) ? 0 : value) * 60 + secondsInput);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSecondsInput(isNaN(value) ? 0 : value);
    setTimeLeft(minutesInput * 60 + (isNaN(value) ? 0 : value));
  };

  const reset = () => {
    setRunning(false);
    setTimeLeft(INITIAL_TIME);
    setMinutesInput(Math.floor(INITIAL_TIME / 60));
    setSecondsInput(INITIAL_TIME % 60);
  };

  const incMinutes = () => {
    setMinutesInput((m) => m + 1);
    setTimeLeft((minutesInput + 1) * 60 + secondsInput);
  };
  const decMinutes = () => {
    setMinutesInput((m) => (m > 0 ? m - 1 : 0));
    setTimeLeft((minutesInput > 0 ? minutesInput - 1 : 0) * 60 + secondsInput);
  };
  const incSeconds = () => {
    setSecondsInput((s) => s + 10);
    setTimeLeft(minutesInput * 60 + secondsInput + 10);
  };
  const decSeconds = () => {
    setSecondsInput((s) => (s > 10 ? s - 10 : 0));
    setTimeLeft(
      minutesInput * 60 + (secondsInput > 10 ? secondsInput - 10 : 0)
    );
  };

  return (
    <div className="timer">
      <div className="time">
        <input
          type="number"
          value={minutesInput}
          onChange={handleMinutesChange}
        />
        :
        <input
          type="number"
          value={secondsInput}
          onChange={handleSecondsChange}
        />
      </div>
      <div className="adjust">
        <button onClick={incMinutes}>+1 min</button>
        <button onClick={decMinutes}>-1 min</button>
        <button onClick={incSeconds}>+10 sec</button>
        <button onClick={decSeconds}>-10 sec</button>
      </div>
      <div className="controls">
        {running ? (
          <button onClick={pause}>Pause</button>
        ) : (
          <button onClick={start}>Start</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
