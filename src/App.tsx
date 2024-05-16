import { useEffect, useState } from 'react'
import './App.css'
import AlarmSound from './assets/alarm-clock-short-6402.mp3';
import { TimerType } from './store/interfaces';
import Button from './components/Button/Button';
import Timer from './components/Timer/Timer';

function App() {
  const [count, setCount] = useState(1500)
  const [countType, setCountType] = useState<TimerType>({ type: 'pomodoro' })
  const [isActive, setIsActive] = useState(false)

  const countTypeToTime = {
    'pomodoro': 1500,
    'short-break': 300,
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
        <Button
          selected={countType.type === 'pomodoro'}
          onClick={() => handleCountTypeChange({ type: 'pomodoro' })}
        >
          Pomodoro
        </Button>
        <Button
          selected={countType.type === 'short-break'}
          onClick={() => handleCountTypeChange({ type: 'short-break' })}
        >
          Short Break
        </Button>
        <Button
          selected={countType.type === 'long-break'}
          onClick={() => handleCountTypeChange({ type: 'long-break' })}
        >
          Long Break
        </Button>
      </div>
      <Timer count={count} />
      <div className='buttons'>
        <Button
          onClick={handleStartPause}>
          {isActive ? 'Pause' : 'Start'}
        </Button>

        <Button onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </div>
  )
}

export default App