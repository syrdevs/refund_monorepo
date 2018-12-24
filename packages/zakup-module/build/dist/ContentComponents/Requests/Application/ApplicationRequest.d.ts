import { DictionaryBaseML } from '@vitacore/shared-ui';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { RcFile } from 'antd/lib/upload/interface';
import * as React from 'react';
import { ActivityPick } from '../../../Entities/Activity';
import { ApplicationItem } from '../../../Entities/Application';
import { DocumentAttachment } from '../../../Entities/DocumentAttachment';
import { ClinicPick } from '../../../Entities/Organization';
import { dictionariesNames } from '../../../Infrastructure/dictionariesList';
import { EntityProps } from './EntityProps';
declare type CompOwnProps = {
    match: any;
};
declare type CompStateProps = {
    regionsDict: DictionaryBaseML[];
    attachmentTypesDict: DictionaryBaseML[];
};
declare type CompDispatchProps = {
    fetchCustomDict: (dictNames: dictionariesNames[]) => any;
};
declare type CompProps = CompOwnProps & CompStateProps & CompDispatchProps;
declare type CompState = {
    fields: EntityProps;
    activities: ActivityPick[];
    valid: boolean;
    applicationItems: ApplicationItem[];
    clinicsDict: ClinicPick[];
    attachments: DocumentAttachment[];
    originalAttachments: DocumentAttachment[];
    docType?: string;
    docComment?: string;
    file?: RcFile;
    fetched: boolean;
};
declare class ApplicationRequest extends React.Component<CompProps, CompState> {
    constructor(props: CompProps);
    render(): JSX.Element;
    componentDidMount(): void;
    handleSubmit: (form: WrappedFormUtils) => (e: any) => void;
    componentWillReceiveProps(nextProps: Readonly<CompProps>): void;
    handleFormChange: (changedFields: any) => void;
    private onCommandClick;
    private getObjectById;
    private onDelete;
    private clearCurrentUploadInfo;
    private onUploadFile;
    private onDocumentAttachmentsChange;
    private onSendToReview;
    private onApplicationItemsChange;
    private handleSelectValueChanged;
    private extractDictionaryValue;
    private convertPropsToEntityDataForState;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof ApplicationRequest, Pick<CompProps, "match"> & CompOwnProps>;
export default _default;
