import { useState, useEffect, useRef } from 'react';
import { Controls } from './components/Controls';
import { Timer } from './components/Timer';
import { TimeSetter } from './components/TimeSetter';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [mode, setMode] = useState('session');
  const [isActive, setIsActive] = useState(false);
  const audioBeep = useRef()
  const playStopTime = () => {
    setIsActive(prevState => !prevState);
  };

  const resetTime = () => {
    setMode('session');
    setIsActive(false);
    setTimerSeconds(0)
    setSessionLength(25);
    setBreakLength(5);
    setTimerMinutes(25)
    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
  };
  const toggleSession = () => {
    setMode(mode === 'session' ? 'break' : 'session');
    setIsActive(true);
  };

  const decreaseTimer = () => {
    if (timerSeconds === 0) {
      if (timerMinutes === 0) {
        audioBeep.current.currentTime = 0;
        audioBeep.current.play();
        setIsActive(false)
        return toggleSession();
      }
      setTimerSeconds(59);
      return setTimerMinutes(prevState => prevState - 1)
    }

    return setTimerSeconds(prevState => prevState - 1)
  }
  //Actualiza el minutero cuando se aumenta/reduce la session
  useEffect(() => {
    setTimerMinutes(sessionLength)
  }, [sessionLength]);

  useEffect(() => {
    if (mode === 'session') {
      return setTimerMinutes(sessionLength)
    };
    return setTimerMinutes(breakLength)
    // eslint-disable-next-line 
  }, [mode])

  useEffect(() => {
    let intervalId;
    if (isActive) {
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

        <Timer currentMode={[mode, setMode]} currentTime={[timerSeconds, timerMinutes]} />
        <Controls values={[playStopTime, resetTime]} />
      </div>
      <audio id="beep" preload="auto" ref={audioBeep}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </div>
  );
}

export default App;
