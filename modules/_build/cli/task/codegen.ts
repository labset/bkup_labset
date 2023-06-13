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
    });
};

export { codegen };
