import { useState, useEffect } from 'react';
import { Controls } from './components/Controls';
import { Timer } from './components/Timer';
import { TimeSetter } from './components/TimeSetter';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [time, setTime] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [mode, setMode] = useState('session');
  const [isActive, setIsActive] = useState(false);
  let audioBeep = document.getElementById('beep');
  const playStopTime = () => {
    setIsActive(prevState => !prevState);
  };

  const resetTime = () => {
    setMode('session');
    setIsActive(false);
    setTimerSeconds(0)
    setSessionLength(25);
    setBreakLength(5);
    setTime(25)
    audioBeep.pause();
    audioBeep.currentTime = 0;
  };
  const toggleSession = () => {
    audioBeep.play();
    setMode(mode === 'session' ? 'break' : 'session');
    setIsActive(true);
  };
  //Actualiza el minutero cuando se aumenta/reduce la session
  useEffect(() => {
    setTime(sessionLength)
  }, [sessionLength]);

  useEffect(() => {
    if (mode === 'session') {
      return setTime(sessionLength)
    };
    return setTime(breakLength)
    // eslint-disable-next-line 
  }, [mode])
  useEffect(() => {
    let intervalId;
    if (isActive) {

      const decreaseTimer = () => {
        if (time === 0 && timerSeconds === 0 && isActive) {

          setIsActive(false)
          return toggleSession();
        }
        if (timerSeconds === 0) {
          setTimerSeconds(59);
          return setTime(time - 1)
        }

        return setTimerSeconds(prevState => prevState - 1)
      }
      intervalId = setInterval(() => {
        decreaseTimer()
      }, 1000);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line 
  }, [timerSeconds, isActive, mode])


  return (
    <div className="app-wrapper bg-gray-800 text-yellow-300">
      <div className='container mx-auto flex flex-col justify-center items-center'>

        <span className='text-6xl'>Pomodoro timer</span>

        <div className='flex'>

          <TimeSetter type={'break'} value={[breakLength, setBreakLength]} />
          <TimeSetter type={'session'} value={[sessionLength, setSessionLength]} />

        </div>

        <Timer currentMode={[mode, setMode]} currentTime={[timerSeconds, time]} />
        <Controls values={[playStopTime, resetTime]} />
      </div>

    </div>
  );
}

export default App;
