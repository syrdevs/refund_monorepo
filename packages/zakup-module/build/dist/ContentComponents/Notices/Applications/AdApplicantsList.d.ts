import * as React from 'react';
import { NoticeApplicant } from '../../../Entities/NoticeApplicant';
declare type Props = {
    adApplicants: NoticeApplicant[] | null;
    header: string;
    fetchAdApplicants: (id: number) => any;
    match: any;
    history: any;
    location: any;
};
declare const _default: import("react-redux").ConnectedComponentClass<React.ComponentClass<Pick<Props, "header" | "fetchAdApplicants" | "adApplicants">, any>, Pick<Pick<Props, "header" | "fetchAdApplicants" | "adApplicants">, "header">>;
export default _default;
