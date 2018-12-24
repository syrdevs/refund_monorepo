import React from 'react';
import { DocumentAttachment } from '../../Entities/DocumentAttachment';
declare type Props = {
    docs: DocumentAttachment[];
    onDelete: (doc: DocumentAttachment) => any;
    style?: React.CSSProperties;
};
declare class DocumentAttachmentsList extends React.Component<Props> {
    render(): JSX.Element;
    private getColumns;
}
export default DocumentAttachmentsList;
