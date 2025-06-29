const INITIAL_TIME = 25 * 60; // 25 minutes

import Button from "./Button";
import { useEffect, useState } from "react";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (timeLeft === 0) {
      setRunning(false);
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
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
  };

  const incMinutes = () => {
    setTimeLeft((t) => t + 60);
  };
  const decMinutes = () => {
    setTimeLeft((t) => (t >= 60 ? t - 60 : 0));
  };
  const incSeconds = () => {
    setTimeLeft((t) => {
      const secs = t % 60;
      const mins = Math.floor(t / 60);
      const newSecs = secs + 10 > 59 ? 59 : secs + 10;
      return mins * 60 + newSecs;
    });
  };
  const decSeconds = () => {
    setTimeLeft((t) => {
      const secs = t % 60;
      const mins = Math.floor(t / 60);
      const newSecs = secs > 10 ? secs - 10 : 0;
      return mins * 60 + newSecs;
    });
  };

  return (
    <div className="timer flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="adjust-inc flex space-x-2 mt-2 justify-evenly">
        <Button onClick={incMinutes}>+1 min</Button>
        <Button onClick={incSeconds}>+10 sec</Button>
      </div>
      <div className="time flex items-center space-x-2 justify-evenly">
        <input
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          className="w-20 px-3 py-2 text-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        :
        <input
          type="number"
          value={seconds}
          onChange={handleSecondsChange}
          className="w-20 px-3 py-2 text-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="adjust-dec flex space-x-2 mt-2 justify-evenly">
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
    </div>
  );
}
