/// <reference types="react" />
import { LeftMenuRootNode } from '../Models/LeftMenu';
import MultilanguageComponent from './MultilanguageComponent';
declare type PropsType = {
    leftMenuItems: LeftMenuRootNode[];
    location: string;
    goToLink: (href: string) => any;
};
declare type StateType = {
    expandedRootNodes: string[];
    currentlyExpandedRootNodes: string[];
    selectedKeys: string[];
    collapsed: boolean;
    location: string;
};
export declare class LeftMenu extends MultilanguageComponent<PropsType, StateType> {
    static getDerivedStateFromProps(nextProps: PropsType, prevState: StateType): Partial<StateType> | null;
    private static hrefItems;
    private static getHrefForSubItemNode;
    private static getHrefsOfItems;
    private static extractExpandedRootNode;
    private static extractSelectedNode;
    constructor(props: PropsType);
    render(): JSX.Element;
    private onCollapse;
    private handleMenuOnClick;
    private goToLink;
    private renderRootNode;
    private toggleNode;
    private onSelect;
    private renderLeftMenuItems;
}
export {};
