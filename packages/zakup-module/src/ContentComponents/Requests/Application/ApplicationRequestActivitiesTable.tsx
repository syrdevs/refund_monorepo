import { Button, Icon, Select, Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import React from 'react'
import { ActivityPick } from '../../../Entities/Activity'
import { ApplicationItem } from '../../../Entities/Application'
const Option = Select.Option

type Props = {
  allActivities: ActivityPick[]
  applicationItems: ApplicationItem[]
  onApplicationItemsChange: (appItems: ApplicationItem[]) => any
}

type State = {
  savedApplicationItemState?: ApplicationItem
  idInChange?: number
  isNew: boolean
}

class ApplicationRequestActivitiesTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      savedApplicationItemState: undefined,
      idInChange: undefined,
      isNew: false,
    }
  }

  public render() {
    const isInChangeState = typeof this.state.idInChange !== 'undefined'

    return (
      <div>
        <Table
          columns={this.getColumns()}
          rowKey={r => r.activity.id!.toString()}
          dataSource={this.props.applicationItems}
          pagination={false}
          footer={() => (
            <Button htmlType="button" type="primary" onClick={this.onAdd} disabled={isInChangeState}>
              Добавить
            </Button>
          )}
        />
      </div>
    )
  }

  private onAdd = () => {
    const activitiesAvailableToAdd = this.props.allActivities.filter(i =>
      this.props.applicationItems.every(x => x.activity.id !== i.id)
    )

    if (activitiesAvailableToAdd.length === 0) {
      return
    }

    this.setState({
      idInChange: this.props.applicationItems.length,
      isNew: true,
    })

    this.props.onApplicationItemsChange([
      ...this.props.applicationItems,
      { activity: { ...activitiesAvailableToAdd[0] } },
    ])
  }

  private onAcceptNew = () => {
    this.setState({
      savedApplicationItemState: undefined,
      idInChange: undefined,
      isNew: false,
    })
  }

  private onCancel = () => {
    let newApplicationItems = this.props.applicationItems
    if (this.state.isNew) {
      newApplicationItems = newApplicationItems.slice(0, newApplicationItems.length - 1)
    } else {
      newApplicationItems[this.state.idInChange!] = {
        ...this.state.savedApplicationItemState!,
      }
    }

    this.setState({
      savedApplicationItemState: undefined,
      idInChange: undefined,
      isNew: false,
    })

    this.props.onApplicationItemsChange(newApplicationItems)
  }

  private setEditing = (idx: number, original: ApplicationItem) => {
    this.setState({
      savedApplicationItemState: {
        ...original,
      },
      idInChange: idx,
      isNew: false,
    })
  }

  private onDelete = (id: string) => {
    this.setState({
      isNew: false,
    })

    this.props.onApplicationItemsChange(this.props.applicationItems.filter(i => i.activity.id !== id))
  }

  private getColumns = () => {
    const { idInChange } = this.state

    const activitiesAvailableToAdd = this.props.allActivities.filter(
      i =>
        this.props.applicationItems.every(x => x.activity.id !== i.id) ||
        (typeof idInChange !== 'undefined' && this.props.applicationItems[idInChange].activity.id === i.id)
    )

    return [
      {
        title: 'Вид деятельности',
        dataIndex: 'activity.name',
        render: (data: string, originalRow: ApplicationItem, index: number) => {
          if (index !== idInChange) {
            return data
          }

          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select
                value={this.props.applicationItems[idInChange].activity.id}
                onChange={(val: string) => {
                  const newApplicationItems = [...this.props.applicationItems]
                  const newActivity = this.props.allActivities.find(i => i.id === val)
                  newApplicationItems[this.state.idInChange!] = {
                    ...newApplicationItems[this.state.idInChange!],
                    activity: {
                      id: newActivity!.id,
                      name: newActivity!.name,
                    },
                  }

                  this.props.onApplicationItemsChange(newApplicationItems)
                }}
              >
                {activitiesAvailableToAdd.map(option => {
                  return <Option key={option.id}>{option.name}</Option>
                })}
              </Select>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                <Icon style={{ color: '#1890ff', cursor: 'pointer' }} type="check" onClick={this.onAcceptNew} />
                <Icon
                  style={{ color: '#1890ff', cursor: 'pointer', marginLeft: '5px' }}
                  type="close"
                  onClick={this.onCancel}
                />
              </div>
            </div>
          )
        },
      },
      {
        title: '',
        width: '60px',
        dataIndex: 'id',
        align: 'center',
        render: (id: string, originalRow: ApplicationItem, index: number) => {
          if (typeof idInChange !== 'undefined') {
            return null
          }

          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon
                style={{ color: '#1890ff', cursor: 'pointer' }}
                type="edit"
                onClick={() => this.setEditing(index, originalRow)}
              />
              <Icon
                style={{ color: '#1890ff', marginLeft: '5px', cursor: 'pointer' }}
                type="delete"
                onClick={() => this.onDelete(originalRow.activity.id!)}
              />
            </div>
          )
        },
      },
    ] as Array<ColumnProps<ApplicationItem>>
  }
}

export default ApplicationRequestActivitiesTable
