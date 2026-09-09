import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle, faDotCircle, faMinus, faPlus, faStopwatch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../i18n';

const Task = ({ task, onToggle, onSetActive, onEstimateChange, onRemove }) => {
    const { t } = useTranslation();
    const ratio = Math.min(task.completed, task.estimated);
    const percent = task.estimated > 0 ? Math.round((ratio / task.estimated) * 100) : 0;
    return (
        <li className={`task${task.done ? ' is-done' : ''}${task.isActive ? ' is-active' : ''}`}>
            <button
                type="button"
                className={`task-active-toggle${task.isActive ? ' is-active' : ''}`}
                onClick={() => onSetActive(task.id)}
                disabled={task.done}
                aria-label={
                    task.done
                        ? t('tasks.completed.locked', { text: task.text })
                        : task.isActive
                            ? t('tasks.active.current.clear', { text: task.text })
                            : t('tasks.set.active', { text: task.text })
                }
                aria-pressed={task.isActive}
                title={
                    task.done
                        ? t('tasks.completed.title')
                        : task.isActive
                            ? t('tasks.active.clear.title')
                            : t('tasks.set.active.title')
                }
            >
                <FontAwesomeIcon icon={task.isActive ? faDotCircle : faCircle} />
            </button>
            <button
                type="button"
                className="task-check"
                onClick={() => onToggle(task.id)}
                aria-label={task.done
                    ? t('tasks.complete.toggle.undone', { text: task.text })
                    : t('tasks.complete.toggle.done', { text: task.text })
                }
            >
                <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
                type="button"
                className={`task-body task-body-button${task.isActive ? ' is-active' : ''}`}
                onClick={() => onSetActive(task.id)}
                disabled={task.done}
                aria-label={
                    task.isActive
                        ? t('tasks.active.current.clear', { text: task.text })
                        : t('tasks.set.active', { text: task.text })
                }
            >
                <div className="task-text-row">
                    <span className="task-text">{task.text}</span>
                    {task.isActive && <span className="task-active-badge">{t('tasks.active.badge')}</span>}
                </div>
                <div className="task-progress" aria-hidden="true">
                    <span style={{ width: `${percent}%` }} />
                </div>
            </button>
            <div className="task-estimate" aria-label={`${ratio} of ${task.estimated} pomodoros`}>
                <button
                    type="button"
                    className="task-estimate-btn"
                    onClick={() => onEstimateChange(task.id, -1)}
                    disabled={task.estimated <= 1}
                    aria-label={t('tasks.estimate.decrease')}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="task-estimate-count">
                    <span>{ratio}</span>
                    <span className="task-estimate-sep">/</span>
                    <span>{task.estimated}</span>
                </span>
                <button
                    type="button"
                    className="task-estimate-btn"
                    onClick={() => onEstimateChange(task.id, 1)}
                    aria-label={t('tasks.estimate.increase')}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <button
                type="button"
                className="task-remove"
                onClick={() => onRemove(task.id)}
                aria-label={t('tasks.remove', { text: task.text })}
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </li>
    );
};

export const TaskList = ({
    tasks,
    onAdd,
    onToggle,
    onSetActive,
    onEstimateChange,
    onRemove
}) => {
    const { t } = useTranslation();
    const [draft, setDraft] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = draft.trim();
        if (!text) return;
        onAdd(text);
        setDraft('');
    };

    const completed = tasks.filter((t) => t.done).length;
    const total = tasks.length;
    const totalEstimated = tasks.reduce((acc, t) => acc + t.estimated, 0);
    const totalCompleted = tasks.reduce(
        (acc, t) => acc + Math.min(t.completed, t.estimated),
        0
    );

    return (
        <section className="task-list" aria-labelledby="task-list-title">
            <header className="task-list-header">
                <div>
                    <p className="eyebrow">{t('tasks.eyebrow')}</p>
                    <h2 id="task-list-title">{t('tasks.title')}</h2>
                </div>
                <div className="task-list-summary">
                    <span className="task-list-summary-pomos">
                        <strong>{totalCompleted}</strong>
                        <span className="muted"> / {totalEstimated}</span>
                        <FontAwesomeIcon icon={faStopwatch} className="task-list-summary-icon" aria-hidden="true" />
                    </span>
                    <span className="muted">
                        {t('tasks.summary.done', { done: completed, total })}
                    </span>
                </div>
            </header>

            <form className="task-add" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="task-add-input"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={t('tasks.add.placeholder')}
                    aria-label={t('tasks.add.aria')}
                    maxLength={120}
                />
                <button
                    type="submit"
                    className="task-add-btn"
                    disabled={!draft.trim()}
                    aria-label={t('tasks.add.aria.button')}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>{t('tasks.add.button')}</span>
                </button>
            </form>

            {tasks.length === 0 ? (
                <p className="task-empty">{t('tasks.empty')}</p>
            ) : (
                <ul className="task-items">
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onSetActive={onSetActive}
                            onEstimateChange={onEstimateChange}
                            onRemove={onRemove}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
};
