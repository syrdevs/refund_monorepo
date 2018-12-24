/// <reference types="react" />
import { ClickParam } from 'antd/lib/menu';
import { CommandItem } from './CommandItem';
declare type CommandListProps = {
    name: string;
    disabled: boolean;
    handleMenuClick: (param: ClickParam) => any;
    items: CommandItem[];
};
declare const CommandsList: (props: CommandListProps) => JSX.Element;
export default CommandsList;
