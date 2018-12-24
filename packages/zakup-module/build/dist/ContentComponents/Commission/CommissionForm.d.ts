import { DictionaryBaseML } from '@vitacore/shared-ui';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Moment } from 'moment';
import * as React from 'react';
import { CommissionMember } from '../../Entities/CommissionMember';
import { FETCH_ENTITY_STATUS } from '../../Redux/Constants/businessDataStateConstants';
declare type EntityProps = {
    id: {
        value?: string;
    };
    region: {
        value?: DictionaryBaseML;
    };
    dateBegin: {
        value?: Date;
    };
};
declare type CompState = {
    fields: EntityProps;
    valid: boolean;
};
declare type CompOwnProps = {
    match: any;
};
declare type CompDispatchProps = {
    fetchSingleCommission: (id: string) => any;
    setNewCommission: () => any;
};
declare type StateProps = {
    initialValues?: {
        id?: string;
        region?: DictionaryBaseML;
        dateBegin?: Moment;
        meetingMembers: CommissionMember[];
    };
    fetchSingleCommissionStatus: FETCH_ENTITY_STATUS;
    dictsFetching: boolean;
    regionsDict: DictionaryBaseML[];
};
declare type CompProps = CompOwnProps & StateProps & CompDispatchProps;
declare class CommissionForm extends React.Component<CompProps, CompState> {
    constructor(props: CompProps);
    handleSubmit: (form: WrappedFormUtils) => (e: any) => void;
    componentWillReceiveProps(newProps: CompProps): void;
    componentDidMount(): void;
    handleFormChange: (changedFields: any) => void;
    render(): JSX.Element | null;
    private handleSelectValueChanged;
    private extractDictionaryValue;
    private convertPropsToEntityDataForState;
    private fetchEntity;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof CommissionForm, Pick<CompProps, "match">>;
export default _default;
