import { DictionaryBaseML, ReduxActionType } from '@vitacore/shared-ui';
export declare function dictFetching(dictNames: string[]): {
    type: string;
    payload: string[];
};
export declare function dictFetchingFinished(): {
    type: string;
    payload: undefined;
};
export declare function dictFetchSuccess(dictName: string, dictItems: DictionaryBaseML[]): ReduxActionType<DictionaryBaseML[]>;
