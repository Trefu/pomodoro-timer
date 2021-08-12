import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

export const Session = (props) => {
    const { sessionLength, setSessionLength } = props;
    const increaseSession = () => {
        if (sessionLength > 59) return;
        setSessionLength(sessionLength + 1)

    }
    const decreaseSession = () => {
        if (sessionLength === 1) return;
        setSessionLength(sessionLength - 1)

    }
    return (
        < div className='flex flex-col items-center p-2' >
            <span id='Session-label' className='text-2xl'>Session Length</span>
            <div className="flex items-center">

                <button id='Session-decrement' className='btn-controllers' onClick={increaseSession} >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>

                <span id='Session-length' className='text-xl mx-2'>
                    {sessionLength}
                </span>

                <button id='Session-increment' className='btn-controllers' onClick={decreaseSession}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>

            </div>
        </div >
    )

}