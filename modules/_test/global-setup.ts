// noinspection JSUnusedGlobalSymbols

import path from 'path';

export default async () => {
    const { setup, startDb } = await import('jest-dynalite');
    setup(path.resolve(__dirname, 'dynalite'));

    await startDb();
};
