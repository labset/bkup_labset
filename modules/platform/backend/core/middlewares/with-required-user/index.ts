import { Request, Response, NextFunction } from 'express';

export const withRequiredUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (request.isAuthenticated() && request.user !== undefined) return next();
    else return response.sendStatus(401);
};
