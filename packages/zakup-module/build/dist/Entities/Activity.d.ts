import { DictionaryBaseML, Identifiable } from '@vitacore/shared-ui';
export interface Activity extends Identifiable {
    name: string;
    code: string;
    activityMeasureUnits: DictionaryBaseML[];
}
export interface ActivityPick extends Identifiable {
    name: string;
}
