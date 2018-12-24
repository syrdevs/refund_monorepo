import { Button, Icon, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'
import React from 'react'
import { isTrue } from '../../utils'

type Props = {
  onChange: (fileList: RcFile[]) => any
  multiple: boolean
  fileList?: [RcFile]
  showUploadBtn?: boolean
  onUpload: () => any
  clearCurrentUploadInfo?: () => any
  shouldClearFileListOnUpload?: boolean
  uploadBtnText?: string
}

type State = {
  fileList: RcFile[]
  uploading: boolean
}

class DocumentUpload extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      fileList: this.props.fileList ? [...this.props.fileList] : [],
      uploading: false,
    }
  }

  public render() {
    const { uploading, fileList } = this.state
    const { uploadBtnText } = this.props

    return (
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Upload onRemove={this.onRemove} beforeUpload={this.beforeUpload} fileList={fileList}>
          <Button>
            <Icon type="upload" /> Загрузить
          </Button>
        </Upload>
        {isTrue(this.props.showUploadBtn) && (
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginLeft: 5 }}
          >
            {uploading ? 'Загрузка...' : uploadBtnText || 'Начать загрузку'}
          </Button>
        )}
      </div>
    )
  }

  private onRemove = (file: RcFile) => {
    const index = this.state.fileList.indexOf(file)
    const newFileList = this.state.fileList.slice()
    newFileList.splice(index, 1)

    this.setState({
      fileList: newFileList,
    })

    this.props.onChange(newFileList)
  }

  private beforeUpload = (file: RcFile) => {
    const newFileList = this.props.multiple ? [...this.state.fileList, file] : [file]
    this.setState({
      fileList: newFileList,
    })
    this.props.onChange(newFileList)
    return false
  }

  private handleUpload = () => {
    const { shouldClearFileListOnUpload } = this.props

    this.setState(
      {
        uploading: true,
        fileList: isTrue(shouldClearFileListOnUpload) ? [] : this.state.fileList,
      },
      () => this.props.onUpload()
    )

    setTimeout(() => this.setState({ uploading: false }), 600)
  }
}

export default DocumentUpload
