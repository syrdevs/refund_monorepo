import { DictionaryBaseMLWithShortName } from '@vitacore/shared-ui';
import React from 'react';
import { ProtocolActivityGroupInfo } from '../../Entities/Protocol';
import { dictionariesNames } from '../../Infrastructure/dictionariesList';
import { ModalInfo } from '../../Models/ModalInfo';
import ProtocolItemsByActivity from './ProtocolItemsByActivity';
declare type StateProps = {
    measureUnitsDict: DictionaryBaseMLWithShortName[];
};
declare type DispatchProps = {
    fetchCustomDict: (dictNames: dictionariesNames[]) => any;
    addNewModal: (modalInfo: ModalInfo) => any;
    closeRecentModal: (numberToClose?: number) => any;
};
declare type OwnProps = {
    planProtocolId: string;
};
declare type CompState = {
    expandedRowKeys: string[];
    protocolActivityGroupInfos: ProtocolActivityGroupInfo[];
    protocolItemsByActivity: ProtocolItemsByActivity[];
    fetched: boolean;
};
declare type Props = OwnProps & StateProps & DispatchProps;
declare class ProtocolActivitiesTable extends React.Component<Props, CompState> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element | null;
    private fetchProtocolActivityGroupInfos;
    private fetchProtocolActivityMeasureUnits;
    private handleExpandedRowsChange;
    private onProtocolItemValueChange;
    private onGroupExpanding;
    private setInitialCellValues;
    private checkForLosingChangedCellValues;
    private fetchProtocolItems;
    private saveDataRow;
    private saveDataPage;
    private preparePlanProtocolItemForSave;
    private onDataOnPageSave;
    private onDataOnRowSave;
    private onGroupPageChanged;
    private doPostAction;
    private onGroupPageSizeChanged;
    private getColumns;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof ProtocolActivitiesTable, Pick<Props, "planProtocolId"> & OwnProps>;
export default _default;
