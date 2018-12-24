import { buildAppRoute, ReduxActionType } from '@vitacore/shared-ui'
import { Icon, message, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import CreateYesNoModalInfo from '../../../Components/Modals/YesNoModalInfo'
import AppRolesDict from '../../../Data/AppRolesDict'
import { Application } from '../../../Entities/Application'
import { APPLICATIONS_TABLE_ITEMS_PER_PAGE } from '../../../Infrastructure/localStorageConstants'
import { ModalInfo } from '../../../Models/ModalInfo'
import { addNewModal, closeRecentModal } from '../../../Redux/Actions/infrastructureStateActions'
import { getHistory, NativeHistory } from '../../../Redux/history'
import { createApiClient, getAppRoute } from '../../../utils'
import { ButtonData } from '../../../Vitacore/Controls/Button'
import { ContentLayout } from '../../shared'

type OwnProps = {
  header: string
  match: any
}

type DispatchProps = {
  addNewModal: (modalInfo: ModalInfo) => any
  closeRecentModal: (numberToClose?: number) => any
}

type State = {
  applications: Application[]
  selectedRowKeys: string[]
  currentPage: number
  itemsPerPage: number
  totalElements: number
}

type Props = OwnProps & DispatchProps
class ApplicationsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    let page = +props.match.params.page
    if (!page) {
      page = 1
    }

    const itemsPerPage = localStorage.getItem(APPLICATIONS_TABLE_ITEMS_PER_PAGE)
    this.state = {
      applications: [],
      currentPage: page,
      itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
      totalElements: 0,
      selectedRowKeys: [] as string[],
    }
  }

  public componentDidMount() {
    const { currentPage, itemsPerPage } = this.state
    this.fetchApplications(currentPage, itemsPerPage)
  }

  public render() {
    const { header } = this.props
    const { applications, totalElements } = this.state
    const contentNode = applications && (
      <Table
        rowSelection={{ onChange: this.onRowSelectionChange, selectedRowKeys: this.state.selectedRowKeys }}
        columns={this.getColumns()}
        dataSource={applications}
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
            NativeHistory.pushState(
              null,
              document.title,
              buildAppRoute(getAppRoute(), `/requests/applications/all/${page}`)
            )
            this.setState({
              currentPage: page,
            })
            this.fetchApplications(page, pageSize)
          },
          onShowSizeChange: (current: number, size: number) => {
            localStorage.setItem(APPLICATIONS_TABLE_ITEMS_PER_PAGE, size.toString())
            if (this.state.currentPage !== current) {
              NativeHistory.pushState(
                null,
                document.title,
                buildAppRoute(getAppRoute(), `/requests/applications/all/${current}`)
              )
            }

            this.setState({
              currentPage: current,
              itemsPerPage: size,
            })
            this.fetchApplications(current, size)
          },
        }}
      />
    )

    const buttons = [
      {
        text: 'Создать заявку',
        onClick: this.onNewRequestClick,
      },
    ] as ButtonData[]

    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'requests/applications/all',
        breadcrumbName: 'Заявки на включение в базу данных субъектов здравоохранения',
      },
    ]

    return (
      <ContentLayout
        contentName={header}
        buttons={buttons}
        breadcrumbRoutes={bcRoutes}
        entity="app"
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

  private onDelete = (id: string) => {
    const modalInfo = CreateYesNoModalInfo(
      'Предупреждение',
      'Вы действительно хотите удалить заявку?',
      () => {
        createApiClient()
          .deleteApplication(id)
          .then(() => {
            message.success('Заявка удалена')
            const { currentPage, itemsPerPage } = this.state
            this.fetchApplications(currentPage, itemsPerPage)
          })
          .catch(() => message.error('Ошибка при удалении заявки'))
        this.props.closeRecentModal()
      },
      undefined,
      () => {
        this.props.closeRecentModal()
      },
      undefined,
      false
    )
    this.props.addNewModal(modalInfo)
  }

  private getColumns = () => {
    const columns: Array<ColumnProps<Application>> = [
      {
        title: 'Регион осущ. деятельности',
        dataIndex: 'region.nameRu',
        width: '150px',
        sorter: (a: Application, b: Application) => a.region!.nameRu!.localeCompare(b.region!.nameRu!),
      },
      {
        title: 'Организация',
        dataIndex: 'clinic.shortName',
        width: '250px',
        sorter: (a: Application, b: Application) => a.clinic!.shortName!.localeCompare(b.clinic!.shortName!),
      },
      {
        title: 'Регистрационный номер',
        dataIndex: 'number',
        width: '160px',
        sorter: (a: Application, b: Application) => a.number!.localeCompare(b.number!),
        render: (data: any, originalRow: Application) => {
          return (
            <Link
              to={{ pathname: buildAppRoute(getAppRoute(), `/requests/applications/${originalRow.id!.toString()}`) }}
            >
              {data}
            </Link>
          )
        },
      },
      {
        title: 'Дата подачи заявки',
        width: '150px',
        dataIndex: 'documentDate',
        sorter: (a: Application, b: Application) =>
          moment(a.documentDate!, 'DD.MM.YYYY').diff(moment(b.documentDate!, 'DD.MM.YYYY')),
        defaultSortOrder: 'descend',
      },
      {
        title: 'Роль',
        width: '150px',
        dataIndex: 'role.name',
        sorter: (a: Application, b: Application) => a.role!.name.localeCompare(b.role!.name),
      },
      {
        title: 'Комментарий',
        dataIndex: 'descr',
        width: '120px',
      },
      {
        title: '',
        width: '52px',
        dataIndex: 'id',
        render: (id: any, originalRow: Application) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon
                type="check"
                style={{ color: '#1890ff', cursor: 'pointer', marginRight: '5px' }}
                onClick={() => this.onAccept(id)}
              />
              {/*<Icon*/}
              {/*type="close"*/}
              {/*style={{ color: '#1890ff', cursor: 'pointer', marginRight: '5px' }}*/}
              {/*onClick={() => this.onDecline(id)}*/}
              {/*/>*/}
              <Icon type="delete" style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this.onDelete(id)} />
            </div>
          )
        },
      },
    ]

    return columns
  }

  private onAccept = (id: string) => {
    const modalInfo = CreateYesNoModalInfo(
      'Предупреждение',
      'Вы действительно хотите принять заявку?',
      () => {
        createApiClient()
          .acceptApplication(id)
          .then(() => message.success('Заявка принята'))
          .catch(() => message.error('Ошибка при принятии заявки'))
        this.props.closeRecentModal()
      },
      undefined,
      () => {
        this.props.closeRecentModal()
      },
      undefined,
      false
    )
    this.props.addNewModal(modalInfo)
  }

  // private onDecline = (id: string) => {
  //   const modalInfo = createRejectReasonModalInfo(
  //     'Укажите причину отклонения',
  //     (rejectText: string) => () => {
  //       createApiClient()
  //         .declineApplication(id, rejectText)
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

  private fetchApplications = (page: number, pageSize: number) => {
    createApiClient()
      .fetchApplications(page - 1, pageSize)
      .then(resp => {
        const data = resp.data as { totalElements: number; content: Application[] }
        this.setState({
          totalElements: data.totalElements,
          applications: (data.content as any[]).map(i => ({
            ...i,
            role: AppRolesDict.find(k => k.id === `${i.role}`),
          })),
        })
      })
      .catch(error => message.error(error.message))
  }

  private onNewRequestClick = () => {
    getHistory().push(buildAppRoute(getAppRoute(), '/requests/applications/new'))
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
)(ApplicationsList)
