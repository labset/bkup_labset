import path from 'path';

import { isLocalstack } from '@labset-platform-backend-core/configuration';
import dotenv from 'dotenv';

const withLocalstack = () => {
    if (isLocalstack()) {
        dotenv.config({ path: path.resolve(__dirname, '.env.localstack') });
    }
};

export { withLocalstack };
