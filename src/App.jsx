import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controls } from './components/Controls';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { Presets } from './components/Presets';
import { SettingsPanel, TogglesPanel } from './components/SettingsPanel';
import { ActiveTaskCard } from './components/ActiveTaskCard';
import { TranslationProvider, useTranslation } from './i18n';

const STORAGE_KEY = 'focus25:v1';

const DEFAULT_CONFIG = {
    activeConfig: 'classic',
    sessionLength: 25,
    breakLength: 5,
    autoStartBreak: false
};

const loadState = () => {
    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        const storedTasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
        const tasks = storedTasks.map((t) => ({
            isActive: false,
            estimated: 1,
            completed: 0,
            done: false,
            text: '',
            createdAt: 0,
            ...t
        }));
        const hasActive = tasks.some((t) => t.isActive && !t.done);
        if (!hasActive) {
            const first = tasks.find((t) => !t.done);
            if (first) first.isActive = true;
        }
        return {
            activeConfig: parsed.activeConfig ?? DEFAULT_CONFIG.activeConfig,
            sessionLength: parsed.sessionLength ?? DEFAULT_CONFIG.sessionLength,
            breakLength: parsed.breakLength ?? DEFAULT_CONFIG.breakLength,
            autoStartBreak: Boolean(parsed.autoStartBreak),
            savedConfigs: Array.isArray(parsed.savedConfigs) ? parsed.savedConfigs : [],
            tasks
        };
    } catch (err) {
        return null;
    }
};

const persistState = (state) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
        // ignore quota errors
    }
};

