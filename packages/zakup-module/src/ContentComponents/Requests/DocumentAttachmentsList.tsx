import { Icon, Table } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { DocumentAttachment } from '../../Entities/DocumentAttachment'
import { createApiClient } from '../../utils'

const LinkStyle = styled.div`
  color: #1890ff;
  cursor: pointer;
`

type Props = {
  docs: DocumentAttachment[]
  onDelete: (doc: DocumentAttachment) => any
  style?: React.CSSProperties
}

class DocumentAttachmentsList extends React.Component<Props> {
  public render() {
    const styleObj = this.props.style ? { ...this.props.style } : {}

    return (
      <Table
        style={styleObj}
        columns={this.getColumns()}
        dataSource={this.props.docs}
        rowKey={(r: DocumentAttachment) => `${r.attachmentType!.id}`}
        size="middle"
        pagination={false}
      />
    )
  }

  private getColumns = () => {
    return [
      {
        title: 'Тип документа',
        dataIndex: 'attachmentType.nameRu',
        width: '250px',
      },
      {
        title: 'Комментарий',
        dataIndex: 'fileDescription',
      },
      {
        title: 'Имя файла',
        dataIndex: 'name',
        width: '160px',
        render: (data: any, originalRow: DocumentAttachment) => {
          return (
            <LinkStyle
              onClick={() => {
                if (originalRow.id) {
                  createApiClient().downloadFile(originalRow.id!)
                }
              }}
            >
              {data}
            </LinkStyle>
          )
        },
      },
      {
        title: 'Действия',
        dataIndex: 'id',
        width: '100px',
        render: (data: any, originalRow: DocumentAttachment) => {
          return (
            <Icon
              type="delete"
              style={{ color: '#1890ff', cursor: 'pointer' }}
              onClick={() => {
                this.props.onDelete({ ...originalRow })
              }}
            />
          )
        },
      },
    ]
  }
}

export default DocumentAttachmentsList
