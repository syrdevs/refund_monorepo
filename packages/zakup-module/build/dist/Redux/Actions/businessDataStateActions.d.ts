import { ReduxActionType } from '@vitacore/shared-ui';
import { Commission } from '../../Entities/Commission';
import { CommissionMember, Person } from '../../Entities/CommissionMember';
import { Notice } from '../../Entities/Notice';
import Supplier, { BadSupplier } from '../../Entities/Supplier';
import { dictionariesNames } from '../../Infrastructure/dictionariesList';
export declare function fetchNotices(page: number, pageSize: number, onlyMy?: boolean): ReduxActionType;
export declare function fetchNoticesSuccess(notices: Notice[], total: number): ReduxActionType<{
    notices: Notice[];
    total: number;
}>;
export declare function fetchSingleNotice(id: string): ReduxActionType<string>;
export declare function setNewNotice(): ReduxActionType;
export declare function fetchSingleNoticeSuccess(ad: Notice): ReduxActionType<Notice>;
export declare function setNewCommission(): ReduxActionType;
export declare function clearFetchEntityStatus(): {
    type: string;
};
export declare function dispatchClearFetchEntityStatus(): void;
export declare function fetchCommissions(): {
    type: string;
    payload: {};
};
export declare function fetchCommissionsSuccess(results: Commission[]): ReduxActionType<Commission[]>;
export declare function fetchSingleCommission(id: string): {
    type: string;
    payload: string;
};
export declare function fetchSingleCommissionSuccess(results: Commission): ReduxActionType<Commission>;
export declare function findPersonByIIN(iin: string): {
    type: string;
    payload: string;
};
export declare function findPersonByIINSuccess(result: Person): ReduxActionType<Person>;
export declare function fetchSingleCommissionMember(id: number): {
    type: string;
    payload: number;
};
export declare function fetchSingleCommissionMemberSuccess(result: CommissionMember): ReduxActionType<CommissionMember>;
export declare function deleteCommissionMember(id: string): {
    type: string;
    payload: string;
};
export declare function fetchAdApplicants(id: number): {
    type: string;
    payload: {
        id: number;
    };
};
export declare function fetchAllSuppliers(): {
    type: string;
    payload: {};
};
export declare function fetchAllSuppliersSuccess(results: Supplier[]): ReduxActionType<Supplier[]>;
export declare function fetchBadSuppliers(): {
    type: string;
    payload: {};
};
export declare function fetchBadSuppliersSuccess(results: BadSupplier[]): ReduxActionType<BadSupplier[]>;
export declare function fetchCustomDict(dicts: dictionariesNames[]): ReduxActionType<dictionariesNames[]>;
