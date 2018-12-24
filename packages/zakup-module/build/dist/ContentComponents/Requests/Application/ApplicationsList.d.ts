import React from 'react';
import { Application } from '../../../Entities/Application';
import { ModalInfo } from '../../../Models/ModalInfo';
declare type OwnProps = {
    header: string;
    match: any;
};
declare type DispatchProps = {
    addNewModal: (modalInfo: ModalInfo) => any;
    closeRecentModal: (numberToClose?: number) => any;
};
declare type State = {
    applications: Application[];
    selectedRowKeys: string[];
    currentPage: number;
    itemsPerPage: number;
    totalElements: number;
};
declare type Props = OwnProps & DispatchProps;
declare class ApplicationsList extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
    private onRowSelectionChange;
    private onCommandClick;
    private onDelete;
    private getColumns;
    private onAccept;
    private fetchApplications;
    private onNewRequestClick;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof ApplicationsList, Pick<Props, "header" | "match"> & OwnProps>;
export default _default;
