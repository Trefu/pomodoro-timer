import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../i18n';

const NumberStepper = ({ id, label, value, min, max, onChange }) => {
    const labelId = id === 'session-length'
        ? 'session-label'
        : id === 'break-length'
            ? 'break-label'
            : `${id}-label`;
    const handleInc = () => onChange(Math.min(max, value + 1));
    const handleDec = () => onChange(Math.max(min, value - 1));
    return (
        <div className="inline-stepper">
            <span id={labelId} className="inline-stepper-label">
                {label}
            </span>
            <div className="inline-stepper-controls">
                <button
                    type="button"
                    id={`${id}-decrement`}
                    className="inline-stepper-btn"
                    onClick={handleDec}
                    disabled={value <= min}
                    aria-label={`Decrease ${label}`}
                >
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <span id={id} className="inline-stepper-value" aria-live="polite">
                    {value}
                </span>
                <button
                    type="button"
                    id={`${id}-increment`}
                    className="inline-stepper-btn"
                    onClick={handleInc}
                    disabled={value >= max}
                    aria-label={`Increase ${label}`}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>
        </div>
    );
};

export const SettingsPanel = ({ config, onChange }) => {
    const { t } = useTranslation();
    const update = (patch) => onChange({ ...config, ...patch });

    return (
        <div className="settings-panel" aria-label={t('settings.aria')}>
            <span className="settings-section-label settings-section-label-block">
                {t('settings.lengths.label')}
            </span>
            <NumberStepper
                id="session-length"
                label={t('session.length.label')}
                value={config.sessionLength}
                min={1}
                max={60}
                onChange={(v) => update({ sessionLength: v, activeConfig: 'custom' })}
            />
            <NumberStepper
                id="break-length"
                label={t('break.length.label')}
                value={config.breakLength}
                min={1}
                max={30}
                onChange={(v) => update({ breakLength: v, activeConfig: 'custom' })}
            />
        </div>
    );
};

export const TogglesPanel = ({ config, onChange }) => {
    const { t } = useTranslation();
    const update = (patch) => onChange({ ...config, ...patch });

    return (
        <div className="toggles-panel" aria-label={t('toggles.aria')}>
            <label className="toggle">
                <input
                    type="checkbox"
                    checked={config.autoStartBreak}
                    onChange={(e) => update({ autoStartBreak: e.target.checked })}
                />
                <span className="toggle-track" aria-hidden="true">
                    <span className="toggle-thumb" />
                </span>
                <span className="toggle-label">{t('auto.start.break.label')}</span>
            </label>
        </div>
    );
};
