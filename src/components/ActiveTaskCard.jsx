import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../i18n';

export const ActiveTaskCard = ({ task, mode, cycle }) => {
    const { t, lang } = useTranslation();
    const isBreak = mode === 'break';

    if (!task) {
        return (
            <div className={`active-task-card is-empty${isBreak ? ' is-break' : ''}`}>
                <FontAwesomeIcon icon={faCircle} className="active-task-icon" aria-hidden="true" />
                <div className="active-task-body">
                    <span className="active-task-label">
                        {t('active.task.none.label')}
                    </span>
                    <span className="active-task-help">
                        {t('active.task.none.help')}
                    </span>
                </div>
            </div>
        );
    }

    const completed = Math.min(task.completed, task.estimated);
    const remaining = Math.max(0, task.estimated - completed);
    const percent = task.estimated > 0 ? Math.round((completed / task.estimated) * 100) : 0;

    return (
        <div
            className={`active-task-card${task.done ? ' is-done' : ''}${isBreak ? ' is-break' : ''}`}
            aria-label={
                isBreak
                    ? t('active.task.aria.break', { text: task.text })
                    : t('active.task.aria.focus', { text: task.text })
            }
        >
            <FontAwesomeIcon icon={faCircle} className="active-task-icon" aria-hidden="true" />
            <div className="active-task-body">
                <div className="active-task-top">
                    <span className="active-task-label">
                        {isBreak ? t('active.task.next.label') : t('active.task.label')}
                    </span>
                    <span className="active-task-cycle">
                        {t('active.task.cycle', { n: cycle })}
                    </span>
                </div>
                <p className="active-task-text" lang={lang}>
                    {task.text}
                </p>
                <div className="active-task-progress-row">
                    <div className="active-task-progress" aria-hidden="true">
                        <span style={{ width: `${percent}%` }} />
                    </div>
                    <span className="active-task-count">
                        <span className="active-task-pomos">
                            <strong>{completed}</strong>
                            <span className="muted"> / {task.estimated}</span>
                        </span>
                        <span className="active-task-divider" aria-hidden="true" />
                        <span className="active-task-remaining">
                            <FontAwesomeIcon icon={faStopwatch} aria-hidden="true" />
                            <span>
                                {remaining > 0
                                    ? t('active.task.remaining', { n: remaining })
                                    : t('active.task.complete')}
                            </span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};
