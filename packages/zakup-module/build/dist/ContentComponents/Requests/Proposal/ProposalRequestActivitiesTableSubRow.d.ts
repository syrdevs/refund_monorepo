import React from 'react';
import { ProposalItem } from '../../../Entities/Proposal';
declare type Props = {
    onProposalItemValueChange: (activityId: string, measureUnitId: string, newValue: number) => any;
    proposalItem: ProposalItem;
};
declare class ProposalRequestActivitiesTableSubRow extends React.Component<Props> {
    render(): JSX.Element;
    private getColumns;
    private onValueChange;
}
export default ProposalRequestActivitiesTableSubRow;
