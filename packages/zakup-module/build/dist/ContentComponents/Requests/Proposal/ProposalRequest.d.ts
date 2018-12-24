import { DictionaryBaseML } from '@vitacore/shared-ui';
import { RcFile } from 'antd/lib/upload/interface';
import * as React from 'react';
import { Activity } from '../../../Entities/Activity';
import { DocumentAttachment } from '../../../Entities/DocumentAttachment';
import { ClinicPick } from '../../../Entities/Organization';
import { PeriodYearPick } from '../../../Entities/PeriodYear';
import { ProposalItem } from '../../../Entities/Proposal';
import { dictionariesNames } from '../../../Infrastructure/dictionariesList';
import { EntityProps } from './EntityProps';
declare type CompOwnProps = {
    id: string;
};
declare type CompStateProps = {
    regionsDict: DictionaryBaseML[];
    proposalTypesDict: DictionaryBaseML[];
    attachmentTypesDict: DictionaryBaseML[];
};
declare type CompDispatchProps = {
    fetchCustomDict: (dictNames: dictionariesNames[]) => any;
};
declare type CompProps = CompOwnProps & CompStateProps & CompDispatchProps;
declare type CompState = {
    fields: EntityProps;
    noticeId?: string;
    regionId?: string;
    periodYearId?: string;
    activities: Activity[];
    periodYearsDict: PeriodYearPick[];
    clinicsDict: ClinicPick[];
    valid: boolean;
    proposalItems: ProposalItem[];
    attachments: DocumentAttachment[];
    originalAttachments: DocumentAttachment[];
    docType?: string;
    docComment?: string;
    file?: RcFile;
    fetched: boolean;
    notice?: {
        name: string;
    };
};
declare class ProposalRequest extends React.Component<CompProps, CompState> {
    constructor(props: CompProps);
    componentDidMount(): void;
    render(): JSX.Element;
    componentWillReceiveProps(nextProps: Readonly<CompProps>): void;
    private onCommandClick;
    private getObjectById;
    private onDelete;
    private clearCurrentUploadInfo;
    private onUploadFile;
    private onDocumentAttachmentsChange;
    private onSendToReview;
    private onProposalItemValueChange;
    private handleSubmit;
    private handleFormChange;
    private handleSelectValueChanged;
    private extractDictionaryValue;
    private convertPropsToEntityDataForState;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof ProposalRequest, Pick<CompProps, "id"> & CompOwnProps>;
export default _default;
