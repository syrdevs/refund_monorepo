import { Commission } from '../../Entities/Commission';
import { CommissionMember, Person } from '../../Entities/CommissionMember';
import { Notice } from '../../Entities/Notice';
import { NoticeApplicant } from '../../Entities/NoticeApplicant';
import Supplier, { BadSupplier } from '../../Entities/Supplier';
import { FETCH_ENTITY_STATUS } from '../Constants/businessDataStateConstants';
export default interface BusinessDataState {
    noticeData: {
        notices: Notice[] | null;
        total: number;
        currentNotice: Notice | null;
        fetchSingleNoticeStatus: FETCH_ENTITY_STATUS;
    };
    commissionsData: {
        commissions: Commission[] | null;
        currentCommission: Commission | null;
        fetchSingleCommissionStatus: FETCH_ENTITY_STATUS;
        personFound: Person | null;
    };
    commissionMembers: CommissionMember[] | null;
    currentCommissionMember: CommissionMember | null;
    adApplicants: NoticeApplicant[] | null;
    suppliers: Supplier[] | null;
    badSuppliers: BadSupplier[] | null;
}
