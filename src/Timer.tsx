import { useEffect, useState } from 'react'

const INITIAL_TIME = 25 * 60 // 25 minutes

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    if (timeLeft === 0) {
      setRunning(false)
      return
    }
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [running, timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const start = () => setRunning(true)
  const pause = () => setRunning(false)
  const reset = () => {
    setRunning(false)
    setTimeLeft(INITIAL_TIME)
  }

  return (
    <div className="timer">
      <div className="time">
        {pad(minutes)}:{pad(seconds)}
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
  )
}
