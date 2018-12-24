import React from 'react';
import { Activity } from '../../../Entities/Activity';
import { ProposalItem, ProposalItemValue } from '../../../Entities/Proposal';
declare type Props = {
    allActivities: Activity[];
    proposalItems: ProposalItem[];
    onProposalItemValueChange: (proposalItems: ProposalItem[]) => any;
};
declare type State = {
    expandedRowKeys: string[];
    savedProposalItemActivityState?: Activity;
    savedProposalItemValuesState?: ProposalItemValue[];
    idInChange?: number;
    isNew: boolean;
};
declare class ProposalRequestActivitiesTable extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
    private handleExpandedRowsChange;
    private onProposalItemValueChange;
    private onAdd;
    private onAcceptNew;
    private onCancel;
    private setEditing;
    private onDelete;
    private getColumns;
}
export default ProposalRequestActivitiesTable;
