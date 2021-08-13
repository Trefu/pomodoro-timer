import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons'
export const Controls = ({ values }) => {
    const [setIsActive, setInSession, pauseTime, playTime] = values
    const play = () => {
        playTime()
    };
    const pause = () => {
        pauseTime()
    }
    const reset = () => {
        console.log('reset')
    }
    const test = () => {
        console.log('test')
    }
    return (
        <div className='flex justify-between items-center mt-8 ml-4 '>
            <div id='start_stop'>
                <button className='mr-4 text-2xl p-1' onClick={play}   >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                <button className='mr-4 text-2xl p-1' onClick={pause}>
                    <FontAwesomeIcon icon={faPause} />
                </button>

            </div>
            <button id='reset' className='mr-4 text-2xl p-1' onClick={reset}>
                <FontAwesomeIcon icon={faStop} />
            </button>
        </div>
    )
}
