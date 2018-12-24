import { DictionaryBaseML } from '@vitacore/shared-ui';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import * as React from 'react';
import { ClinicPick } from '../../../Entities/Organization';
import { EntityProps } from './EntityProps';
declare type OwnProps = {
    onChange: any;
    valid: boolean;
    isNew: boolean;
    hasItems: boolean;
    handleSubmit: (form: WrappedFormUtils) => any;
    clinicsDict: ClinicPick[];
    regionsDict: DictionaryBaseML[];
    onSendToReview: () => any;
};
declare const ApplicationRequestInternalForm: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<FormComponentProps & OwnProps & EntityProps, "number" | "id" | "role" | "onChange" | "region" | "regionsDict" | "valid" | "descr" | "documentDate" | "clinic" | "clinicsDict" | "isNew" | "handleSubmit" | "hasItems" | "onSendToReview">, any>;
export default ApplicationRequestInternalForm;
