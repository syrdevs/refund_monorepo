import { DictionaryBaseMLWithShortName } from '@vitacore/shared-ui';
import React from 'react';
import { ProtocolActivityGroupInfo } from '../../Entities/Protocol';
import ProtocolItemsByActivity from './ProtocolItemsByActivity';
declare type Props = {
    onProtocolItemValueChange: (activityId: string, clinicId: string, measureUnitId: string, newValue: number) => any;
    groupInfo: ProtocolActivityGroupInfo;
    protocolItemInfo: ProtocolItemsByActivity;
    onGroupPageChanged: (activityId: string, page: number) => any;
    onGroupPageSizeChanged: (activityId: string, pageSize: number) => any;
    measureUnits: DictionaryBaseMLWithShortName[];
    onDataOnPageSave: (activityId: string) => any;
    onDataOnRowSave: (activityId: string, clinicId: string) => any;
};
declare class ProtocolActivitiesTableSubRow extends React.Component<Props> {
    render(): JSX.Element;
    private getColumns;
    private onValueChange;
}
export default ProtocolActivitiesTableSubRow;
