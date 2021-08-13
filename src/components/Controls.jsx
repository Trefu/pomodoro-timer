import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons'
export const Controls = ({ values }) => {
    const [playStopTime, resetTime] = values

    return (
        <div className='flex  mt-8  '>

            <button id='start_stop' className='mr-4 text-2xl p-1' onClick={() => playStopTime()}   >
                <FontAwesomeIcon className='mr-1' icon={faPlay} />
                <FontAwesomeIcon icon={faPause} />
            </button>


            <button id='reset' className='mr-4 text-2xl p-1' onClick={() => resetTime()}>
                <FontAwesomeIcon icon={faStop} />
            </button>
        </div>
    )
}
