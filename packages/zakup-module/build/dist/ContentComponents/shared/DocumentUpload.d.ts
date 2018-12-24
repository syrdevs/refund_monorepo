import { RcFile } from 'antd/lib/upload/interface';
import React from 'react';
declare type Props = {
    onChange: (fileList: RcFile[]) => any;
    multiple: boolean;
    fileList?: [RcFile];
    showUploadBtn?: boolean;
    onUpload: () => any;
    clearCurrentUploadInfo?: () => any;
    shouldClearFileListOnUpload?: boolean;
    uploadBtnText?: string;
};
declare type State = {
    fileList: RcFile[];
    uploading: boolean;
};
declare class DocumentUpload extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
    private onRemove;
    private beforeUpload;
    private handleUpload;
}
export default DocumentUpload;
