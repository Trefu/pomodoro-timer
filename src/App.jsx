
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="app-wrapper bg-gray-800 text-yellow-300">
      <div className='container mx-auto flex flex-col justify-center items-center'>

        <span className='text-6xl'>Pomodoro timer</span>

        <div className='flex'>

          <div className='flex flex-col items-center p-2'>
            <span id='break-label' className='text-2xl'>Break Length</span>
            <div className="flex items-center">

              <button id='break-decrement' className='btn-controllers'>
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
              <span id='break-length' className='text-xl mx-2'>5</span>
              <button id='break-increment' className='btn-controllers'>
                <FontAwesomeIcon icon={faArrowUp} />
              </button>

            </div>
          </div>

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


        <div className='border-yellow-400 border-2 rounded-lg p-5'>
          <p id='time-left' className='text-9xl'>25:00</p>
          <span id='timer-label' className='font-bold text-xl'>Session</span>
        </div>

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
