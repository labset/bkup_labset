import { execSync } from 'child_process';

import { Command } from 'commander';

const cdk = (program: Command) => {
    program
        .command('cdk <action>')
        .option('-t, --target <target>', 'select target')
        .option('-e, --env <env>', 'select environment', 'local')
        .action((action, opts) => {
            const knownActions = ['bootstrap', 'synth', 'diff', 'deploy'];
            if (knownActions.includes(action)) {
                const workspaceName = `@labset-${opts.target}-aws/aws-stacks`;
                execSync(
                    `yarn workspace ${workspaceName} ${opts.env}:${action}`,
                    { stdio: 'inherit' }
                );
                if (action === 'deploy') {
                    execSync(
                        `yarn workspace ${workspaceName} ${opts.env}:migrate`,
                        {
                            stdio: 'inherit'
                        }
                    );
                }
            } else {
                console.error(`unknown cdk action ${action}`);
            }
        });
};

export { cdk };
