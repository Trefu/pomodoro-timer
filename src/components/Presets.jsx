import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../i18n';

const BUILTIN_PRESETS = [
    { id: 'classic', label: '25 / 5', subKey: 'presets.sub.classic', sessionLength: 25, breakLength: 5 },
    { id: 'long', label: '50 / 10', subKey: 'presets.sub.long', sessionLength: 50, breakLength: 10 },
    { id: 'short', label: '15 / 3', subKey: 'presets.sub.short', sessionLength: 15, breakLength: 3 }
];

export const Presets = ({
    activeConfig,
    config,
    savedConfigs,
    onSelectBuiltin,
    onSelectSaved,
    onDeleteSaved,
    onSaveCurrent
}) => {
    const { t } = useTranslation();
    const isActive = (id) => activeConfig === id;
    const canSave = activeConfig === 'custom';

    return (
        <div className="presets" role="group" aria-label={t('presets.label')}>
            <span className="presets-label">{t('presets.label')}</span>

            <div className="presets-chips">
                {BUILTIN_PRESETS.map((preset) => (
                    <button
                        key={preset.id}
                        type="button"
                        className={`preset-chip${isActive(preset.id) ? ' is-active' : ''}`}
                        onClick={() => onSelectBuiltin(preset)}
                        aria-pressed={isActive(preset.id)}
                    >
                        <span className="preset-chip-label">{preset.label}</span>
                        <span className="preset-chip-sub">{t(preset.subKey)}</span>
                    </button>
                ))}

                {savedConfigs.map((saved) => (
                    <div
                        key={saved.id}
                        className={`preset-chip preset-chip-saved${isActive(saved.id) ? ' is-active' : ''}`}
                    >
                        <button
                            type="button"
                            className="preset-chip-inner"
                            onClick={() => onSelectSaved(saved)}
                            aria-pressed={isActive(saved.id)}
                        >
                            <span className="preset-chip-label">{saved.name}</span>
                            <span className="preset-chip-sub">
                                {saved.sessionLength} / {saved.breakLength}
                            </span>
                        </button>
                        <button
                            type="button"
                            className="preset-chip-remove"
                            onClick={() => onDeleteSaved(saved.id)}
                            aria-label={t('presets.delete', { name: saved.name })}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="preset-save"
                onClick={onSaveCurrent}
                disabled={!canSave}
                title={!canSave ? t('presets.save.disabled.title') : undefined}
            >
                <FontAwesomeIcon icon={faBookmark} />
                <span>{t('presets.save')}</span>
            </button>
        </div>
    );
};
