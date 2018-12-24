import { DictionaryBaseML } from '@vitacore/shared-ui'
import { RcFile } from 'antd/lib/upload/interface'
import React from 'react'
import { DocumentAttachment } from '../../Entities/DocumentAttachment'
import DocumentAttachmentsForm from './DocumentAttachmentsForm'
import DocumentAttachmentsList from './DocumentAttachmentsList'

type Props = {
  docs: DocumentAttachment[]
  onDelete: (doc: DocumentAttachment) => any
  attachmentTypesDict: DictionaryBaseML[]
  docType?: string
  docComment?: string
  file?: RcFile
  onChange: (docType?: string, docComment?: string, file?: RcFile) => any
  onUpload: () => any
  clearCurrentUploadInfo: () => any
}

class DocumentAttachments extends React.Component<Props> {
  public render() {
    const { docs, onDelete, attachmentTypesDict, docType, docComment, file, onChange, onUpload } = this.props
    const existingAttachmentTypeIds = docs.map(i => i.attachmentType!.id)
    const typesDict = attachmentTypesDict.filter(i => existingAttachmentTypeIds.findIndex(k => k === i.id) === -1)

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <DocumentAttachmentsForm
          clearCurrentUploadInfo={this.props.clearCurrentUploadInfo}
          attachmentTypesDict={typesDict}
          docType={docType}
          docComment={docComment}
          file={file}
          onChange={onChange}
          onUpload={onUpload}
        />
        <DocumentAttachmentsList style={{ marginTop: 10 }} docs={docs} onDelete={onDelete} />
      </div>
    )
  }
}

export default DocumentAttachments
