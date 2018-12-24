import { DictionaryBaseML } from '@vitacore/shared-ui';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Moment } from 'moment';
import * as React from 'react';
import { PeriodYearPick } from '../../Entities/PeriodYear';
import { FETCH_ENTITY_STATUS } from '../../Redux/Constants/businessDataStateConstants';
declare type EntityProps = {
    id: {
        value?: string;
    };
    name: {
        value?: DictionaryBaseML;
    };
    region: {
        value?: DictionaryBaseML;
    };
    periodYear: {
        value?: PeriodYearPick;
    };
    dateBegin: {
        value?: Date;
    };
    dateEnd: {
        value?: Date;
    };
    noticeMedicalTypes: {
        value: Array<{
            id?: string;
            medicalType: DictionaryBaseML;
        }>;
    };
    noticeMedicalForms: {
        value: Array<{
            id?: string;
            medicalForm: DictionaryBaseML;
        }>;
    };
    numberOfApplications: {
        value?: number;
    };
    status: {
        value?: string;
    };
};
declare type CompState = {
    fields: EntityProps;
    periodYearsDict: PeriodYearPick[];
    valid: boolean;
};
declare type CompOwnProps = {
    match: any;
};
declare type CompDispatchProps = {
    fetchSingleNotice: (id: string) => any;
    setNewAd: () => any;
};
declare type StateProps = {
    initialValues?: {
        id?: string;
        name?: DictionaryBaseML;
        region?: DictionaryBaseML;
        dateBegin?: Moment;
        dateEnd?: Moment;
        noticeMedicalTypes?: Array<{
            id?: string;
            medicalType: DictionaryBaseML;
        }>;
        noticeMedicalForms?: Array<{
            id?: string;
            medicalForm: DictionaryBaseML;
        }>;
    };
    fetchSingleNoticeStatus: FETCH_ENTITY_STATUS;
    dictsFetching: boolean;
    noticeMedicalTypesDict: DictionaryBaseML[];
    noticeMedicalFormsDict: DictionaryBaseML[];
    namesDict: DictionaryBaseML[];
    regionsDict: DictionaryBaseML[];
};
declare type CompProps = CompOwnProps & StateProps & CompDispatchProps;
declare class NoticeForm extends React.Component<CompProps, CompState> {
    constructor(props: CompProps);
    handleSubmit: (form: WrappedFormUtils) => (e: any) => void;
    componentWillReceiveProps(newProps: CompProps): void;
    componentDidMount(): void;
    handleFormChange: (changedFields: any) => void;
    render(): JSX.Element | null;
    private onCommandClick;
    private createProtocol;
    private handleSelectValueChanged;
    private extractDictionaryValue;
    private convertPropsToEntityDataForState;
    private fetchEntity;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof NoticeForm, Pick<CompProps, "match">>;
export default _default;
