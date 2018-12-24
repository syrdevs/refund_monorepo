import { DictionaryBaseML, Identifiable } from '@vitacore/shared-ui';
import { ActivityPick } from './Activity';
import { ClinicPick } from './Organization';
import { PeriodYearPick } from './PeriodYear';
export interface ApplicationRole {
    id: string;
    name: string;
}
export interface Application extends Identifiable {
    number?: string;
    descr?: string;
    documentDate?: string;
    periodYear?: PeriodYearPick;
    clinic?: ClinicPick;
    region?: DictionaryBaseML;
    role?: ApplicationRole;
}
export interface ApplicationItem extends Identifiable {
    activity: ActivityPick;
}
