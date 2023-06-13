import cors from 'cors';
import { Express } from 'express';

interface WithCors {
    app: Express;
    options: {
        origin: string[];
    };
}

const withCors = ({ app, options }: WithCors) => {
    app.options('*', cors<cors.CorsRequest>({ ...options, credentials: true }));
    app.use(cors<cors.CorsRequest>({ ...options, credentials: true }));
};

export { withCors };
