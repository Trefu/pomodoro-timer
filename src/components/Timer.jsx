export const Timer = ({ currentMode, currentTime, isActive }) => {
    const [mode] = currentMode;
    const [seconds, minutes] = currentTime;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const modeLabel = mode === 'session' ? 'Session' : 'Break';

    return (
        <div className={`timer-display${isActive ? ' is-active' : ''}`}>
            <div className="timer-display-heading">
                <span id="timer-label" className="timer-label">{modeLabel}</span>
                <span className="timer-state">{isActive ? 'Running' : 'Paused'}</span>
            </div>
            <p id="time-left" className="timer-value" aria-live="polite">
                {formattedMinutes}:{formattedSeconds}
            </p>
            <div className="timer-track" aria-hidden="true"><span /></div>
        </div>
    );
};
