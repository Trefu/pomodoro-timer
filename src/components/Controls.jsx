import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../i18n';

export const Controls = ({ values, isActive }) => {
    const { t } = useTranslation();
    const [playStopTime, resetTime] = values;

    return (
        <div className="timer-controls">
            <button
                id="start_stop"
                className="control-button control-button-primary"
                type="button"
                onClick={playStopTime}
                aria-label={isActive ? t('controls.pause') : t('controls.start')}
            >
                <FontAwesomeIcon icon={isActive ? faPause : faPlay} />
                <span>{isActive ? t('controls.pause') : t('controls.start')}</span>
            </button>
            <button
                id="reset"
                className="control-button control-button-secondary"
                type="button"
                onClick={resetTime}
                aria-label={t('controls.reset')}
            >
                <FontAwesomeIcon icon={faStop} />
                <span>{t('controls.reset')}</span>
            </button>
        </div>
    );
};
