import { ClickParam } from 'antd/lib/menu';
import React from 'react';
import { CommandItem } from './CommandItem';
declare type Props = {
    entity: string;
    onCommandClick: (commandId: string, isReport: boolean) => any;
    disabledActions: boolean;
    disabledReports: boolean;
};
declare type State = {
    items: CommandItem[];
    fetched: boolean;
};
declare class CommandsBar extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    handleMenuClick: (isReport: boolean) => (param: ClickParam) => void;
    render(): JSX.Element | null;
}
export default CommandsBar;
