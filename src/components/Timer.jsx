
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"

export const Timer = ({ currentMode, currentTime }) => {
    const [mode] = currentMode;
    const [seconds, minutes] = currentTime;
    const needZero = (num) => num < 10 ? true : false;

    return (
        <>
            <div className='border-yellow-400 border-2 rounded-lg p-5'>
                <p id='time-left' className='text-9xl'>{
                    needZero(minutes) ? '0' + minutes : minutes}
                    :
                    {needZero(seconds) ? '0' + seconds : seconds}</p>
                <span id='timer-label' className='font-bold text-xl'>{mode}</span>
            </div>

        </>
    )

}