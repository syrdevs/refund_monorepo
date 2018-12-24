import { DictionaryBaseML } from '@vitacore/shared-ui';
import { RcFile } from 'antd/lib/upload/interface';
import React from 'react';
import { DocumentAttachment } from '../../Entities/DocumentAttachment';
declare type Props = {
    docs: DocumentAttachment[];
    onDelete: (doc: DocumentAttachment) => any;
    attachmentTypesDict: DictionaryBaseML[];
    docType?: string;
    docComment?: string;
    file?: RcFile;
    onChange: (docType?: string, docComment?: string, file?: RcFile) => any;
    onUpload: () => any;
    clearCurrentUploadInfo: () => any;
};
declare class DocumentAttachments extends React.Component<Props> {
    render(): JSX.Element;
}
export default DocumentAttachments;
