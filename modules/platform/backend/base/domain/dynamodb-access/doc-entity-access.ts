import {
    IDocEntityReadAccess,
    IDocEntityWriteAccess
} from '@labset-plaform-backend-base/domain-api-access';
import { DocEntity } from '@labset-plaform-backend-base/domain-api-entity';

import { IDocEntityAccess } from './../api-access/read-write-access';

class DocEntityAccess<TEntity extends DocEntity>
    implements IDocEntityAccess<TEntity>
{
    constructor(
        readonly reader: IDocEntityReadAccess<TEntity>,
        readonly writer: IDocEntityWriteAccess<TEntity>
    ) {}
}

export { DocEntityAccess };
