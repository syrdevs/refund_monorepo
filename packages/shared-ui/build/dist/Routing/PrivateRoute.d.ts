import * as React from 'react';
export declare type PrivateRouteProps = {
    component?: React.ComponentClass;
    render?: (props: any) => React.ReactNode;
    simpleAuthCheck?: () => boolean;
    promiseAuthCheck?: () => Promise<boolean>;
    loginPath?: string;
    [key: string]: any;
};
export declare const PrivateRoute: React.FunctionComponent<PrivateRouteProps>;
