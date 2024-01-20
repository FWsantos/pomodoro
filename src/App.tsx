import { useEffect, useState } from 'react'
import './App.css'

interface TimerType {
  type: 'pomodoro' | 'short-break' | 'long-break';
}

function App() {
  const [count, setCount] = useState(1500)
  const [countType, setCountType] = useState<TimerType>({ type: 'pomodoro' })
  const [isActive, setIsActive] = useState(false)

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

    console.log(countType.type)
    switch (countType.type) {
      case 'pomodoro':
        setCount(1500)
        break
      case 'short-break':
        setCount(300)
        break
      case 'long-break':
        setCount(900)
        break
      default:
        setCount(1500)
    }
  }, [countType])

  const reset = () => {
    setCount(1500)
    setIsActive(false)
  }


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className='App'>
      <div className='options'>
        <button
          className={countType.type === 'pomodoro' ? 'selected' : ''}
          onClick={() => setCountType({ type: 'pomodoro' })}
        >
          Pomodoro
        </button>
        <button
          className={countType.type === 'short-break' ? 'selected' : ''}
          onClick={() => setCountType({ type: 'short-break' })}
        >
          Short Break
        </button>
        <button
          className={countType.type === 'long-break' ? 'selected' : ''}
          onClick={() => setCountType({ type: 'long-break' })}
        >
          Long Break
        </button>
      </div>
      <div className='timer'>
        <p>{formatTime(count)}</p>
      </div>
      <div className='buttons'>
        <button onClick={() => setIsActive(!isActive)}>
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