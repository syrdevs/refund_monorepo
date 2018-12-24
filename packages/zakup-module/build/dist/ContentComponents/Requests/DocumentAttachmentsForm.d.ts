import { DictionaryBaseML } from '@vitacore/shared-ui';
import { RcFile } from 'antd/lib/upload/interface';
import React from 'react';
declare type Props = {
    attachmentTypesDict: DictionaryBaseML[];
    docType?: string;
    docComment?: string;
    file?: RcFile;
    onChange: (docType?: string, docComment?: string, file?: RcFile) => any;
    onUpload: () => any;
    clearCurrentUploadInfo: () => any;
};
declare class DocumentAttachmentsForm extends React.Component<Props> {
    render(): JSX.Element;
    private onUpload;
}
export default DocumentAttachmentsForm;
