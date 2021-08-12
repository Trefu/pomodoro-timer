import { useState } from 'react';
import { Timer } from './components/Timer';
import { Break } from './components/Break';
import { Session } from './components/Session'

function App() {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);


  return (
    <div className="app-wrapper bg-gray-800 text-yellow-300">
      <div className='container mx-auto flex flex-col justify-center items-center'>

        <span className='text-6xl'>Pomodoro timer</span>

        <div className='flex'>

          <Break breakLength={breakLength}
            setBreakLength={setBreakLength} />

          <Session
            sessionLength={sessionLength}
            setSessionLength={setSessionLength}
            timerMinutes={timerMinutes}
            setTimerMinutes={setTimerMinutes} />

        </div>

        <Timer Minutes={timerMinutes}
          setTimerMinutes={setTimerMinutes}

          breakLength={breakLength}
          sessionLength={sessionLength}
          timerSeconds={timerSeconds}
          setTimerSeconds={setTimerSeconds} />

      </div>
    </div>
  );
}

export default App;
