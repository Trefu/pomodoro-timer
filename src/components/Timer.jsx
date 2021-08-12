
import { useState } from "react"

export const Timer = (props) => {
    const { Minutes } = props
    const [inSession, setInSession] = useState(true);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const isDecimal = timerSeconds < 10 ? true : false;

    return (
        <div className='border-yellow-400 border-2 rounded-lg p-5'>
            <p id='time-left' className='text-9xl'>{Minutes}:{isDecimal ? '0' + timerSeconds : timerSeconds}</p>
            <span id='timer-label' className='font-bold text-xl'>{inSession ? 'Session' : 'Break'}</span>
        </div>
    )

}