const newTaskId = () =>
    `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

const LangToggle = () => {
    const { lang, setLang, t } = useTranslation();
    return (
        <div className="lang-toggle" role="group" aria-label={t('header.lang.aria')}>
            <button
                type="button"
                className={`lang-btn${lang === 'es' ? ' is-active' : ''}`}
                onClick={() => setLang('es')}
                aria-pressed={lang === 'es'}
                lang="es"
            >
                ES
            </button>
            <button
                type="button"
                className={`lang-btn${lang === 'en' ? ' is-active' : ''}`}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                lang="en"
            >
                EN
            </button>
        </div>
    );
};

function App() {
    const { lang, t } = useTranslation();
    const initial = useMemo(() => loadState(), []);

    const [activeConfig, setActiveConfig] = useState(
        (initial && initial.activeConfig) || DEFAULT_CONFIG.activeConfig
    );
    const [sessionLength, setSessionLength] = useState(
        (initial && initial.sessionLength) || DEFAULT_CONFIG.sessionLength
    );
    const [breakLength, setBreakLength] = useState(
        (initial && initial.breakLength) || DEFAULT_CONFIG.breakLength
    );
    const [autoStartBreak, setAutoStartBreak] = useState(
        initial ? Boolean(initial.autoStartBreak) : DEFAULT_CONFIG.autoStartBreak
    );

    const [savedConfigs, setSavedConfigs] = useState((initial && initial.savedConfigs) || []);
    const [tasks, setTasks] = useState((initial && initial.tasks) || []);

    const [mode, setMode] = useState('session');
    const [isActive, setIsActive] = useState(false);
    const [timerMinutes, setTimerMinutes] = useState(sessionLength);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [cycle, setCycle] = useState(0);
    const audioBeep = useRef(null);

    const currentConfig = useMemo(
        () => ({
            activeConfig,
            sessionLength,
            breakLength,
            autoStartBreak
        }),
        [activeConfig, sessionLength, breakLength, autoStartBreak]
    );

    useEffect(() => {
        persistState({
            ...currentConfig,
            savedConfigs,
            tasks
        });
    }, [currentConfig, savedConfigs, tasks]);

    const handleSelectBuiltin = (preset) => {
        setActiveConfig(preset.id);
        setSessionLength(preset.sessionLength);
        setBreakLength(preset.breakLength);
        if (!isActive) {
            setMode('session');
            setTimerMinutes(preset.sessionLength);
            setTimerSeconds(0);
        }
    };

    const handleSelectSaved = (saved) => {
        setActiveConfig(saved.id);
        setSessionLength(saved.sessionLength);
        setBreakLength(saved.breakLength);
        setAutoStartBreak(saved.autoStartBreak);
        if (!isActive) {
            setMode('session');
            setTimerMinutes(saved.sessionLength);
            setTimerSeconds(0);
        }
    };

    const handleDeleteSaved = (id) => {
        setSavedConfigs((prev) => prev.filter((c) => c.id !== id));
        if (activeConfig === id) {
            setActiveConfig('classic');
        }
    };

    const handleSaveCurrent = () => {
        const fallback = window.prompt(t('presets.prompt.name'), t('presets.prompt.default'));
        if (!fallback) return;
        const name = fallback.trim();
        if (!name) return;
        const id = `s_${Date.now().toString(36)}`;
        const entry = {
            id,
            name,
            sessionLength,
            breakLength,
            autoStartBreak
        };
        setSavedConfigs((prev) => [entry, ...prev].slice(0, 8));
        setActiveConfig(id);
    };

    const handleConfigChange = (next) => {
        setActiveConfig(next.activeConfig);
        setSessionLength(next.sessionLength);
        setBreakLength(next.breakLength);
        setAutoStartBreak(next.autoStartBreak);
    };

    const handleAddTask = (text) => {
        setTasks((prev) => {
            const hasActive = prev.some((t) => t.isActive && !t.done);
            return [
                ...prev,
                {
                    id: newTaskId(),
                    text,
                    estimated: 1,
                    completed: 0,
                    done: false,
                    isActive: !hasActive,
                    createdAt: Date.now()
                }
            ];
        });
    };

    const handleSetActiveTask = (id) => {
        setTasks((prev) => {
            const target = prev.find((t) => t.id === id);
            if (!target || target.done) return prev;
            if (target.isActive) {
                return prev.map((task) => ({ ...task, isActive: false }));
            }
            return prev.map((task) => ({ ...task, isActive: task.id === id }));
        });
    };

    const advanceActiveIfNeeded = (list, justFinishedId) => {
        const finished = list.find((t) => t.id === justFinishedId);
        if (!finished || !finished.done || !finished.isActive) return list;
        const next = list.find((t) => !t.done);
        if (!next) return list;
        return list.map((t) => ({ ...t, isActive: t.id === next.id }));
    };

    const handleToggleTask = (id) => {
        setTasks((prev) => {
            const updated = prev.map((task) =>
                task.id === id
                    ? { ...task, done: !task.done, completed: !task.done ? task.estimated : 0 }
                    : task
            );
            return advanceActiveIfNeeded(updated, id);
        });
    };

    const handleRemoveTask = (id) => {
        setTasks((prev) => {
            const removed = prev.find((t) => t.id === id);
            const filtered = prev.filter((task) => task.id !== id);
            if (!removed || !removed.isActive) return filtered;
            const next = filtered.find((t) => !t.done);
            if (!next) return filtered;
            return filtered.map((t) => ({ ...t, isActive: t.id === next.id }));
        });
    };

    const handleEstimateChange = (id, delta) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        estimated: Math.max(1, task.estimated + delta),
                        done: task.estimated + delta <= task.completed ? true : task.done
                    }
                    : task
            )
        );
    };

    const incrementActiveTask = useCallback(() => {
        setTasks((prev) => {
            const idx = prev.findIndex((t) => t.isActive && !t.done);
            if (idx === -1) return prev;
            const updated = prev.map((task, i) => {
                if (i !== idx) return task;
                const completed = Math.min(task.estimated, task.completed + 1);
                return { ...task, completed, done: completed >= task.estimated };
            });
            return advanceActiveIfNeeded(updated, prev[idx].id);
        });
    }, []);

    const playStopTime = () => setIsActive((prev) => !prev);

    const activeTask = useMemo(
        () => tasks.find((task) => task.isActive && !task.done) || null,
        [tasks]
    );

    const resetTime = () => {
        setMode('session');
        setIsActive(false);
        setTimerSeconds(0);
        setSessionLength(DEFAULT_CONFIG.sessionLength);
        setBreakLength(DEFAULT_CONFIG.breakLength);
        setAutoStartBreak(DEFAULT_CONFIG.autoStartBreak);
        setActiveConfig(DEFAULT_CONFIG.activeConfig);
        setTimerMinutes(DEFAULT_CONFIG.sessionLength);
        setCycle(0);
        if (audioBeep.current) {
            audioBeep.current.pause();
            audioBeep.current.currentTime = 0;
        }
    };

    const toggleSession = useCallback(() => {
        if (mode === 'session') {
            setMode('break');
            setIsActive(autoStartBreak);
        } else {
            setMode('session');
            setIsActive(false);
        }
    }, [autoStartBreak, mode]);

    const playBeep = useCallback(() => {
        if (!audioBeep.current) return;
        audioBeep.current.currentTime = 0;
        const playback = audioBeep.current.play();
        if (playback && typeof playback.catch === 'function') {
            playback.catch(() => {});
        }
    }, []);

    const decreaseTimer = useCallback(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                playBeep();
                if (mode === 'session') {
                    incrementActiveTask();
                    setCycle((c) => c + 1);
                }
                setIsActive(false);
                toggleSession();
                return;
            }
            setTimerSeconds(59);
            setTimerMinutes((prev) => prev - 1);
            return;
        }
        setTimerSeconds((prev) => prev - 1);
    }, [incrementActiveTask, mode, playBeep, timerMinutes, timerSeconds, toggleSession]);

    useEffect(() => {
        setTimerMinutes(mode === 'session' ? sessionLength : breakLength);
    }, [breakLength, mode, sessionLength]);

    useEffect(() => {
        setTimerSeconds(0);
    }, [mode]);

    useEffect(() => {
        if (!isActive) return undefined;
        const intervalId = setInterval(decreaseTimer, 1000);
        return () => clearInterval(intervalId);
    }, [decreaseTimer, isActive]);

    useEffect(() => {
        if (typeof document === 'undefined') return undefined;
        const pad = (n) => String(n).padStart(2, '0');
        const modeWord = mode === 'session' ? t('mode.session') : t('mode.break');
        const stateWord = isActive ? t('title.active') : (mode === 'session' ? t('title.idle') : t('mode.break'));
        const time = `${pad(timerMinutes)}:${pad(timerSeconds)}`;
        document.title = isActive
            ? `${time} · ${modeWord} · Focus / 25`
            : `${time} · ${stateWord} · Focus / 25`;
        return () => {
            document.title = 'Focus / 25 — Pomodoro Timer';
        };
    }, [isActive, lang, mode, timerMinutes, timerSeconds, t]);

    const modeLabel = mode === 'session' ? t('mode.session') : t('mode.break');

    const modeHeadline = isActive
        ? (mode === 'session' ? t('timer.title.session.active') : t('timer.title.break.active'))
        : (mode === 'session' ? t('timer.title.ready') : t('timer.title.break.idle'));

    return (
        <div className="app-wrapper">
            <div className="app-shell">
                <header className="site-header">
                    <a className="brand" href="#main-content" aria-label={t('brand.aria')}>
                        <span className="brand-mark" aria-hidden="true">
                            <span className="brand-mark-text">F</span>
                        </span>
                        <span className="brand-copy">
                            <span className="brand-name">Focus / 25</span>
                            <span className="brand-subtitle">{t('brand.subtitle')}</span>
                        </span>
                    </a>

                    <div className="header-meta" aria-label={t('header.status.aria')}>
                        <LangToggle />
                        <span className="header-divider" aria-hidden="true" />
                        <span className="header-code">{t('header.cycle', { n: cycle })}</span>
                    </div>
                </header>

                <main id="main-content" className="workspace">

                    <section
                        className={`timer-panel mode-${mode}${isActive ? ' is-running' : ' is-paused'}`}
                        aria-labelledby="timer-panel-title"
                    >
                        <div className="panel-topline">
                            <span id="timer-panel-title">{modeHeadline}</span>
                            <span className="cycle-status">
                                <span className="status-dot" aria-hidden="true" />
                                {isActive ? t('cycle.status.active') : t('cycle.status.idle')}
                            </span>
                        </div>

                        <div className="timer-shell">
                            <span className="timer-mode-eyebrow">{modeLabel}</span>
                            <Timer
                                currentMode={[mode, setMode]}
                                currentTime={[timerSeconds, timerMinutes]}
                                isActive={isActive}
                            />
                            <p className="cycle-meta">
                                {mode === 'session'
                                    ? t('cycle.meta.session', { n: cycle, mins: sessionLength })
                                    : t('cycle.meta.break', { mins: breakLength })}
                            </p>

                            <ActiveTaskCard task={activeTask} mode={mode} cycle={cycle} />

                            <Controls values={[playStopTime, resetTime]} isActive={isActive} />
                        </div>

                        <Presets
                            activeConfig={activeConfig}
                            config={currentConfig}
                            savedConfigs={savedConfigs}
                            onSelectBuiltin={handleSelectBuiltin}
                            onSelectSaved={handleSelectSaved}
                            onDeleteSaved={handleDeleteSaved}
                            onSaveCurrent={handleSaveCurrent}
                        />

                        <SettingsPanel config={currentConfig} onChange={handleConfigChange} />
                        <TogglesPanel config={currentConfig} onChange={handleConfigChange} />

                        <div className="timer-panel-footer">
                            <span>{t('timer.footer.protocol')}</span>
                            <span dangerouslySetInnerHTML={{
                                __html: t('timer.footer.transition').replace(/→/g, '<b>→</b>')
                            }} />
                        </div>
                    </section>

                    <TaskList
                        tasks={tasks}
                        onAdd={handleAddTask}
                        onToggle={handleToggleTask}
                        onSetActive={handleSetActiveTask}
                        onEstimateChange={handleEstimateChange}
                        onRemove={handleRemoveTask}
                    />
                </main>

                <footer className="site-footer">
                    <span>{t('footer.tagline')}</span>
                    <span className="footer-divider" aria-hidden="true">/</span>
                    <a href="https://github.com/trefu" target="_blank" rel="noreferrer">
                        © 2026 trefu · github.com/trefu
                    </a>
                </footer>
            </div>

            <audio
                id="beep"
                preload="auto"
                ref={audioBeep}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </div>
    );
}

const AppWithProvider = () => (
    <TranslationProvider>
        <App />
    </TranslationProvider>
);

export default AppWithProvider;
