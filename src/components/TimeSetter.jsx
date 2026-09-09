import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const TimeSetter = ({ type, value }) => {
    const [val, setVal] = value;
    const label = type === 'break' ? 'Break length' : 'Session length';

    const handleIncrement = () => {
        if (val >= 60) return;
        setVal(previousValue => previousValue + 1);
    };

    const handleDecrement = () => {
        if (val <= 1) return;
        setVal(previousValue => previousValue - 1);
    };

    return (
        <div className="time-setter">
            <div className="time-setter-heading">
                <span className="time-setter-index">{type === 'break' ? '02' : '01'}</span>
                <span id={`${type}-label`} className="time-setter-label">{label}</span>
            </div>
            <div className="stepper">
                <button
                    id={`${type}-increment`}
                    className="stepper-button"
                    type="button"
                    aria-label={`Increase ${label}`}
                    onClick={handleIncrement}
                    disabled={val >= 60}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <span id={`${type}-length`} className="stepper-value" aria-live="polite">{val}</span>
                <button
                    id={`${type}-decrement`}
                    className="stepper-button"
                    type="button"
                    aria-label={`Decrease ${label}`}
                    onClick={handleDecrement}
                    disabled={val <= 1}
                >
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
            </div>
        </div>
    );
};
