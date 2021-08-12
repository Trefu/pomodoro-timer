import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Timer } from './components/Timer';
import { Break } from './components/Break'

function App() {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  return (
    <div className="app-wrapper bg-gray-800 text-yellow-300">
      <div className='container mx-auto flex flex-col justify-center items-center'>

        <span className='text-6xl'>Pomodoro timer</span>

        <div className='flex'>


          <Break breakLength={breakLength} setBreakLength={setBreakLength} />

          <div className='flex flex-col items-center p-2'>
            <span id='session-label' className='text-2xl'>Session Length</span>
            <div className="flex items-center">

              <button id='session-decrement' className='btn-controllers'>
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
              <span id='session-length' className='text-xl mx-2'>25</span>

              <button id='session-increment' className='btn-controllers'>
                <FontAwesomeIcon icon={faArrowUp} />
              </button>

            </div>
          </div>

        </div>


        <Timer Minutes={timerMinutes} />

        <div className='flex mt-8 '>
          <div id='start_stop'>
            <button className='mr-4 text-2xl p-1'  >
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button className='mr-4 text-2xl p-1'>
              <FontAwesomeIcon icon={faPause} />
            </button>
          </div>
          <button id='reset' className='mr-4 text-2xl p-1'>
            <FontAwesomeIcon icon={faStop} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
