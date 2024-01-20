import { useEffect, useState } from 'react'
import './App.css'
import AlarmSound from './assets/alarm-clock-short-6402.mp3';

interface TimerType {
  type: 'pomodoro' | 'short-break' | 'long-break';
}

function App() {
  const [count, setCount] = useState(1500)
  const [countType, setCountType] = useState<TimerType>({ type: 'pomodoro' })
  const [isActive, setIsActive] = useState(false)

  const countTypeToTime = {
    'pomodoro': 1500,
    'short-break': 5,
    'long-break': 900,
  };

  const audio = new Audio(AlarmSound);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (count > 0) {
          setCount((prevCount) => prevCount - 1)
        }
      }, 1000)
    } else if (!isActive && count !== 0) {
      clearInterval(interval!)
    }

    return () => {
      clearInterval(interval!)
    }
  }, [isActive, count])

  useEffect(() => {
    setCount(countTypeToTime[countType.type] || countTypeToTime['pomodoro']);
  }, [countType])

  useEffect(() => {
    if (count === 0) {

      audio.play();

      let notificationTitle = ''
      switch (countType.type) {
        case 'pomodoro':
          notificationTitle = 'Pomodoro finished!'
          break
        case 'short-break':
          notificationTitle = 'Short break finished!'
          break
        case 'long-break':
          notificationTitle = 'Long break finished!'
          break
        default:
          notificationTitle = 'Timer finished!'
      }

      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        new Notification(notificationTitle);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            new Notification(notificationTitle);
          }
        });
      }
    }
  }, [count, countType])

  const reset = () => {
    setCount(countTypeToTime[countType.type] || countTypeToTime['pomodoro'])
    setIsActive(false)
    audio.pause();
  }


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  function handleStartPause() {
    if (count === 0) {
      reset();
    } else {
      setIsActive(!isActive);
    }
  }

  function handleCountTypeChange(type: TimerType) {
    setCountType(type);
    reset();
  }

  return (
    <div className='App'>
      <div className='options'>
        <button
          className={countType.type === 'pomodoro' ? 'selected' : ''}
          onClick={() => handleCountTypeChange({ type: 'pomodoro' })}
        >
          Pomodoro
        </button>
        <button
          className={countType.type === 'short-break' ? 'selected' : ''}
          onClick={() => handleCountTypeChange({ type: 'short-break' })}
        >
          Short Break
        </button>
        <button
          className={countType.type === 'long-break' ? 'selected' : ''}
          onClick={() => handleCountTypeChange({ type: 'long-break' })}
        >
          Long Break
        </button>
      </div>
      <div className='timer'>
        <p>{formatTime(count)}</p>
      </div>
      <div className='buttons'>
        <button
          onClick={handleStartPause}>
          {isActive ? 'Pause' : 'Start'}
        </button>

        <button onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default App