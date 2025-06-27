import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const update = () => {
    if (startRef.current !== null) {
      setElapsed(prev => prev + (Date.now() - startRef.current!));
      startRef.current = Date.now();
    }
  };

  const start = () => {
    if (intervalRef.current === null) {
      startRef.current = Date.now();
      intervalRef.current = window.setInterval(update, 250);
    }
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      startRef.current = null;
    }
  };

  const reset = () => {
    setElapsed(0);
    startRef.current = null;
  };

  const hrs = Math.floor(elapsed / 3600000);
  const mins = Math.floor(elapsed / 60000) % 60;
  const secs = Math.floor(elapsed / 1000) % 60;

  return (
    <div>
      <div id="time">
        {String(hrs).padStart(2, '0')}:
        {String(mins).padStart(2, '0')}:
        {String(secs).padStart(2, '0')}
      </div>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
