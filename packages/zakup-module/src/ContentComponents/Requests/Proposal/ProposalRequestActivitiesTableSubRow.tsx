import { InputNumber, Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import React from 'react'
import { ProposalItem, ProposalItemValue } from '../../../Entities/Proposal'

type Props = {
  onProposalItemValueChange: (activityId: string, measureUnitId: string, newValue: number) => any
  proposalItem: ProposalItem
}

class ProposalRequestActivitiesTableSubRow extends React.Component<Props> {
  public render() {
    return (
      <Table
        size="small"
        showHeader={false}
        style={{ margin: '4px 0' }}
        columns={this.getColumns()}
        rowKey={r => r.measureUnit.id!.toString()}
        dataSource={this.props.proposalItem.proposalItemValues}
        pagination={false}
      />
    )
  }

  private getColumns = () => {
    return [
      {
        title: 'Вид деятельности',
        dataIndex: 'measureUnit.nameRu',
        width: '160px',
      },
      {
        title: '',
        dataIndex: 'value',
        render: (value: number, originalRow: ProposalItemValue, index: number) => {
          return (
            <InputNumber
              min={0}
              value={value}
              onChange={(newValue: number) => this.onValueChange(originalRow.measureUnit.id!, newValue)}
            />
          )
        },
      },
    ] as Array<ColumnProps<ProposalItemValue>>
  }

  private onValueChange = (measureUnitId: string, newValue: number | string) => {
    let val = newValue || 0
    if (typeof newValue !== 'number') {
      val = parseInt(newValue as string, 10) || 0
    }
    this.props.onProposalItemValueChange(this.props.proposalItem.activity.id!, measureUnitId, val as number)
  }
}

export default ProposalRequestActivitiesTableSubRow
