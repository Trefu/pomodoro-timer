import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Controls } from './components/Controls';
import { Timer } from './components/Timer';
import { TimeSetter } from './components/TimeSetter';

function App() {
  const [time, setTime] = useState(25);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [mode, setMode] = useState('session');
  const [intervalTime, setIntervalTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inSession, setInSession] = useState(true);

  const playTime = () => {
    setIsActive(true);
  }

  const pauseTime = () => {
    setIsActive(false)
  }
  useEffect(() => {
    const onToggleInterval = (inSession) => {
      if (inSession) return setTime(sessionLength);
      return setTime(breakLength)
    }
    const toggleSession = () => {
      setInSession(prevState => !prevState)
    }
    const decreaseTimer = () => {
      if (time === 0 && timerSeconds === 0) {
        toggleSession()
        return
      }
      if (timerSeconds === 0) {
        setTimerSeconds(59);
        return setTime(time - 1)
      }

      return setTimerSeconds(prevState => prevState - 1)
    }

    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        decreaseTimer()
        onToggleInterval()
      }, 1000);
    }
    return () => clearInterval(intervalId)
  }, [timerSeconds, isActive, time, inSession])

  return (
    <div className="app-wrapper bg-gray-800 text-yellow-300">
      <div className='container mx-auto flex flex-col justify-center items-center'>

        <span className='text-6xl'>Pomodoro timer</span>

        <div className='flex'>

          <TimeSetter type={'break'} value={[breakLength, setBreakLength]} />
          <TimeSetter type={'session'} value={[sessionLength, setSessionLength]} />

        </div>

        <Timer currentMode={[mode, setMode]} currentTime={[timerSeconds, time]} />
        <Controls values={[setIsActive, setInSession, pauseTime, playTime]} />
      </div>
    </div>
  );
}

export default App;
