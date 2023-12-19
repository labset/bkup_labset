import { execSync } from 'child_process';

import { Command } from 'commander';

const codegen = (program: Command) => {
    program.command('codegen').action(() => {
        execSync(
            `yarn workspace @labset-platform-graphql-core/schema codegen`,
            {
                stdio: 'inherit'
            }
        );
        const products = ['mps', 'publisher'];
        for (const product of products) {
            execSync(
                `yarn workspace @labset-${product}-graphql/schema codegen`,
                { stdio: 'inherit' }
            );
        }
    });
};

export { codegen };
