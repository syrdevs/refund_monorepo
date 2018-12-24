/// <reference types="react" />
import { ClickParam } from 'antd/lib/menu';
import { CommandItem } from './CommandItem';
declare type CommandMenuProps = {
    handleMenuClick: (param: ClickParam) => any;
    items: CommandItem[];
    disabled: boolean;
};
export declare const CommandMenu: (props: CommandMenuProps) => JSX.Element;
export {};
