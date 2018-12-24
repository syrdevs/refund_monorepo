export interface LeftMenuRootNode {
    name: string;
    hrefPrefix?: string;
    subItems: LeftMenuRoutableItem[];
    iconName: string;
    translationKey: string;
}
export interface LeftMenuRoutableItem {
    name: string;
    href: string;
    translationKey: string;
}
