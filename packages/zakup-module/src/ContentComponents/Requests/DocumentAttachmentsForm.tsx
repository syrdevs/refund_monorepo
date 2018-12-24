import { DictionaryBaseML } from '@vitacore/shared-ui'
import { Col, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { RcFile } from 'antd/lib/upload/interface'
import React, { ChangeEvent } from 'react'
import { CommonFormItemLayout, LabelColStyled, RowStyled } from '../shared'
import DocumentUpload from '../shared/DocumentUpload'
const Option = Select.Option

type Props = {
  attachmentTypesDict: DictionaryBaseML[]
  docType?: string
  docComment?: string
  file?: RcFile
  onChange: (docType?: string, docComment?: string, file?: RcFile) => any
  onUpload: () => any
  clearCurrentUploadInfo: () => any
}

class DocumentAttachmentsForm extends React.Component<Props> {
  public render() {
    const { onChange } = this.props

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', width: '80%' }}>
        <RowStyled>
          <LabelColStyled {...CommonFormItemLayout.labelCol}>Документ</LabelColStyled>
          <Col {...CommonFormItemLayout.wrapperCol}>
            <Select
              style={{ display: 'block' }}
              value={this.props.docType || ''}
              onChange={(docType: string) => onChange(docType, this.props.docComment, this.props.file)}
            >
              {this.props.attachmentTypesDict.map(i => (
                <Option key={i.id}>{i.nameRu}</Option>
              ))}
            </Select>
          </Col>
        </RowStyled>
        <RowStyled>
          <LabelColStyled {...CommonFormItemLayout.labelCol}>Комментарий</LabelColStyled>
          <Col {...CommonFormItemLayout.wrapperCol}>
            <TextArea
              value={this.props.docComment}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                onChange(this.props.docType, event.target.value, this.props.file)
              }
            />
          </Col>
        </RowStyled>
        <RowStyled>
          <LabelColStyled {...CommonFormItemLayout.labelCol}>Файл</LabelColStyled>
          <Col {...CommonFormItemLayout.wrapperCol}>
            <DocumentUpload
              multiple={false}
              shouldClearFileListOnUpload={true}
              showUploadBtn={true}
              onUpload={this.onUpload}
              uploadBtnText="Добавить"
              fileList={this.props.file ? [this.props.file] : undefined}
              onChange={(fileList: RcFile[]) =>
                onChange(this.props.docType, this.props.docComment, fileList.length > 0 ? fileList[0] : undefined)
              }
            />
          </Col>
        </RowStyled>
      </div>
    )
  }

  private onUpload = () => {
    this.props.onUpload()
    this.props.clearCurrentUploadInfo()
  }
}

export default DocumentAttachmentsForm
