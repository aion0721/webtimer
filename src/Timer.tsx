const INITIAL_TIME = 25 * 60; // 25 minutes

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

import Button from "./Button";
import { useEffect, useState } from "react";

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
      setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running, timeLeft, minutesInput, secondsInput]);

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
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      value = 0;
    } else if (value < 0) {
      value = 0;
    } else if (value > 59) {
      value = 59;
    }
    setSecondsInput(value);
    setTimeLeft(minutesInput * 60 + value);
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
    setSecondsInput((s) => {
      const newValue = s + 10;
      return newValue > 59 ? 59 : newValue;
    });
    setTimeLeft(
      minutesInput * 60 + (secondsInput + 10 > 59 ? 59 : secondsInput + 10)
    );
  };
  const decSeconds = () => {
    setSecondsInput((s) => (s > 10 ? s - 10 : 0));
    setTimeLeft(
      minutesInput * 60 + (secondsInput > 10 ? secondsInput - 10 : 0)
    );
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
          value={minutesInput}
          onChange={handleMinutesChange}
          className="w-20 px-3 py-2 text-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        :
        <input
          type="number"
          value={secondsInput}
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
