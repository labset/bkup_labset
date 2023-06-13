import { coreConfiguration } from '@labset-platform-backend-core/configuration';

interface ISecretService {
    cookie(): Promise<{ secret: string }>;

    googleAuth(): Promise<{ clientID: string; clientSecret: string }>;
}

class SecretService implements ISecretService {
    async cookie(): Promise<{ secret: string }> {
        return {
            secret: coreConfiguration.COOKIE_SECRET
        };
    }

    async googleAuth(): Promise<{ clientID: string; clientSecret: string }> {
        return {
            clientID: coreConfiguration.GOOGLE_CLIENT_ID,
            clientSecret: coreConfiguration.GOOGLE_CLIENT_SECRET
        };
    }
}

export type { ISecretService };
export { SecretService };
