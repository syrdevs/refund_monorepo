import { DICTIONARIES_FETCH_FINISHED, DICTIONARIES_FETCH_REQUESTED, DICTIONARIES_FETCH_SUCCESS_BASE, } from '../Constants/dictionariesDataStateConstants';
export function dictFetching(dictNames) {
    return {
        type: DICTIONARIES_FETCH_REQUESTED,
        payload: dictNames,
    };
}
export function dictFetchingFinished() {
    return {
        type: DICTIONARIES_FETCH_FINISHED,
        payload: undefined,
    };
}
export function dictFetchSuccess(dictName, dictItems) {
    return {
        type: DICTIONARIES_FETCH_SUCCESS_BASE + "." + dictName,
        payload: dictItems,
    };
}
//# sourceMappingURL=dictionariesDataStateActions.js.map