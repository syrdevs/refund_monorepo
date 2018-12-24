import * as React from 'react';
import { Commission } from '../../Entities/Commission';
import { ModalInfo } from '../../Models/ModalInfo';
import { FETCH_ENTITY_STATUS } from '../../Redux/Constants/businessDataStateConstants';
declare type Props = {
    commission?: Commission;
    fetchSingleCommissionStatus: FETCH_ENTITY_STATUS;
    header: string;
    match: any;
    fetchCommissionById: (id: string) => any;
    addNewModal: (modalInfo: ModalInfo) => any;
    closeRecentModal: (numberToClose?: number) => any;
};
declare class CommissionMembersList extends React.Component<Props> {
    componentDidMount(): void;
    render(): JSX.Element | null;
    private fetchCommission;
    private onDeleteCommissionMember;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof CommissionMembersList, Pick<Props, "header" | "match">>;
export default _default;
