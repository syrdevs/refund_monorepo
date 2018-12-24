import { AxiosData, DictionaryBaseML, Identifiable, ListData } from '@vitacore/shared-ui';
import { Moment } from 'moment';
import { Activity } from '../Entities/Activity';
import { CommissionMember } from '../Entities/CommissionMember';
import { DocumentAttachment } from '../Entities/DocumentAttachment';
import { ProtocolItem } from '../Entities/Protocol';
declare class APIClient {
    static doApiCall(url: string, method?: string, data?: any, params?: any, tokenRequired?: boolean, contentType?: string, responseType?: string): Promise<any>;
    fetchDict<T = DictionaryBaseML>(dictName: string, dictAlias?: string, sortNeeded?: boolean): Promise<AxiosData<ListData<T>>>;
    fetchNotices(page: number, pageSize: number): Promise<any>;
    fetchNotice(id: string): Promise<any>;
    saveNotice(notice: {
        id?: string;
        dateBegin: Moment;
        dateEnd: Moment;
        name: string;
        region: string;
        periodYear: string;
        noticeMedicalForms: Array<{
            id?: string;
            medicalForm: DictionaryBaseML;
        }>;
        noticeMedicalTypes: Array<{
            id?: string;
            medicalType: DictionaryBaseML;
        }>;
    }): Promise<any>;
    createProtocol(noticeId: string): Promise<any>;
    fetchCommissions(): Promise<any>;
    fetchSingleCommission(id: string): Promise<any>;
    saveCommission(commission: {
        id?: string;
        region: string;
        dateBegin: string;
        meetingMembers: CommissionMember[];
    }): Promise<any>;
    deleteCommissionMember(id: string): Promise<any>;
    findPersonByIIN(iin: string): Promise<any>;
    fetchApplications(page: number, pageSize: number): Promise<any>;
    fetchApplicationById(id: string): Promise<any>;
    saveApplication(application: {
        number: '';
        descr: '';
        documentDate: Moment;
        periodYear: Identifiable;
        applicationItems: Array<{
            id?: string;
            activity: Identifiable;
        }>;
    }): Promise<any>;
    fetchProposals(page: number, pageSize: number, noticeId?: string): Promise<any>;
    fetchProposalById(id: string): Promise<any>;
    saveProposal(proposal: {
        number: '';
        descr: '';
        documentDate: Moment;
        periodYear: Identifiable;
        clinic: Identifiable;
        region: Identifiable;
        proposalItems: Array<{
            activity: Pick<Activity, 'id'>;
            proposalItemValues: Array<{
                measureUnit: Pick<DictionaryBaseML, 'id'>;
                value: number;
            }>;
        }>;
    }): Promise<any>;
    fetchProtocols(page: number, pageSize: number, filter?: any): Promise<any>;
    fetchProtocolById(id: string): Promise<any>;
    fetchProtocolActivityGroupInfos(planProtocolId: string): Promise<any>;
    fetchProtocolActivityMeasureUnits(planProtocolId: string, activityId: string): Promise<any>;
    fetchProtocolItems(planProtocolId: string, activityId: string, page: number, pageSize: number): Promise<AxiosData<ListData<ProtocolItem>>>;
    deleteApplication(id: string): Promise<any>;
    acceptApplication(id: string): Promise<any>;
    declineApplication(id: string, rejectText: string): Promise<void>;
    deleteProposal(id: string): Promise<any>;
    acceptProposal(id: string): Promise<void>;
    declineProposal(id: string, rejectText: string): Promise<void>;
    savePlanProtocolItem(item: {
        id: string;
        planProtocolItemValues: Array<{
            id: string;
            value: number;
        }>;
    }): Promise<any>;
    downloadFile(id: string): Promise<any>;
    uploadFile(entity: string, id: string, doc: DocumentAttachment): Promise<any>;
    deleteFile(id: string): Promise<any>;
    getCommands(entity: string): Promise<any>;
    runCommand(commandId: string, objIds: string[], isReport?: boolean): Promise<any>;
    publishProtocol(id: string): Promise<any>;
}
export default APIClient;
