import React from 'react';
import { ProposalForList } from '../../../Entities/Proposal';
import { ModalInfo } from '../../../Models/ModalInfo';
declare type DispatchProps = {
    addNewModal: (modalInfo: ModalInfo) => any;
    closeRecentModal: (numberToClose?: number) => any;
};
declare type OwnProps = {
    header: string;
    page: string;
    noticeId?: string;
};
declare type State = {
    proposals: ProposalForList[];
    selectedRowKeys: string[];
    currentPage: number;
    itemsPerPage: number;
    totalElements: number;
};
declare type Props = OwnProps & DispatchProps;
declare class ProposalsList extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
    private onRowSelectionChange;
    private onCommandClick;
    private getColumns;
    private fetchProposals;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof ProposalsList, Pick<Props, "header" | "page" | "noticeId"> & OwnProps>;
export default _default;
