import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

export const TimeSetter = ({ type, value }) => {
    const [val, setVal] = value;
    const handleIncrease = () => {
        if (val > 59) return;
        setVal(val + 1)

    }
    const handleDecrement = () => {
        if (val === 1) return;
        setVal(val - 1)

    }
    return (
        < div className='flex flex-col items-center p-2' >
            <span id={`${type}-label`} className='text-2xl'>Break Length</span>
            <div className="flex items-center">

                <button id='break-decrement' className='btn-controllers' onClick={handleIncrease} >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>

                <span id='break-length' className='text-xl mx-2'>
                    {val}
                </span>

                <button id='break-increment' className='btn-controllers' onClick={handleDecrement}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>

            </div>
        </div >
    )

}