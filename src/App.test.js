import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the pomodoro timer interface', () => {
    window.localStorage.setItem('focus25:lang', 'en');

    render(<App />);

    expect(screen.getByText('Session length')).toBeInTheDocument();
    expect(screen.getByText('Break length')).toBeInTheDocument();
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start timer/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /github.com\/trefu/i }).length).toBeGreaterThan(0);
    expect(document.getElementById('beep')).toBeInTheDocument();
    expect(document.getElementById('time-left')).toBeInTheDocument();
    expect(document.getElementById('timer-label')).toBeInTheDocument();
});
