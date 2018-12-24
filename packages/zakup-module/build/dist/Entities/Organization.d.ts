import { Identifiable } from '@vitacore/shared-ui';
export interface Organization extends Identifiable {
    shortName: string;
    name: string;
    registrationDate: string;
}
export interface ClinicPick extends Identifiable {
    shortName: string;
}
