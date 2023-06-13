/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const distros = [
    'tmp',
    'dist',
    'modules/platform/application/core/aws-stacks/cdk.out',
];

distros.forEach((dir) => {
    const target = path.resolve(__dirname, dir);
    if (fs.existsSync(target)) {
        fs.rmSync(target, { recursive: true });
    }
});
