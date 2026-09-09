#!/usr/bin/env node
const { spawn } = require('child_process');

const wantsWatch = process.argv.includes('--watchAll') || process.argv.includes('--watch');
const args = ['--openssl-legacy-provider', require.resolve('@craco/craco/scripts/test.js')];
if (!wantsWatch) args.push('--watchAll=false');

const child = spawn(process.execPath, args, { stdio: 'inherit', env: process.env });

const forward = (signal) => () => child.kill(signal);
['SIGINT', 'SIGTERM'].forEach((sig) => process.on(sig, forward(sig)));

child.on('exit', (code) => process.exit(code ?? 0));
