import { createContext, useContext, useEffect, useState } from 'react';

const LANG_STORAGE_KEY = 'focus25:lang';

const translations = {
    es: {
        'header.lang.aria': 'Idioma',
        'header.status.aria': 'Estado de la aplicación',
        'header.cycle': ({ n }) => `Ciclo ${String(n).padStart(2, '0')}`,
        'title.idle': 'Listo',
        'title.active': 'En curso',

        'brand.aria': 'Focus 25 inicio',
        'brand.subtitle': 'Protocolo de trabajo profundo',

        'intro.eyebrow': 'Productividad personal / 001',
        'hero.before': 'Estructura tu',
        'hero.italic': 'mejor trabajo.',
        'intro.lede': 'Enfoque profundo, descanso deliberado. Marca el ritmo, encola la próxima tarea y dejá que el reloj mantenga el límite.',

        'timer.title.ready': 'Listo para empezar',
        'timer.title.session.active': 'Enfoque profundo en curso',
        'timer.title.break.active': 'En descanso — respirá',
        'timer.title.break.idle': 'Próximo descanso',
        'cycle.status.idle': 'Listo para comenzar',
        'cycle.status.active': 'En curso',

        'mode.session': 'Sesión',
        'mode.break': 'Descanso',

        'cycle.meta.session': ({ n, mins }) => `Ciclo ${String(n).padStart(2, '0')} · Bloque de ${mins} min`,
        'cycle.meta.break': ({ mins }) => `Recuperación · Descanso de ${mins} min`,

        'timer.footer.protocol': 'Protocolo',
        'timer.footer.transition': 'Enfoque → descanso',

        'controls.start': 'Iniciar temporizador',
        'controls.pause': 'Pausar temporizador',
        'controls.reset': 'Reiniciar temporizador',

        'presets.label': 'Protocolo',
        'presets.sub.classic': 'Clásico',
        'presets.sub.long': 'Enfoque profundo',
        'presets.sub.short': 'Rápido',
        'presets.custom': 'Personalizado',
        'presets.save': 'Guardar preajuste',
        'presets.save.disabled.title': 'Modificá los valores para guardar un preajuste personalizado',
        'presets.prompt.name': 'Nombra este preajuste',
        'presets.prompt.default': 'Mi protocolo',
        'presets.delete': ({ name }) => `Eliminar preajuste guardado ${name}`,

        'settings.aria': 'Ajustes del temporizador',
        'settings.lengths.label': 'Duraciones',
        'session.length.label': 'Duración de la sesión',
        'break.length.label': 'Duración del descanso',
        'toggles.aria': 'Interruptores de automatización',
        'auto.start.break.label': 'Inicio automático del descanso',

        'tasks.eyebrow': 'Plan de acción / 003',
        'tasks.title': '¿Qué vas a avanzar?',
        'tasks.summary.pomos': ({ done, total }) => `${done} / ${total} 🍅`,
        'tasks.summary.done': ({ done, total }) => `${done} / ${total} hechas`,
        'tasks.add.placeholder': 'Añadí una tarea y presioná Enter…',
        'tasks.add.aria': 'Descripción de la nueva tarea',
        'tasks.add.button': 'Añadir',
        'tasks.add.aria.button': 'Añadir tarea',
        'tasks.empty': 'Aún no hay tareas. Definí el próximo resultado concreto — las tareas pequeñas agudizan el enfoque.',
        'tasks.active.badge': 'Activa',
        'tasks.estimate.decrease': 'Disminuir estimación',
        'tasks.estimate.increase': 'Aumentar estimación',
        'tasks.complete.toggle.done': ({ text }) => `Marcar ${text} como hecha`,
        'tasks.complete.toggle.undone': ({ text }) => `Marcar ${text} como no hecha`,
        'tasks.remove': ({ text }) => `Eliminar tarea ${text}`,
        'tasks.set.active': ({ text }) => `Establecer ${text} como activa`,
        'tasks.set.active.title': 'Establecer como activa',
        'tasks.active.current': ({ text }) => `Tarea activa: ${text}`,
        'tasks.active.current.clear': ({ text }) => `Tarea activa: ${text} — click para limpiar`,
        'tasks.active.title': 'Actualmente activa',
        'tasks.active.clear.title': 'Activa — click para limpiar',
        'tasks.completed.locked': ({ text }) => `${text} completada`,
        'tasks.completed.title': 'Tarea completada',

        'footer.tagline': 'Diseñado para progreso deliberado.'
    },
    en: {
        'header.lang.aria': 'Language',
        'header.status.aria': 'Application status',
        'header.cycle': ({ n }) => `Cycle ${String(n).padStart(2, '0')}`,
        'title.idle': 'Ready',
        'title.active': 'In progress',

        'brand.aria': 'Focus 25 home',
        'brand.subtitle': 'Deep work protocol',

        'intro.eyebrow': 'Personal productivity / 001',
        'hero.before': 'Structure your',
        'hero.italic': 'best work.',
        'intro.lede': 'Deep focus, deliberate rest. Set the rhythm, queue the next move, and let the clock keep the boundary.',

        'timer.title.ready': 'Ready to begin',
        'timer.title.session.active': 'Deep focus in progress',
        'timer.title.break.active': 'On break — breathe',
        'timer.title.break.idle': 'Break coming up',
        'cycle.status.idle': 'Ready to start',
        'cycle.status.active': 'In progress',

        'mode.session': 'Session',
        'mode.break': 'Break',

        'cycle.meta.session': ({ n, mins }) => `Cycle ${String(n).padStart(2, '0')} · ${mins} min focus block`,
        'cycle.meta.break': ({ mins }) => `Recovery · ${mins} min break`,

        'timer.footer.protocol': 'Protocol',
        'timer.footer.transition': 'Focus → break',

        'controls.start': 'Start timer',
        'controls.pause': 'Pause timer',
        'controls.reset': 'Reset timer',

        'presets.label': 'Protocol',
        'presets.sub.classic': 'Classic',
        'presets.sub.long': 'Deep focus',
        'presets.sub.short': 'Quick',
        'presets.custom': 'Custom',
        'presets.save': 'Save preset',
        'presets.save.disabled.title': 'Adjust the values to save a custom preset',
        'presets.prompt.name': 'Name this preset',
        'presets.prompt.default': 'My protocol',
        'presets.delete': ({ name }) => `Delete saved preset ${name}`,

        'settings.aria': 'Timer settings',
        'settings.lengths.label': 'Lengths',
        'session.length.label': 'Session length',
        'break.length.label': 'Break length',
        'toggles.aria': 'Automation toggles',
        'auto.start.break.label': 'Auto-start break',

        'tasks.eyebrow': 'Plan of attack / 003',
        'tasks.title': 'What will you move forward?',
        'tasks.summary.pomos': ({ done, total }) => `${done} / ${total} 🍅`,
        'tasks.summary.done': ({ done, total }) => `${done} / ${total} done`,
        'tasks.add.placeholder': 'Add a task and press Enter…',
        'tasks.add.aria': 'New task description',
        'tasks.add.button': 'Add',
        'tasks.add.aria.button': 'Add task',
        'tasks.empty': 'No tasks yet. Define the next concrete outcome — small tasks sharpen focus.',
        'tasks.active.badge': 'Active',
        'tasks.estimate.decrease': 'Decrease estimate',
        'tasks.estimate.increase': 'Increase estimate',
        'tasks.complete.toggle.done': ({ text }) => `Mark ${text} as done`,
        'tasks.complete.toggle.undone': ({ text }) => `Mark ${text} as not done`,
        'tasks.remove': ({ text }) => `Remove task ${text}`,
        'tasks.set.active': ({ text }) => `Set ${text} as active`,
        'tasks.set.active.title': 'Set as active',
        'tasks.active.current': ({ text }) => `Active task: ${text}`,
        'tasks.active.current.clear': ({ text }) => `Active task: ${text} — click to clear`,
        'tasks.active.title': 'Currently active',
        'tasks.active.clear.title': 'Active — click to clear',
        'tasks.completed.locked': ({ text }) => `${text} is completed`,
        'tasks.completed.title': 'Completed task',

        'footer.tagline': 'Designed for deliberate progress.'
    }
};

