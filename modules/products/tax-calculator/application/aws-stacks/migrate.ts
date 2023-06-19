import { withLocalstack } from '@labset-platform-backend-core/with-localstack';

const migrate = async () => {
    withLocalstack();
    // TODO : when we start persisting things
};

migrate().then(console.info).catch(console.error);
