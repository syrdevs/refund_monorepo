import React from 'react';
import { ActivityPick } from '../../../Entities/Activity';
import { ApplicationItem } from '../../../Entities/Application';
declare type Props = {
    allActivities: ActivityPick[];
    applicationItems: ApplicationItem[];
    onApplicationItemsChange: (appItems: ApplicationItem[]) => any;
};
declare type State = {
    savedApplicationItemState?: ApplicationItem;
    idInChange?: number;
    isNew: boolean;
};
declare class ApplicationRequestActivitiesTable extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
    private onAdd;
    private onAcceptNew;
    private onCancel;
    private setEditing;
    private onDelete;
    private getColumns;
}
export default ApplicationRequestActivitiesTable;
