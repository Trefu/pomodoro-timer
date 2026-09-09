#!/usr/bin/env node
const { spawn } = require('child_process');
const net = require('net');

const isPortFree = (port) => new Promise((resolve) => {
    const tester = net.createServer()
        .once('error', () => resolve(false))
        .once('listening', () => tester.close(() => resolve(true)))
        .listen(port, '0.0.0.0');
});

const findFreePort = async (start) => {
    for (let port = start; port < start + 50; port += 1) {
        if (await isPortFree(port)) return port;
    }
    throw new Error(`No free port found starting at ${start}`);
};

(async () => {
    const env = { ...process.env };

    if (!env.PORT) {
        try {
            const preferred = parseInt(env.REACT_APP_PORT || '3000', 10);
            env.PORT = String(await findFreePort(Number.isFinite(preferred) ? preferred : 3000));
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }

    env.BROWSER = env.BROWSER || 'none';

    const child = spawn(
        process.execPath,
        ['--openssl-legacy-provider', require.resolve('@craco/craco/scripts/start.js')],
        { stdio: 'inherit', env }
    );

    const forward = (signal) => () => child.kill(signal);
    ['SIGINT', 'SIGTERM'].forEach((sig) => process.on(sig, forward(sig)));

    child.on('exit', (code) => process.exit(code ?? 0));
})();
