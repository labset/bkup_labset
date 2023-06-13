import { RequestHandler } from 'express';

const signOutHandler = (): RequestHandler => (request, response) => {
    request.logOut(() => {
        response.sendStatus(200);
    });
};

export { signOutHandler };
