import { DictionaryBaseML } from '@vitacore/shared-ui';
import { dictionariesNames } from '../../Infrastructure/dictionariesList';
declare type DictionariesDataState = {
    [key in dictionariesNames]: DictionaryBaseML[];
} & {
    dictNamesFetching: string[];
};
export default DictionariesDataState;
