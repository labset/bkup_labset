import { RequestHandler } from 'express';
import { uid } from 'uid/secure';

interface ClaimTokenHandlerProps {
    product: { key: string };
}

const claimTokenHandler =
    ({ product }: ClaimTokenHandlerProps): RequestHandler =>
    (request, response) => {
        const session = request.session;
        if (!session) {
            console.warn('session not found');
            return response.sendStatus(403);
        }

        const isValidSession = request.isAuthenticated() && !!request.user;
        if (!isValidSession) {
            console.warn('session is not valid');
            return response.sendStatus(403);
        }

        const currentClaimToken = session.claimToken;
        session.claimToken = undefined;
        if (currentClaimToken === undefined) {
            console.warn('attempted to claim the token twice');
            return response.sendStatus(403);
        }

        session.authToken = uid(32);

        const suppliedClaimToken = request.body.claim;
        if (
            typeof suppliedClaimToken !== 'string' ||
            suppliedClaimToken.length === 0
        ) {
            return response.sendStatus(403);
        }

        const isMatchingClaim = currentClaimToken === suppliedClaimToken;
        if (!isMatchingClaim) {
            console.warn('session claim token does not match');
            return response.sendStatus(403);
        }

        return response
            .set('cache-control', 'no-store')
            .setHeader(`x-labset-${product.key}-token`, session.authToken)
            .status(200)
            .end();
    };

export { claimTokenHandler };
