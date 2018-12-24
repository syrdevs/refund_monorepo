import { Button, Icon, Select, Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import React from 'react'
import { Activity } from '../../../Entities/Activity'
import { ProposalItem, ProposalItemValue } from '../../../Entities/Proposal'
import ProposalRequestActivitiesTableSubRow from './ProposalRequestActivitiesTableSubRow'
const Option = Select.Option

type Props = {
  allActivities: Activity[]
  proposalItems: ProposalItem[]
  onProposalItemValueChange: (proposalItems: ProposalItem[]) => any
}

type State = {
  expandedRowKeys: string[]
  savedProposalItemActivityState?: Activity
  savedProposalItemValuesState?: ProposalItemValue[]
  idInChange?: number
  isNew: boolean
}

class ProposalRequestActivitiesTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      expandedRowKeys: [],
      savedProposalItemActivityState: undefined,
      savedProposalItemValuesState: undefined,
      idInChange: undefined,
      isNew: false,
    }
  }

  public render() {
    const isInChangeState = typeof this.state.idInChange !== 'undefined'

    const expandedObj = {}
    if (this.props.proposalItems.length) {
      expandedObj['expandedRowRender'] = (r: ProposalItem) => {
        return (
          <ProposalRequestActivitiesTableSubRow
            onProposalItemValueChange={this.onProposalItemValueChange}
            proposalItem={r}
          />
        )
      }
    }

    return (
      <div>
        <Table
          size="small"
          indentSize={4}
          showHeader={false}
          title={() => 'Виды деятельности'}
          columns={this.getColumns()}
          rowKey={r => r.activity.id!.toString()}
          dataSource={this.props.proposalItems}
          pagination={false}
          {...expandedObj}
          onExpandedRowsChange={this.handleExpandedRowsChange}
          footer={() => (
            <Button htmlType="button" type="primary" onClick={this.onAdd} disabled={isInChangeState}>
              Добавить
            </Button>
          )}
        />
      </div>
    )
  }

  private handleExpandedRowsChange = (rowKeys: string[]) => {
    this.setState({
      expandedRowKeys: rowKeys,
    })
  }

  private onProposalItemValueChange = (activityId: string, measureUnitId: string, newValue: number) => {
    const originalProposalItem = this.props.proposalItems.find(i => i.activity.id === activityId) as ProposalItem
    const proposalItemIdx = this.props.proposalItems.indexOf(originalProposalItem)
    const originalItemValue = originalProposalItem.proposalItemValues.find(
      i => i.measureUnit.id === measureUnitId
    ) as ProposalItemValue
    const proposalItemValueIdx = originalProposalItem.proposalItemValues.indexOf(originalItemValue)
    const updatedProposalItemValues = [...originalProposalItem.proposalItemValues]
    updatedProposalItemValues[proposalItemValueIdx] = {
      ...updatedProposalItemValues[proposalItemValueIdx],
      value: newValue,
    }

    const updatedProposalItems = [...this.props.proposalItems]
    updatedProposalItems[proposalItemIdx] = {
      ...updatedProposalItems[proposalItemIdx],
      proposalItemValues: updatedProposalItemValues,
    }

    this.props.onProposalItemValueChange(updatedProposalItems)
  }

  private onAdd = () => {
    const activitiesAvailableToAdd = this.props.allActivities.filter(i =>
      this.props.proposalItems.every(x => x.activity.id !== i.id)
    )

    if (activitiesAvailableToAdd.length === 0) {
      return
    }

    const newProposalItem = {
      activity: { ...activitiesAvailableToAdd[0] },
      proposalItemValues: activitiesAvailableToAdd[0].activityMeasureUnits.map(m => ({
        measureUnit: m,
        value: 0,
      })),
    }
    this.setState({
      idInChange: this.props.proposalItems.length,
      isNew: true,
    })

    this.props.onProposalItemValueChange([...this.props.proposalItems, newProposalItem])
  }

  private onAcceptNew = () => {
    this.setState({
      savedProposalItemActivityState: undefined,
      savedProposalItemValuesState: undefined,
      idInChange: undefined,
      isNew: false,
    })
  }

  private onCancel = () => {
    let newProposalItems = this.props.proposalItems
    if (this.state.isNew) {
      newProposalItems = newProposalItems.slice(0, newProposalItems.length - 1)
    } else {
      newProposalItems[this.state.idInChange!] = {
        ...newProposalItems[this.state.idInChange!],
        activity: {
          ...this.state.savedProposalItemActivityState!,
        },
        proposalItemValues: [...this.state.savedProposalItemValuesState],
      }
    }

    this.setState({
      idInChange: undefined,
      isNew: false,
    })

    this.props.onProposalItemValueChange(newProposalItems)
  }

  private setEditing = (idx: number, originalActivity: Activity, itemValues: ProposalItemValue[]) => {
    this.setState({
      savedProposalItemActivityState: originalActivity,
      savedProposalItemValuesState: [...itemValues].map(i => ({ ...i })),
      idInChange: idx,
      isNew: false,
    })
  }

  private onDelete = (id: string) => {
    this.setState({
      isNew: false,
    })

    this.props.onProposalItemValueChange(this.props.proposalItems.filter(i => i.activity.id !== id))
  }

  private getColumns = () => {
    const { idInChange, expandedRowKeys } = this.state

    const activitiesAvailableToAdd = this.props.allActivities.filter(
      i =>
        this.props.proposalItems.every(x => x.activity.id !== i.id) ||
        (typeof idInChange !== 'undefined' && this.props.proposalItems[idInChange].activity.id === i.id)
    )

    return [
      {
        title: 'Вид деятельности',
        dataIndex: 'activity.name',
        render: (data: string, originalRow: ProposalItem, index: number) => {
          if (index !== idInChange) {
            return data
          }

          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select
                value={this.props.proposalItems[idInChange].activity.id}
                onChange={(val: string) => {
                  const newProposalItems = [...this.props.proposalItems]
                  const newActivity = this.props.allActivities.find(i => i.id === val)
                  newProposalItems[this.state.idInChange!] = {
                    ...newProposalItems[this.state.idInChange!],
                    activity: {
                      ...(newActivity as Activity),
                    },
                    proposalItemValues: (newActivity as Activity).activityMeasureUnits.map(m => ({
                      measureUnit: m,
                      value: 0,
                    })),
                  }

                  this.props.onProposalItemValueChange(newProposalItems)
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
        render: (id: string, originalRow: ProposalItem, index: number) => {
          if (typeof idInChange !== 'undefined') {
            return null
          }

          const isExpanded = expandedRowKeys.indexOf(originalRow.activity.id!)
          if (isExpanded) {
            return (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon
                  style={{ color: '#1890ff', cursor: 'pointer' }}
                  type="edit"
                  onClick={() => this.setEditing(index, originalRow.activity, originalRow.proposalItemValues)}
                />
                <Icon
                  style={{ color: '#1890ff', marginLeft: '5px', cursor: 'pointer' }}
                  type="delete"
                  onClick={() => this.onDelete(originalRow.activity.id!)}
                />
              </div>
            )
          }

          return null
        },
      },
    ] as Array<ColumnProps<ProposalItem>>
  }
}

export default ProposalRequestActivitiesTable
