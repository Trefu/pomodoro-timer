#!/usr/bin/env node
const { spawn } = require('child_process');

const child = spawn(
    process.execPath,
    ['--openssl-legacy-provider', require.resolve('@craco/craco/scripts/build.js')],
    { stdio: 'inherit', env: process.env }
);

const forward = (signal) => () => child.kill(signal);
['SIGINT', 'SIGTERM'].forEach((sig) => process.on(sig, forward(sig)));

child.on('exit', (code) => process.exit(code ?? 0));
