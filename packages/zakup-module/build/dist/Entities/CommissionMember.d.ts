import { DictionaryBaseML, Identifiable } from '@vitacore/shared-ui';
import { Moment } from 'moment';
export interface CommissionMemberRole {
    id: number;
    name: string;
}
export interface Person extends Identifiable {
    firstName: string;
    lastName: string;
    patronymic?: string;
    iin?: string;
    birthdate: string;
    workPlace?: string;
    sex: DictionaryBaseML & {
        shortname?: string;
    };
}
export interface CommissionMember extends Identifiable {
    person: Person;
    dateBegin: Moment;
    dateEnd?: Moment;
    meetingMemberRole: DictionaryBaseML;
}
export interface NewCommissionMember extends CommissionMember {
    reason?: string;
    comment?: string;
}
