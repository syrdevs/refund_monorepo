import * as React from 'react';
import { NoticeApplicantDoc } from '../../../Entities/NoticeApplicant';
import { ModalInfo } from '../../../Models/ModalInfo';
declare type OwnProps = {
    header: string;
};
declare type RouterProps = {
    match: any;
    history: any;
    location: any;
};
declare type StateProps = {
    adApplicantDocs: NoticeApplicantDoc[];
};
declare type DispatchProps = {
    fetchAdApplicants: (id: number) => any;
    addNewModal: (modalInfo: ModalInfo) => any;
    closeRecentModal: (numberToClose?: number) => any;
};
declare type Props = OwnProps & RouterProps & StateProps & DispatchProps;
declare const _default: React.ComponentClass<Pick<Pick<Props, "header" | "location" | "history" | "match"> & OwnProps & RouterProps, "header">, any>;
export default _default;
