import { ProtocolItem } from '../../Entities/Protocol';
declare type ProtocolItemsByActivity = {
    activityId: string;
    protocolItemsInfo: {
        page: number;
        pageSize: number;
        totalElements: number;
        items: ProtocolItem[];
    };
};
export default ProtocolItemsByActivity;
