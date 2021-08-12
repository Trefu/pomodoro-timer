import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

export const Break = (props) => {
    const { breakLength, setBreakLength } = props;
    const increaseBreak = () => {
        if (breakLength > 59) return;
        setBreakLength(breakLength + 1)

    }
    const decreasebreak = () => {
        if (breakLength === 1) return;
        setBreakLength(breakLength - 1)

    }
    return (
        < div className='flex flex-col items-center p-2' >
            <span id='break-label' className='text-2xl'>Break Length</span>
            <div className="flex items-center">

                <button id='break-decrement' className='btn-controllers' onClick={increaseBreak} >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>

                <span id='break-length' className='text-xl mx-2'>
                    {breakLength}
                </span>

                <button id='break-increment' className='btn-controllers' onClick={decreasebreak}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>

            </div>
        </div >
    )

}