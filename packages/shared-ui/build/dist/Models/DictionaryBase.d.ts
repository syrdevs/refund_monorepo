import { Identifiable } from './Identifiable';
import { ML } from './ML';
export interface DictionaryBase extends Identifiable {
    code?: string;
}
export interface DictionaryBaseML extends DictionaryBase, ML {
}
export interface DictionaryBaseMLWithShortName extends DictionaryBaseML {
    shortname?: string;
}
