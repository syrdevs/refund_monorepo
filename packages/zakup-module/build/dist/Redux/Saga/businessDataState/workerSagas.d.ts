import { ReduxActionType } from '@vitacore/shared-ui';
import { dictionariesNames } from '../../../Infrastructure/dictionariesList';
export declare function fetchNoticesWorkerSaga(action: ReduxActionType<{
    page: number;
    pageSize: number;
    onlyMy: boolean;
}>): IterableIterator<import("redux-saga/effects").CallEffect | import("redux-saga/effects").PutEffect<{
    type: string;
}>>;
export declare function fetchSingleNoticeWorkerSaga(action: ReduxActionType<string>): IterableIterator<import("redux-saga/effects").AllEffect | import("redux-saga/effects").CallEffect | import("redux-saga/effects").PutEffect<{
    type: string;
}>>;
export declare function setNewNoticeWorkerSaga(): IterableIterator<import("redux-saga/effects").AllEffect | import("redux-saga/effects").PutEffect<ReduxActionType<string | number | boolean | {
    [key: string]: any;
} | undefined>>>;
export declare function fetchCommissionsWorkerSaga(): IterableIterator<import("redux-saga/effects").CallEffect | import("redux-saga/effects").PutEffect<{
    type: string;
}>>;
export declare function fetchSingleCommissionWorkerSaga(action: ReduxActionType<string>): IterableIterator<import("redux-saga/effects").AllEffect | import("redux-saga/effects").CallEffect | import("redux-saga/effects").PutEffect<{
    type: string;
}>>;
export declare function findPersonByIINWorkerSaga(action: ReduxActionType<string>): IterableIterator<import("redux-saga/effects").CallEffect | import("redux-saga/effects").PutEffect<{
    type: string;
}>>;
export declare function setNewCommissionWorkerSaga(): IterableIterator<import("redux-saga/effects").AllEffect | import("redux-saga/effects").PutEffect<ReduxActionType<string | number | boolean | {
    [key: string]: any;
} | undefined>>>;
export declare function fetchCustomDictWorkerSaga(action: ReduxActionType<dictionariesNames[]>): IterableIterator<import("redux-saga/effects").PutEffect<{
    type: string;
    payload: string[];
}> | import("redux-saga/effects").AllEffect | import("redux-saga/effects").PutEffect<{
    type: string;
    payload: undefined;
}>>;
export declare function deleteCommissionMemberWorkerSaga(action: ReduxActionType<string>): IterableIterator<import("redux-saga/effects").CallEffect | import("redux-saga/effects").PutEffect<{
    type: string;
}>>;
