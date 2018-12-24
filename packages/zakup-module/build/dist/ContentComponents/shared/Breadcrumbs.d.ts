import * as React from 'react';
export interface BreadcrumbRoute {
    path: string;
    breadcrumbName: string;
}
declare type Props = {
    routes: BreadcrumbRoute[];
};
declare const Breadcrumbs: React.FunctionComponent<Props>;
export default Breadcrumbs;
