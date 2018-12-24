import * as React from 'react';
import { Notice } from '../../Entities/Notice';
declare type Props = {
    notices: Notice[] | null;
    totalElements: number;
    header: string;
    fetchNotices: (page: number, pageSize: number) => any;
    match: any;
    history: any;
    location: any;
};
declare const _default: import("react-redux").ConnectedComponentClass<React.ComponentClass<Pick<Props, "header" | "notices" | "totalElements" | "fetchNotices">, any>, Pick<Pick<Props, "header" | "notices" | "totalElements" | "fetchNotices">, "header">>;
export default _default;
