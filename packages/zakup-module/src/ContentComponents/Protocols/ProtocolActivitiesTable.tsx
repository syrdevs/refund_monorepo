import { DictionaryBaseMLWithShortName, ReduxActionType } from '@vitacore/shared-ui'
import { Icon, message, Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import CreateYesNoModalInfo from '../../Components/Modals/YesNoModalInfo'
import { InitialCellValue, MeasureUnitInfo, ProtocolActivityGroupInfo, ProtocolItem } from '../../Entities/Protocol'
import { dictionariesNames } from '../../Infrastructure/dictionariesList'
import { ModalInfo } from '../../Models/ModalInfo'
import { fetchCustomDict } from '../../Redux/Actions/businessDataStateActions'
import { addNewModal, closeRecentModal } from '../../Redux/Actions/infrastructureStateActions'
import { State } from '../../Redux/StateModels'
import { createApiClient } from '../../utils'
import ProtocolActivitiesTableSubRow from './ProtocolActivitiesTableSubRow'
import ProtocolItemsByActivity from './ProtocolItemsByActivity'

const ProtocolItemsTable = styled(Table as any)`
  .ant-table td {
    white-space: nowrap;
  }
`

type StateProps = {
  measureUnitsDict: DictionaryBaseMLWithShortName[]
}

type DispatchProps = {
  fetchCustomDict: (dictNames: dictionariesNames[]) => any
  addNewModal: (modalInfo: ModalInfo) => any
  closeRecentModal: (numberToClose?: number) => any
}

type OwnProps = {
  planProtocolId: string
}

type CompState = {
  expandedRowKeys: string[]
  protocolActivityGroupInfos: ProtocolActivityGroupInfo[]
  protocolItemsByActivity: ProtocolItemsByActivity[]
  fetched: boolean
}

type Props = OwnProps & StateProps & DispatchProps
class ProtocolActivitiesTable extends React.Component<Props, CompState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      expandedRowKeys: [],
      protocolActivityGroupInfos: [],
      protocolItemsByActivity: [],
      fetched: false,
    }
  }

  public componentDidMount() {
    this.fetchProtocolActivityGroupInfos(this.props.planProtocolId)
    this.props.fetchCustomDict(['measureUnit'])
  }

  public render() {
    if (!this.state.fetched || !this.props.measureUnitsDict.length) {
      return null
    }

    const expandedObj = {}
    if (this.state.protocolActivityGroupInfos.length) {
      expandedObj['expandedRowRender'] = (r: ProtocolActivityGroupInfo) => {
        const protocolItemInfo = this.state.protocolItemsByActivity.find(i => i.activityId === r.activity.id)
        if (!protocolItemInfo) {
          return null
        }

        return (
          <ProtocolActivitiesTableSubRow
            onProtocolItemValueChange={this.onProtocolItemValueChange}
            onGroupPageChanged={this.onGroupPageChanged}
            onGroupPageSizeChanged={this.onGroupPageSizeChanged}
            groupInfo={r}
            protocolItemInfo={protocolItemInfo!}
            measureUnits={this.props.measureUnitsDict}
            onDataOnPageSave={this.onDataOnPageSave}
            onDataOnRowSave={this.onDataOnRowSave}
          />
        )
      }
    }

    return (
      <ProtocolItemsTable
        size="small"
        indentSize={4}
        // title={() => 'Виды деятельности'}
        columns={this.getColumns()}
        rowKey={(r: ProtocolActivityGroupInfo) => r.activity.id!.toString()}
        dataSource={this.state.protocolActivityGroupInfos}
        pagination={false}
        {...expandedObj}
        onExpandedRowsChange={this.handleExpandedRowsChange}
        onExpand={(expanded: boolean, r: ProtocolActivityGroupInfo) => this.onGroupExpanding(r.activity.id!)}
      />
    )
  }

  private fetchProtocolActivityGroupInfos = (id: string) => {
    createApiClient()
      .fetchProtocolActivityGroupInfos(id)
      .then(resp => {
        const protocolActivityGroupInfos = (resp.data.content as any[]).map(i => ({
          measureUnitValues: [],
          initialCellValues: [],
          activity: {
            ...i.activity,
          },
        })) as ProtocolActivityGroupInfo[]
        this.setState(
          {
            protocolActivityGroupInfos,
          },
          () => {
            protocolActivityGroupInfos.forEach(i => {
              this.fetchProtocolActivityMeasureUnits(id, i.activity.id!)
            })
          }
        )
      })
      .catch(error => message.error(error.message))
  }

  private fetchProtocolActivityMeasureUnits = (id: string, activityId: string) => {
    createApiClient()
      .fetchProtocolActivityMeasureUnits(id, activityId)
      .then(resp => {
        this.setState(state => {
          const clonedGroups = [...state.protocolActivityGroupInfos]
          const idx = clonedGroups.findIndex(i => i.activity.id === activityId)
          clonedGroups[idx] = {
            ...clonedGroups[idx],
            measureUnitValues: (resp.data.content as MeasureUnitInfo[]).map(k => ({
              ...k,
              value: k.value || 0,
              planItemValue: k.planItemValue || 0,
              initialValue: k.value || 0,
            })),
          }

          return {
            protocolActivityGroupInfos: clonedGroups,
            fetched: true,
            // clonedGroups.filter(i => i.measureUnitValues.length > 0).length ===
            // state.protocolActivityGroupInfos.length,
          }
        })
      })
      .catch(error => message.error(error.message))
  }

  private handleExpandedRowsChange = (rowKeys: string[]) => {
    this.setState({
      expandedRowKeys: rowKeys,
    })
  }

  private onProtocolItemValueChange = (activityId: string, clinicId: string, measureUnitId: string, value: number) => {
    const { protocolItemsByActivity, protocolActivityGroupInfos } = this.state

    const updatedProtocolItemsByActivity = [...protocolItemsByActivity]
    const protocolItemsIdx = updatedProtocolItemsByActivity.findIndex(i => i.activityId === activityId)
    const updatedProtocolItems = [...updatedProtocolItemsByActivity[protocolItemsIdx].protocolItemsInfo.items]
    const protocolItemIdx = updatedProtocolItems.findIndex(i => i.clinic.id === clinicId)
    const updatedPlanProtocolItemValues = [...updatedProtocolItems[protocolItemIdx].planProtocolItemValues]
    const protocolItemValuesIdx = updatedPlanProtocolItemValues.findIndex(i => i.measureUnit.id === measureUnitId)
    const valueDelta = value - updatedPlanProtocolItemValues[protocolItemValuesIdx].value
    updatedPlanProtocolItemValues[protocolItemValuesIdx] = {
      ...updatedPlanProtocolItemValues[protocolItemValuesIdx],
      value,
    }
    updatedProtocolItems[protocolItemIdx] = {
      ...updatedProtocolItems[protocolItemIdx],
      planProtocolItemValues: updatedPlanProtocolItemValues,
    }

    updatedProtocolItemsByActivity[protocolItemsIdx] = {
      ...updatedProtocolItemsByActivity[protocolItemsIdx],
      protocolItemsInfo: {
        ...updatedProtocolItemsByActivity[protocolItemsIdx].protocolItemsInfo,
        items: updatedProtocolItems,
      },
    }

    const updatedProtocolActivityGroupInfos = [...protocolActivityGroupInfos]
    const procotolActivityGroupIdx = updatedProtocolActivityGroupInfos.findIndex(i => i.activity.id === activityId)
    const updatedInitialCellValues = [...updatedProtocolActivityGroupInfos[procotolActivityGroupIdx].initialCellValues]
    const initialValue = updatedInitialCellValues.find(
      i => i.clinicId === clinicId && i.measureUnitId === measureUnitId
    )!
    initialValue.dirty = value !== initialValue.value!

    const updatedMeasureUnitValues = [...updatedProtocolActivityGroupInfos[procotolActivityGroupIdx].measureUnitValues]
    const idx = updatedMeasureUnitValues.findIndex(i => i.measureUnit.id === measureUnitId)
    updatedMeasureUnitValues[idx] = {
      ...updatedMeasureUnitValues[idx],
      value: updatedMeasureUnitValues[idx].value! + valueDelta,
    }

    updatedProtocolActivityGroupInfos[procotolActivityGroupIdx] = {
      ...updatedProtocolActivityGroupInfos[procotolActivityGroupIdx],
      initialCellValues: updatedInitialCellValues,
      measureUnitValues: updatedMeasureUnitValues,
    }

    this.setState({
      protocolItemsByActivity: updatedProtocolItemsByActivity,
      protocolActivityGroupInfos: updatedProtocolActivityGroupInfos,
    })
  }

  private onGroupExpanding = (activityId: string) => {
    const { protocolItemsByActivity, protocolActivityGroupInfos } = this.state
    const protocolItemInfo = protocolItemsByActivity.find(i => i.activityId === activityId)
    if (protocolItemInfo) {
      return
    }

    const defaultPage = 1
    const defaultPageSize = 10

    this.fetchProtocolItems(activityId, defaultPage - 1, defaultPageSize).then(resp => {
      const updatedProtocolItemsByActivity = [
        ...this.state.protocolItemsByActivity,
        {
          activityId,
          protocolItemsInfo: {
            page: defaultPage,
            pageSize: defaultPageSize,
            totalElements: resp.totalElements,
            items: (resp.content as ProtocolItem[]).map(pi => {
              const itemValues = pi.planProtocolItemValues || []
              const itemValuesMeasureUnitIds = itemValues.map(i => i.measureUnit)
              const groupInfo = protocolActivityGroupInfos.find(i => i.activity.id === pi.activity.id)!
              const valuesToAdd = groupInfo.measureUnitValues.filter(
                i => !itemValuesMeasureUnitIds.some(k => i.measureUnit.id === k.id)
              )

              if (valuesToAdd.length) {
                itemValues.push(
                  ...valuesToAdd.map(i => ({
                    value: 0,
                    valueSum: null,
                    proposalItemValue: {
                      value: 0,
                      valueSum: null,
                    },
                    measureUnit: {
                      ...i.measureUnit,
                    },
                  }))
                )
              }

              return {
                ...pi,
                planProtocolItemValues: itemValues,
              }
            }),
          },
        },
      ] as ProtocolItemsByActivity[]

      this.setState({
        protocolItemsByActivity: updatedProtocolItemsByActivity,
        protocolActivityGroupInfos: this.setInitialCellValues(activityId, resp.content),
      })
    })
  }

  private setInitialCellValues = (activityId: string, protocolItems: ProtocolItem[]) => {
    const { protocolActivityGroupInfos } = this.state
    const idx = protocolActivityGroupInfos.findIndex(i => i.activity.id === activityId)
    const groupInfos = [...protocolActivityGroupInfos]

    const initialValues = [] as InitialCellValue[]
    protocolItems.forEach(pi => {
      groupInfos[idx].measureUnitValues.forEach(muv => {
        initialValues.push({
          clinicId: pi.clinic.id!,
          measureUnitId: muv.measureUnit.id!,
          value: muv.value,
          dirty: false,
        })
      })
    })

    groupInfos[idx] = {
      ...groupInfos[idx],
      initialCellValues: initialValues,
    }

    return groupInfos
  }

  private checkForLosingChangedCellValues = (activityId: string) => {
    const groupInfo = this.state.protocolActivityGroupInfos.find(i => i.activity.id === activityId)!
    return groupInfo.measureUnitValues.every(i => {
      return i.value === i.initialValue
    })
  }

  private fetchProtocolItems = (activityId: string, page: number, pageSize: number) => {
    return createApiClient()
      .fetchProtocolItems(this.props.planProtocolId, activityId, page, pageSize)
      .then(resp => resp.data)
      .catch(error => message.error(error.response && error.response.statusText))
  }

  private saveDataRow = (activityId: string, clinidId: string) => {
    const { protocolItemsByActivity } = this.state

    const data = this.preparePlanProtocolItemForSave(
      protocolItemsByActivity
        .find(i => i.activityId === activityId)!
        .protocolItemsInfo.items.find(i => i.clinic.id === clinidId)!
    )

    return createApiClient().savePlanProtocolItem(data)
  }

  private saveDataPage = (activityId: string) => {
    const { protocolItemsByActivity } = this.state

    const pageData = protocolItemsByActivity
      .find(i => i.activityId === activityId)!
      .protocolItemsInfo.items.map(i => this.preparePlanProtocolItemForSave(i))

    return Promise.all(pageData.map(i => createApiClient().savePlanProtocolItem(i)))
  }

  private preparePlanProtocolItemForSave = (item: ProtocolItem) => {
    return {
      id: item.id!,
      planProtocolItemValues: item.planProtocolItemValues.map(i => ({
        id: i.id!,
        value: i.value,
      })),
    }
  }

  private onDataOnPageSave = (activityId: string) => {
    this.saveDataPage(activityId)
      .then(() => {
        const { protocolActivityGroupInfos, protocolItemsByActivity } = this.state
        const protocolItemsByActivityItem = protocolItemsByActivity.find(i => i.activityId === activityId)!

        const groupInfoIdx = protocolActivityGroupInfos.findIndex(i => i.activity.id === activityId)!
        const updatedGroupInfos = [...protocolActivityGroupInfos]
        const updatedMeasureUnitValues = updatedGroupInfos[groupInfoIdx].measureUnitValues.map(i => ({
          ...i,
          initialValue: i.value!,
        }))

        const updatedInitialCellValues = updatedGroupInfos[groupInfoIdx].initialCellValues.map(i => ({
          ...i,
          dirty: false,
          value: protocolItemsByActivityItem.protocolItemsInfo.items
            .find(x => x.clinic.id === i.clinicId)!
            .planProtocolItemValues.find(y => y.measureUnit.id === i.measureUnitId)!.value,
        }))

        updatedGroupInfos[groupInfoIdx] = {
          ...updatedGroupInfos[groupInfoIdx],
          measureUnitValues: updatedMeasureUnitValues,
          initialCellValues: updatedInitialCellValues,
        }

        this.setState(
          {
            protocolActivityGroupInfos: updatedGroupInfos,
          },
          () => {
            message.success('Страница протокола сохранена')
          }
        )
      })
      .catch(error => message.error('Ошибка при сохранении страницы протокола'))
  }

  private onDataOnRowSave = (activityId: string, clinicId: string) => {
    this.saveDataRow(activityId, clinicId)
      .then(() => {
        const { protocolActivityGroupInfos, protocolItemsByActivity } = this.state
        const protocolItem = protocolItemsByActivity
          .find(i => i.activityId === activityId)!
          .protocolItemsInfo.items.find(i => i.clinic.id === clinicId)!

        const groupInfoIdx = protocolActivityGroupInfos.findIndex(i => i.activity.id === activityId)!
        const updatedGroupInfos = [...protocolActivityGroupInfos]
        const groupInfo = updatedGroupInfos[groupInfoIdx]

        const initialValues = groupInfo.initialCellValues.filter(i => i.clinicId === clinicId)
        const updatedMeasureUnitValues = groupInfo.measureUnitValues.map(i => {
          const newValue = protocolItem.planProtocolItemValues.find(k => k.measureUnit.id === i.measureUnit.id)!.value

          return {
            ...i,
            value: newValue,
            initialValue: newValue,
          }
        })

        const updatedInitialCellValues = groupInfo.initialCellValues
          .filter(i => i.clinicId !== clinicId)
          .concat(
            initialValues.map(i => ({
              ...i,
              dirty: false,
              value: protocolItem.planProtocolItemValues.find(x => x.measureUnit.id === i.measureUnitId)!.value,
            }))
          )

        groupInfo.initialCellValues = updatedInitialCellValues
        groupInfo.measureUnitValues = updatedMeasureUnitValues

        updatedGroupInfos[groupInfoIdx] = {
          ...groupInfo,
        }

        this.setState(
          {
            protocolActivityGroupInfos: updatedGroupInfos,
          },
          () => {
            message.success('Строка протокола сохранена')
          }
        )
      })
      .catch(error => message.error('Ошибка при сохранении строки протокола'))
  }

  private onGroupPageChanged = (activityId: string, page: number) => {
    const { protocolItemsByActivity } = this.state
    const protocolItemInfoIdx = protocolItemsByActivity.findIndex(i => i.activityId === activityId)
    const protocolItemInfo = protocolItemsByActivity[protocolItemInfoIdx]

    if (protocolItemInfo.protocolItemsInfo.page === page) {
      return
    }

    const postAction = () =>
      this.fetchProtocolItems(activityId, page - 1, protocolItemInfo.protocolItemsInfo.pageSize).then(resp => {
        const updatedProtocolItemsByActivity = [...this.state.protocolItemsByActivity] as ProtocolItemsByActivity[]
        updatedProtocolItemsByActivity[protocolItemInfoIdx] = {
          ...updatedProtocolItemsByActivity[protocolItemInfoIdx],
          protocolItemsInfo: {
            ...updatedProtocolItemsByActivity[protocolItemInfoIdx].protocolItemsInfo,
            page,
            totalElements: resp.totalElements,
            items: resp.content,
          },
        }

        this.setState({
          protocolItemsByActivity: updatedProtocolItemsByActivity,
          protocolActivityGroupInfos: this.setInitialCellValues(activityId, resp.content),
        })
      })

    this.doPostAction(activityId, postAction)
  }

  private doPostAction = (activityId: string, postAction: () => any) => {
    if (!this.checkForLosingChangedCellValues(activityId)) {
      const modalInfo = CreateYesNoModalInfo(
        'Предупреждение',
        'У вас есть несохраненные данные. Вы действительно хотите продолжить?',
        () => {
          postAction()
          this.props.closeRecentModal()
        },
        undefined,
        () => {
          this.props.closeRecentModal()
          this.forceUpdate()
        },
        undefined,
        false
      )
      this.props.addNewModal(modalInfo)
      return
    }

    postAction()
  }

  private onGroupPageSizeChanged = (activityId: string, pageSize: number) => {
    const { protocolItemsByActivity } = this.state
    const protocolItemInfoIdx = protocolItemsByActivity.findIndex(i => i.activityId === activityId)
    const protocolItemInfo = protocolItemsByActivity[protocolItemInfoIdx]

    if (protocolItemInfo.protocolItemsInfo.pageSize === pageSize) {
      return
    }

    const postAction = () =>
      this.fetchProtocolItems(activityId, protocolItemInfo.protocolItemsInfo.page - 1, pageSize).then(resp => {
        const updatedProtocolItemsByActivity = [...this.state.protocolItemsByActivity] as ProtocolItemsByActivity[]
        updatedProtocolItemsByActivity[protocolItemInfoIdx] = {
          ...updatedProtocolItemsByActivity[protocolItemInfoIdx],
          protocolItemsInfo: {
            ...updatedProtocolItemsByActivity[protocolItemInfoIdx].protocolItemsInfo,
            pageSize,
            totalElements: resp.totalElements,
            items: resp.content,
          },
        }

        this.setState({
          protocolItemsByActivity: updatedProtocolItemsByActivity,
          protocolActivityGroupInfos: this.setInitialCellValues(activityId, resp.content),
        })
      })

    this.doPostAction(activityId, postAction)
  }

  private getColumns = () => {
    return [
      {
        title: 'Код',
        width: '120px',
        dataIndex: 'activity.code',
      },
      {
        title: 'Вид деятельности',
        dataIndex: 'activity.name',
      },
      {
        title: '',
        dataIndex: 'id',
        render: (id: string, originalRow: ProtocolActivityGroupInfo) => {
          return (
            originalRow.initialCellValues.some(i => i.dirty) && (
              <Icon
                type="check"
                style={{ color: '#1890ff', cursor: 'pointer' }}
                onClick={() => this.onDataOnPageSave(originalRow.activity.id!)}
              />
            )
          )
        },
      },
    ] as Array<ColumnProps<ProtocolActivityGroupInfo>>
  }
}

const mapStateToProps = (state: State) => {
  return {
    measureUnitsDict: state.dictionariesDataState.measureUnit as DictionaryBaseMLWithShortName[],
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchCustomDict: (dictNames: dictionariesNames[]) => dispatch(fetchCustomDict(dictNames)),
    addNewModal: (modalInfo: ModalInfo) => dispatch(addNewModal(modalInfo)),
    closeRecentModal: (numberToClose?: number) => dispatch(closeRecentModal(numberToClose)),
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ProtocolActivitiesTable)
