import { DictionaryBaseMLWithShortName } from '@vitacore/shared-ui'
import { Icon, InputNumber, Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import React from 'react'
import styled from 'styled-components'
import { ProtocolActivityGroupInfo, ProtocolItem } from '../../Entities/Protocol'
import ProtocolItemsByActivity from './ProtocolItemsByActivity'

const InputWrapper = styled.div`
  & > div {
    max-width: 100%;
  }
`

type Props = {
  onProtocolItemValueChange: (activityId: string, clinicId: string, measureUnitId: string, newValue: number) => any
  groupInfo: ProtocolActivityGroupInfo
  protocolItemInfo: ProtocolItemsByActivity
  onGroupPageChanged: (activityId: string, page: number) => any
  onGroupPageSizeChanged: (activityId: string, pageSize: number) => any
  measureUnits: DictionaryBaseMLWithShortName[]
  onDataOnPageSave: (activityId: string) => any
  onDataOnRowSave: (activityId: string, clinicId: string) => any
}

class ProtocolActivitiesTableSubRow extends React.Component<Props> {
  public render() {
    const { protocolItemInfo, groupInfo } = this.props

    return (
      <Table
        columns={this.getColumns()}
        bordered
        dataSource={protocolItemInfo.protocolItemsInfo.items}
        rowKey={r => r.id!.toString()}
        style={{ margin: '4px 0' }}
        size="small"
        pagination={{
          position: 'bottom',
          pageSize: protocolItemInfo.protocolItemsInfo.pageSize,
          current: protocolItemInfo.protocolItemsInfo.page,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
          pageSizeOptions: ['1', '10', '25', '50', '100'],
          total: protocolItemInfo.protocolItemsInfo.totalElements,
          onChange: (page: number, pageSize: number) => {
            this.props.onGroupPageChanged(protocolItemInfo.activityId, page)
          },
          onShowSizeChange: (current: number, size: number) => {
            this.props.onGroupPageSizeChanged(protocolItemInfo.activityId, size)
          },
        }}
        footer={() => {
          return (
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'flex-end' }}>
                <p style={{ textAlign: 'right', paddingRight: '3px', lineHeight: '36px' }}>Итого: </p>
                <p style={{ textAlign: 'right', paddingRight: '3px', lineHeight: '36px' }}>План: </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexShrink: 0,
                  width: `${214 * (groupInfo.measureUnitValues.length - 1) + 205}px`,
                }}
              >
                {groupInfo.measureUnitValues.map((i, idx) => {
                  const isLast = idx === groupInfo.measureUnitValues.length - 1
                  return (
                    <div
                      style={{ display: 'flex', flexDirection: 'column', width: isLast ? '204px' : '214px' }}
                      key={i.measureUnit.id}
                    >
                      <div style={{ display: 'flex' }}>
                        <InputWrapper style={{ padding: '2px 8px', width: '107px', minWidth: '107px' }}>
                          <InputNumber disabled={true} value={i.proposalValue} />
                        </InputWrapper>
                        <InputWrapper style={{ padding: '2px 8px', width: '107px', minWidth: '107px' }}>
                          <InputNumber disabled={true} value={i.value} style={{ maxWidth: '100%' }} />
                        </InputWrapper>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div style={{ padding: '2px 8px', width: '107px', minWidth: '107px', flexShrink: 0 }} />
                        <InputWrapper style={{ padding: '2px 8px', width: '107px', minWidth: '107px' }}>
                          <InputNumber disabled={true} value={i.planItemValue} style={{ maxWidth: '100%' }} />
                        </InputWrapper>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }}
      />
    )
  }

  private getColumns = () => {
    const columns = [
      {
        title: 'Мед. организация',
        dataIndex: 'clinic.shortName',
        render: (text: any, record: ProtocolItem, index: number) => {
          const rowInfo = this.props.groupInfo.initialCellValues.filter(i => i.clinicId === record.clinic.id)!
          if (!rowInfo.some(i => i.dirty)) {
            return text
          }

          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p>{text}</p>
              <Icon
                style={{ marginLeft: '6px', color: '#1890ff', cursor: 'pointer' }}
                type="check"
                onClick={() => this.props.onDataOnRowSave(record.activity.id!, record.clinic.id!)}
              />
            </div>
          )
        },
      },
    ] as Array<ColumnProps<ProtocolItem>>

    const valueColumnProps = this.props.groupInfo.measureUnitValues.map(mu => {
      const cProps: ColumnProps<ProtocolItem> = {
        title: mu.measureUnit.shortname || mu.measureUnit.nameRu,
        width: 200,
        children: [
          {
            title: 'Заявлено',
            dataIndex: 'id',
            width: 107,
            key: `${mu.measureUnit.code}_planValue`,
            render: (text: any, record: ProtocolItem, index: number) => {
              const protocolItemValue = record.planProtocolItemValues.find(i => i.measureUnit.id === mu.measureUnit.id)!

              return <InputNumber disabled={true} value={protocolItemValue.proposalItemValue.value || 0} />
            },
          },
          {
            title: 'Принято',
            dataIndex: 'id',
            width: 107,
            key: `${mu.measureUnit.code}_actualValue`,
            render: (text: any, record: ProtocolItem, index: number) => {
              const protocolItemValue = record.planProtocolItemValues.find(i => i.measureUnit.id === mu.measureUnit.id)!

              return (
                <InputNumber
                  value={protocolItemValue.value}
                  min={0}
                  onChange={(value: string | number) =>
                    this.onValueChange(record.activity.id!, record.clinic.id!, mu.measureUnit.id!, value)
                  }
                />
              )
            },
          },
        ],
      }

      return cProps
    })

    return columns.concat(valueColumnProps)
  }

  private onValueChange = (activityId: string, clinicId: string, measureUnitId: string, newValue: number | string) => {
    let val = newValue || 0
    if (typeof newValue !== 'number') {
      val = parseInt(newValue as string, 10) || 0
    }
    this.props.onProtocolItemValueChange(activityId, clinicId, measureUnitId, val as number)
  }
}

export default ProtocolActivitiesTableSubRow
