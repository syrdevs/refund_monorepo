import { buildAppRoute, ReduxActionType } from '@vitacore/shared-ui'
import { message, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { ProposalForList } from '../../../Entities/Proposal'
import { PROPOSALS_TABLE_ITEMS_PER_PAGE } from '../../../Infrastructure/localStorageConstants'
import { ModalInfo } from '../../../Models/ModalInfo'
import { addNewModal, closeRecentModal } from '../../../Redux/Actions/infrastructureStateActions'
import { NativeHistory } from '../../../Redux/history'
import { createApiClient, getAppRoute } from '../../../utils'
import { ContentLayout } from '../../shared'

type DispatchProps = {
  addNewModal: (modalInfo: ModalInfo) => any
  closeRecentModal: (numberToClose?: number) => any
}

type OwnProps = {
  header: string
  page: string
  noticeId?: string
}

type State = {
  proposals: ProposalForList[]
  selectedRowKeys: string[]
  currentPage: number
  itemsPerPage: number
  totalElements: number
}

type Props = OwnProps & DispatchProps
class ProposalsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    let page = +this.props.page
    if (!page) {
      page = 1
    }

    const itemsPerPage = localStorage.getItem(PROPOSALS_TABLE_ITEMS_PER_PAGE)
    this.state = {
      proposals: [],
      selectedRowKeys: [] as string[],
      currentPage: page,
      itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
      totalElements: 0,
    }
  }

  public componentDidMount() {
    const { currentPage, itemsPerPage } = this.state
    this.fetchProposals(currentPage, itemsPerPage)
  }

  public render() {
    const { header, noticeId } = this.props
    const { proposals, totalElements } = this.state
    const contentNode = proposals && (
      <Table
        rowSelection={{ onChange: this.onRowSelectionChange, selectedRowKeys: this.state.selectedRowKeys }}
        columns={this.getColumns()}
        dataSource={proposals}
        rowKey={r => r.id!.toString()}
        size="middle"
        pagination={{
          position: 'both',
          pageSize: this.state.itemsPerPage,
          current: this.state.currentPage,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
          pageSizeOptions: ['10', '25', '50', '100'],
          total: totalElements,
          onChange: (page: number, pageSize: number) => {
            const urlSuffix = noticeId ? `/notices/${noticeId}/applicants/${page}` : `/requests/proposals/all/${page}`

            NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), urlSuffix))
            this.setState({
              currentPage: page,
            })
            this.fetchProposals(page, pageSize)
          },
          onShowSizeChange: (current: number, size: number) => {
            localStorage.setItem(PROPOSALS_TABLE_ITEMS_PER_PAGE, size.toString())
            if (this.state.currentPage !== current) {
              const urlSuffix = this.props.noticeId
                ? `/notices/${this.props.noticeId}/applicants/${current}`
                : `/requests/proposals/all/${current}`

              NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), urlSuffix))
            }

            this.setState({
              currentPage: current,
              itemsPerPage: size,
            })
            this.fetchProposals(current, size)
          },
        }}
      />
    )

    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'requests/proposals/all',
        breadcrumbName: 'Заявки на объемы',
      },
    ]

    return (
      <ContentLayout
        contentName={header}
        breadcrumbRoutes={bcRoutes}
        entity="proposal"
        disableCommands={this.state.selectedRowKeys.length === 0}
        showCommands={true}
        onCommandClick={this.onCommandClick}
      >
        {contentNode}
      </ContentLayout>
    )
  }

  private onRowSelectionChange = (selectedRowKeys: string[]) => {
    this.setState({
      selectedRowKeys,
    })
  }

  private onCommandClick = (commandId: string, isReport: boolean) => {
    createApiClient().runCommand(commandId, this.state.selectedRowKeys, isReport)
  }

  private getColumns = () => {
    const columns: any[] = [
      {
        title: 'Плановый период',
        dataIndex: 'periodYear.year',
        width: '120px',
        sorter: (a: ProposalForList, b: ProposalForList) => a.periodYear!.year! - b.periodYear!.year!,
      },
      {
        title: 'Регион осущ. деятельности',
        dataIndex: 'region.nameRu',
        width: '200px',
        sorter: (a: ProposalForList, b: ProposalForList) => a.region!.nameRu!.localeCompare(b.region!.nameRu!),
      },
      {
        title: 'Организация',
        dataIndex: 'clinic.shortName',
        sorter: (a: ProposalForList, b: ProposalForList) => a.clinic!.shortName!.localeCompare(b.clinic!.shortName!),
      },
      {
        title: 'Регистрационный номер',
        dataIndex: 'number',
        width: '170px',
        sorter: (a: ProposalForList, b: ProposalForList) => a.number!.localeCompare(b.number!),
        render: (data: any, originalRow: ProposalForList) => {
          return (
            <Link to={{ pathname: buildAppRoute(getAppRoute(), `/requests/proposals/${originalRow.id!.toString()}`) }}>
              {data}
            </Link>
          )
        },
      },
      {
        title: 'Дата подачи заявки',
        width: '150px',
        dataIndex: 'documentDate',
        sorter: (a: ProposalForList, b: ProposalForList) =>
          +moment(a.documentDate!, 'DD.MM.YYYY') - +moment(b.documentDate!, 'DD.MM.YYYY'),
      },
      {
        title: 'Комментарий',
        dataIndex: 'descr',
      },
      // {
      //   title: '',
      //   width: '52px',
      //   dataIndex: 'id',
      //   render: (id: any, originalRow: ProposalForList) => {
      //     return (
      //       <div style={{ display: 'flex', alignItems: 'center' }}>
      //         <Icon
      //           type="check"
      //           style={{ color: '#1890ff', cursor: 'pointer', marginRight: '5px' }}
      //           onClick={() => this.onAccept(id)}
      //         />
      //         <Icon
      //           type="close"
      //           style={{ color: '#1890ff', cursor: 'pointer', marginRight: '5px' }}
      //           onClick={() => this.onDecline(id)}
      //         />
      //         <Icon
      //            type="delete" style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this.onDelete(id)} />
      //       </div>
      //     )
      //   },
      // },
    ]

    return columns
  }

  // private onAccept = (id: string) => {
  //   const modalInfo = CreateYesNoModalInfo(
  //     'Предупреждение',
  //     'Вы действительно хотите принять заявку?',
  //     () => {
  //       createApiClient()
  //         .acceptProposal(id)
  //         .then(() => message.success('Заявка принята'))
  //         .catch(() => message.error('Ошибка при принятии заявки'))
  //       this.props.closeRecentModal()
  //     },
  //     undefined,
  //     () => {
  //       this.props.closeRecentModal()
  //     },
  //     undefined,
  //     false
  //   )
  //   this.props.addNewModal(modalInfo)
  // }
  //
  // private onDelete = (id: string) => {
  //   const modalInfo = CreateYesNoModalInfo(
  //     'Предупреждение',
  //     'Вы действительно хотите удалить заявку?',
  //     () => {
  //       createApiClient()
  //         .deleteProposal(id)
  //         .then(() => message.success('Заявка удалена'))
  //         .catch(() => message.error('Ошибка при удалении заявки'))
  //       this.props.closeRecentModal()
  //     },
  //     undefined,
  //     () => {
  //       this.props.closeRecentModal()
  //     },
  //     undefined,
  //     false
  //   )
  //   this.props.addNewModal(modalInfo)
  // }
  //
  // private onDecline = (id: string) => {
  //   const modalInfo = createRejectReasonModalInfo(
  //     'Укажите причину отклонения',
  //     (rejectText: string) => () => {
  //       createApiClient()
  //         .declineProposal(id, rejectText)
  //         .then(() => message.success('Заявка отклонена'))
  //         .catch(() => message.error('Ошибка при отклонении заявки'))
  //       this.props.closeRecentModal()
  //     },
  //     () => {
  //       this.props.closeRecentModal()
  //     },
  //     'Отклонить',
  //     undefined,
  //     false
  //   )
  //   this.props.addNewModal(modalInfo)
  // }

  private fetchProposals = (page: number, pageSize: number) => {
    createApiClient()
      .fetchProposals(page - 1, pageSize, this.props.noticeId)
      .then(resp => {
        const data = resp.data as { totalElements: number; content: ProposalForList[] }
        this.setState({
          totalElements: data.totalElements,
          proposals: data.content,
        })
      })
      .catch(error => message.error(error.message))
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    addNewModal: (modalInfo: ModalInfo) => dispatch(addNewModal(modalInfo)),
    closeRecentModal: (numberToClose?: number) => dispatch(closeRecentModal(numberToClose)),
  }
}

export default connect<null, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(ProposalsList)