const LangContext = createContext({
    lang: 'es',
    setLang: () => {},
    t: (key, args) => {
        const dict = translations.en;
        const val = dict[key];
        if (typeof val === 'function') return val(args || {});
        return val != null ? val : key;
    }
});

const renderValue = (val, args) => {
    if (typeof val === 'function') return val(args || {});
    if (typeof val === 'string' && args) {
        return val.replace(/\{(\w+)\}/g, (_, k) => (args[k] != null ? String(args[k]) : `{${k}}`));
    }
    return val;
};

export const TranslationProvider = ({ children, initialLang }) => {
    const [lang, setLangState] = useState(() => {
        if (initialLang) return initialLang;
        if (typeof window === 'undefined') return 'es';
        const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
        return stored === 'en' || stored === 'es' ? stored : 'es';
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(LANG_STORAGE_KEY, lang);
        if (typeof document !== 'undefined') {
            document.documentElement.lang = lang;
        }
    }, [lang]);

    const setLang = (next) => {
        if (next !== 'es' && next !== 'en') return;
        setLangState(next);
    };

    const t = (key, args) => {
        const dict = translations[lang] || translations.es;
        const val = dict[key];
        if (val == null) {
            const fallback = translations.en[key];
            return renderValue(fallback, args) ?? key;
        }
        return renderValue(val, args);
    };

    return (
        <LangContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LangContext.Provider>
    );
};

export const useTranslation = () => useContext(LangContext);
