import { buildAppRoute, ReduxActionType } from '@vitacore/shared-ui'
import { Icon, message, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import CreateOkModalInfo from '../../Components/Modals/OkModalInfo'
import CreateYesNoModalInfo from '../../Components/Modals/YesNoModalInfo'
import { Commission } from '../../Entities/Commission'
import { CommissionMember } from '../../Entities/CommissionMember'
import { ModalInfo } from '../../Models/ModalInfo'
import { dispatchClearFetchEntityStatus, fetchSingleCommission } from '../../Redux/Actions/businessDataStateActions'
import {
  addNewModal,
  closeRecentModal,
  dispatchAddNewModal,
  dispatchCloseRecentModal,
} from '../../Redux/Actions/infrastructureStateActions'
import { FETCH_ENTITY_STATUS } from '../../Redux/Constants/businessDataStateConstants'
import { getHistory } from '../../Redux/history'
import { State } from '../../Redux/StateModels'
import { createApiClient, getAppRoute } from '../../utils'
import { ButtonData } from '../../Vitacore/Controls/Button'
import { ContentLayout } from '../shared'

const getColumns = (commissionId: string, onDelete: (commissionId: string, id: string) => any) => {
  return [
    {
      title: '№ п/п',
      width: '60px',
      dataIndex: 'id',
      key: '#',
      align: 'center',
      render: (data: any, originalRow: CommissionMember, index: number) => {
        return index + 1
      },
    },
    {
      title: 'ФИО',
      dataIndex: 'id',
      sorter: (a: CommissionMember, b: CommissionMember) => {
        const aFio = `${a.person.lastName} ${a.person.firstName}${a.person.patronymic ? ` ${a.person.patronymic}` : ''}`
        const bFio = `${b.person.lastName} ${b.person.firstName}${a.person.patronymic ? ` ${a.person.patronymic}` : ''}`
        return aFio.localeCompare(bFio)
      },
      render: (data: any, originalRow: CommissionMember) => {
        const fio = `${originalRow.person.lastName} ${originalRow.person.firstName}${
          originalRow.person.patronymic ? ` ${originalRow.person.patronymic}` : ''
        }`

        return (
          <Link to={{ pathname: buildAppRoute(getAppRoute(), `/commissions/${commissionId}/members/${data}`) }}>
            {fio}
          </Link>
        )
      },
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Роль',
      dataIndex: 'meetingMemberRole.nameRu',
      sorter: (a: CommissionMember, b: CommissionMember) =>
        a.meetingMemberRole.nameRu!.localeCompare(b.meetingMemberRole.nameRu!),
    },
    {
      title: 'Дата начала работы в составе комиссии',
      sorter: (a: CommissionMember, b: CommissionMember) =>
        moment(a.dateBegin, 'DD.MM.YYYY').diff(moment(b.dateBegin, 'DD.MM.YYYY')),
      width: '200px',
      dataIndex: 'dateBegin',
    },
    {
      title: 'Дата окончания работы в составе комиссии',
      sorter: (a: CommissionMember, b: CommissionMember) => {
        if (a.dateEnd && !b.dateEnd) {
          return 1
        }
        if (!a.dateEnd && b.dateEnd) {
          return -1
        }
        if (!a.dateEnd && !b.dateEnd) {
          return 0
        }
        return moment(a.dateEnd, 'DD.MM.YYYY').diff(moment(b.dateEnd, 'DD.MM.YYYY'))
      },
      width: '200px',
      dataIndex: 'dateEnd',
    },
    {
      title: '',
      width: '60px',
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      render: (id: any, originalRow: CommissionMember) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={buildAppRoute(getAppRoute(), `/commissions/${commissionId}/members/${id}`)}>
              <Icon type="edit" />
            </Link>
            <Icon
              style={{ color: '#1890ff', marginLeft: '5px', cursor: 'pointer' }}
              type="delete"
              onClick={() => onDelete(commissionId, id)}
            />
          </div>
        )
      },
    },
  ] as Array<ColumnProps<CommissionMember>>
}

type Props = {
  commission?: Commission
  fetchSingleCommissionStatus: FETCH_ENTITY_STATUS
  header: string
  match: any
  fetchCommissionById: (id: string) => any
  addNewModal: (modalInfo: ModalInfo) => any
  closeRecentModal: (numberToClose?: number) => any
}

class CommissionMembersList extends React.Component<Props> {
  public componentDidMount() {
    const id = this.props.match.params.id
    this.fetchCommission(id)
  }

  public render() {
    const { commission, fetchSingleCommissionStatus, header, match } = this.props
    const { id } = match.params

    if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.FETCHING) {
      return <ContentLayout contentName="Члены комиссии" />
    }
    if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.IDLE) {
      return null
    }
    if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.FAILED) {
      const modalInfo = CreateOkModalInfo(
        'Ошибка при загрузке комиссии',
        'Комиссия не найдена',
        () => {
          dispatchCloseRecentModal()
          getHistory().push(buildAppRoute(getAppRoute(), '/commissions/all'))
        },
        undefined,
        false
      )
      setTimeout(() => {
        dispatchClearFetchEntityStatus()
        dispatchAddNewModal(modalInfo)
      }, 0)
      return null
    }

    const contentNode = commission && (
      <Table
        columns={getColumns(id, this.onDeleteCommissionMember)}
        dataSource={commission.meetingMembers}
        rowKey={r => r.id!.toString()}
        size="middle"
        pagination={false}
      />
    )

    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'commissions',
        breadcrumbName: 'Комиссии',
      },
      {
        path: `${id}/members`,
        breadcrumbName: 'Члены комиссии',
      },
    ]

    const buttons = [
      {
        text: 'Добавить члена комиссии',
        onClick: () => getHistory().push(buildAppRoute(getAppRoute(), `/commissions/${id}/members/new`)),
      },
    ] as ButtonData[]

    return (
      <ContentLayout contentName={header} breadcrumbRoutes={bcRoutes} buttons={buttons}>
        {contentNode}
      </ContentLayout>
    )
  }

  private fetchCommission = (id: string) => {
    this.props.fetchCommissionById(id)
  }

  private onDeleteCommissionMember = (commissionId: string, id: string) => {
    const modalInfo = CreateYesNoModalInfo(
      'Вы действительно хотите удалить члена комиссии?',
      null,
      () => {
        createApiClient()
          .deleteCommissionMember(id)
          .then(() => {
            message.success('Член комиссии успешно удален')
            this.props.closeRecentModal()
            this.fetchCommission(this.props.match.params.id)
          })
          .catch(error => {
            message.error(error.message)
            this.props.closeRecentModal()
          })
      },
      undefined,
      () => {
        this.props.closeRecentModal()
      },
      undefined,
      undefined
    )
    this.props.addNewModal(modalInfo)
  }
}

const mapStateToProps = (state: State) => {
  return {
    commission: state.businessDataState.commissionsData.currentCommission,
    fetchSingleCommissionStatus: state.businessDataState.commissionsData.fetchSingleCommissionStatus,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchCommissionById: (id: string) => dispatch(fetchSingleCommission(id)),
    addNewModal: (modalInfo: ModalInfo) => dispatch(addNewModal(modalInfo)),
    closeRecentModal: (numberToClose?: number) => dispatch(closeRecentModal(numberToClose)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionMembersList)
