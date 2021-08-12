
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"

export const Timer = (props) => {
    const { Minutes, setTimerMinutes, breakLength, sessionLength, timerSeconds, setTimerSeconds } = props
    const [intervalTime, setIntervalTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [inSession, setIsSessoin] = useState(true);
    const needZero = (num) => num < 10 ? true : false;

    const onToggleInterval = (isSession) => {
        if (isSession) return setTimerMinutes(sessionLength);
        return setTimerMinutes(breakLength)
    }

    const play = () => {
        setIsActive(true)
    }

    const pause = () => {
        setIsActive(false)
    }
    const reset = () => {
        setTimerMinutes(sessionLength);
        setTimerSeconds(0)
    }
    useEffect(() => {
        const decreaseTimer = () => {
            if (timerSeconds === 0) {
                setTimerSeconds(59);
                return setTimerMinutes(Minutes - 1)
            }
            return setTimerSeconds(prevState => prevState - 1)
        }

        let intervalId;
        if (isActive) {

            intervalId = setInterval(() => {
                decreaseTimer()
            }, 1000);
        }
        return () => clearInterval(intervalId)
    }, [timerSeconds, isActive])



    return (
        <>
            <div className='border-yellow-400 border-2 rounded-lg p-5'>
                <p id='time-left' className='text-9xl'>{
                    needZero(Minutes) ? '0' + Minutes : Minutes}
                    :
                    {needZero(timerSeconds) ? '0' + timerSeconds : timerSeconds}</p>
                <span id='timer-label' className='font-bold text-xl'>{inSession ? 'Session' : 'Break'}</span>
            </div>
            <div className='flex mt-8 '>
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
        </>
    )

}