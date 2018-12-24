import { DictionaryBaseML, DictionaryBaseMLWithShortName } from '@vitacore/shared-ui';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Moment } from 'moment';
import * as React from 'react';
import { Commission } from '../../Entities/Commission';
import { Person } from '../../Entities/CommissionMember';
import { FETCH_ENTITY_STATUS } from '../../Redux/Constants/businessDataStateConstants';
declare type EntityProps = {
    id: {
        value?: string;
    };
    firstName: {
        value?: string;
    };
    lastName: {
        value?: string;
    };
    patronymic: {
        value?: string;
    };
    iin: {
        value?: string;
    };
    birthdate: {
        value?: Date;
    };
    workPlace: {
        value?: string;
    };
    dateBegin: {
        value?: Date;
    };
    dateEnd?: {
        value?: Date;
    };
    meetingMemberRole: {
        value?: DictionaryBaseML;
    };
};
declare type CompState = {
    fields: EntityProps;
    valid: boolean;
    lastIINSearched?: string;
};
declare type CompOwnProps = {
    match: any;
};
declare type CompDispatchProps = {
    fetchSingleCommission: (id: string) => any;
    findPersonByIIN: (iin: string) => any;
};
declare type InitialValuesProps = {
    id?: string;
    firstName: string;
    lastName: string;
    patronymic?: string;
    iin?: string;
    birthdate: Moment;
    sex: DictionaryBaseMLWithShortName;
    workPlace?: string;
    dateBegin: Moment;
    dateEnd?: Moment;
    meetingMemberRole: DictionaryBaseML;
};
declare type StateProps = {
    initialValues?: InitialValuesProps;
    personFound: Person | null;
    currentCommission: Commission | null;
    fetchSingleCommissionStatus: FETCH_ENTITY_STATUS;
    dictsFetching: boolean;
    meetingMemberRolesDict: DictionaryBaseML[];
};
declare type CompProps = CompOwnProps & StateProps & CompDispatchProps;
declare class CommissionMemberForm extends React.Component<CompProps, CompState> {
    constructor(props: CompProps);
    handleSubmit: (form: WrappedFormUtils) => (e: any) => void;
    componentWillReceiveProps(newProps: CompProps): void;
    componentDidMount(): void;
    handleFormChange: (changedFields: any) => void;
    render(): JSX.Element | null;
    private handleSelectValueChanged;
    private findPersonByIIN;
    private extractDictionaryValue;
    private convertPropsToEntityDataForState;
    private fetchEntity;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof CommissionMemberForm, Pick<CompProps, "match"> & CompOwnProps>;
export default _default;
