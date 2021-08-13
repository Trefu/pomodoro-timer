import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

export const TimeSetter = ({ type, value }) => {
    const [val, setVal] = value;
    const handleIncrement = () => {
        if (val > 59) return;
        setVal(prevState => prevState + 1)

    }
    const handleDecrement = () => {
        if (val === 1) return;
        setVal(prevState => prevState - 1)

    }
    return (
        < div className='flex flex-col items-center p-2' >
            <span id={`${type}-label`} className='text-2xl'>{type} length</span>
            <div className="flex items-center">

                <button id={`${type}-increment`} className='btn-controllers' onClick={handleIncrement} >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>

                <span id={`${type}-length`} className='text-xl mx-2'>
                    {val}
                </span>

                <button id={`${type}-decrement`} className='btn-controllers' onClick={handleDecrement}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>

            </div>
        </div >
    )

}