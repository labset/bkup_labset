import { Command } from 'commander';

import { cdk } from './task/cdk';
import { codegen } from './task/codegen';

const program = new Command();

codegen(program);
cdk(program);

// eslint-disable-next-line @typescript-eslint/no-var-requires
program.version(require('./package.json').version);
program.parse(process.argv);
