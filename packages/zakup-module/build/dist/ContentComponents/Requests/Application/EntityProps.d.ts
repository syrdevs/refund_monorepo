import { DictionaryBaseML } from '@vitacore/shared-ui';
import { Moment } from 'moment';
import { ApplicationRole } from '../../../Entities/Application';
import { Organization } from '../../../Entities/Organization';
export interface EntityProps {
    id: {
        value?: string;
    };
    number: {
        value?: string;
    };
    descr: {
        value?: string;
    };
    documentDate: {
        value?: Moment;
    };
    clinic: {
        value?: Organization;
    };
    region: {
        value?: DictionaryBaseML;
    };
    role: {
        value?: ApplicationRole;
    };
}
