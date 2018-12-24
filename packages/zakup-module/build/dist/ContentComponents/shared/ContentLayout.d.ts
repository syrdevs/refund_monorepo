import * as React from 'react';
import { ButtonData } from '../../Vitacore/Controls/Button';
import { BreadcrumbRoute } from './Breadcrumbs';
declare type Props = {
    contentName: string;
    buttons?: ButtonData[];
    breadcrumbRoutes?: BreadcrumbRoute[];
    entity?: string;
    showCommands?: boolean;
    disableCommands?: boolean;
    onCommandClick?: (commandId: string, isReport: boolean) => any;
};
declare class ContentLayout extends React.Component<Props> {
    render(): JSX.Element;
}
export default ContentLayout;
