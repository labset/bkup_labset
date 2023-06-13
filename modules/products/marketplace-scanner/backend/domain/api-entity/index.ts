import {
    DocEntity,
    Identifier
} from '@labset-plaform-backend-base/domain-api-entity';

interface Application extends DocEntity {
    key: string;
    name: string;
}

interface ApplicationAwareEntity extends DocEntity {
    applicationId: Identifier;
}

interface Addon extends ApplicationAwareEntity {
    key: string;
    name: string;
}

interface AddonAwareEntity extends ApplicationAwareEntity {
    addonId: Identifier;
}

interface AddonVersion extends AddonAwareEntity {
    version: string;
    artifactUrl: string;
}

export type {
    Application,
    ApplicationAwareEntity,
    Addon,
    AddonVersion,
    AddonAwareEntity
};
