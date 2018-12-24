import { buildAppRoute, ReduxActionType } from '@vitacore/shared-ui'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import { Notice } from '../../Entities/Notice'
import { ZAKUP_ADS_TABLE_ITEMS_PER_PAGE } from '../../Infrastructure/localStorageConstants'
import { fetchNotices } from '../../Redux/Actions/businessDataStateActions'
import { NativeHistory } from '../../Redux/history'
import { State } from '../../Redux/StateModels'
import { createApiClient, getAppRoute } from '../../utils'
import { ButtonData } from '../../Vitacore/Controls/Button'
import { ContentLayout } from '../shared'

type Props = {
  notices: Notice[] | null
  totalElements: number
  header: string
  fetchNotices: (page: number, pageSize: number) => any
  match: any
  history: any
  location: any
}

type CompState = {
  currentPage: number
  itemsPerPage: number
  selectedRowKeys: string[]
}

class NoticesList extends React.Component<Props, CompState> {
  constructor(props: Props) {
    super(props)

    let page = +props.match.params.page
    if (!page) {
      page = 1
    }

    const itemsPerPage = localStorage.getItem(ZAKUP_ADS_TABLE_ITEMS_PER_PAGE)
    this.state = {
      currentPage: page,
      itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
      selectedRowKeys: [] as string[],
    }
  }

  public componentDidMount() {
    const { currentPage, itemsPerPage } = this.state

    this.props.fetchNotices(currentPage, itemsPerPage)
  }

  public render() {
    const { totalElements, notices, header } = this.props
    const contentNode = notices && (
      <Table
        rowSelection={{ onChange: this.onRowSelectionChange, selectedRowKeys: this.state.selectedRowKeys }}
        columns={this.getColumns()}
        dataSource={notices}
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
            NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), `/notices/all/${page}`))
            this.setState({
              currentPage: page,
            })
            this.props.fetchNotices(page, pageSize)
          },
          onShowSizeChange: (current: number, size: number) => {
            localStorage.setItem(ZAKUP_ADS_TABLE_ITEMS_PER_PAGE, size.toString())
            if (this.state.currentPage !== current) {
              NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), `/notices/all/${current}`))
            }

            this.setState({
              currentPage: current,
              itemsPerPage: size,
            })
            this.props.fetchNotices(current, size)
          },
        }}
      />
    )

    const buttons = [
      {
        text: 'Создать объявление',
        onClick: this.onNewNoticeClick,
      },
    ] as ButtonData[]

    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'notices/all/1',
        breadcrumbName: 'Все объявления',
      },
    ]

    return (
      <ContentLayout
        entity="notice"
        disableCommands={this.state.selectedRowKeys.length === 0}
        showCommands={true}
        onCommandClick={this.onCommandClick}
        contentName={header}
        buttons={buttons}
        breadcrumbRoutes={bcRoutes}
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
    return [
      {
        title: 'Наименование объявления',
        dataIndex: 'noticeType.nameRu',
        sorter: (a: Notice, b: Notice) => a.noticeType!.code!.localeCompare(b.noticeType!.code!),
        render: (data: any, originalRow: Notice) => {
          return (
            <Link to={{ pathname: buildAppRoute(getAppRoute(), `/notices/${originalRow.id!.toString()}`) }}>
              {data}
            </Link>
          )
        },
      },
      {
        title: 'Регион осущ. деятельности',
        sorter: (a: Notice, b: Notice) => a.region!.nameRu!.localeCompare(b.region!.nameRu!),
        width: '175px',
        dataIndex: 'region.nameRu',
      },
      {
        title: 'Плановый период',
        sorter: (a: Notice, b: Notice) => a.periodYear!.year!.localeCompare(b.periodYear!.year!),
        width: '120px',
        dataIndex: 'periodYear.year',
      },
      {
        title: 'Поданные заявки',
        dataIndex: 'numberOfApplications',
        width: '110px',
        sorter: (a: Notice, b: Notice) => a.numberOfApplications! - b.numberOfApplications!,
        render: (data: any, originalRow: Notice) => {
          return (
            <Link to={{ pathname: buildAppRoute(getAppRoute(), `/notices/${originalRow.id!.toString()}/applicants`) }}>
              {data}
            </Link>
          )
        },
      },
      {
        title: 'Дата начала приема заявок',
        dataIndex: 'dateBegin',
        width: '150px',
        sorter: (a: Notice, b: Notice) => moment(a.dateBegin, 'DD.MM.YYYY').diff(moment(b.dateBegin, 'DD.MM.YYYY')),
        defaultSortOrder: 'ascend',
      },
      {
        title: 'Дата окончания приема заявок',
        dataIndex: 'dateEnd',
        width: '150px',
        sorter: (a: Notice, b: Notice) => moment(a.dateEnd, 'DD.MM.YYYY').diff(moment(b.dateEnd, 'DD.MM.YYYY')),
      },
      {
        title: 'Статус',
        sorter: (a: Notice, b: Notice) => a.status!.localeCompare(b.status!),
        width: '100px',
        dataIndex: 'status',
      },
    ] as Array<ColumnProps<Notice>>
  }

  private onNewNoticeClick = () => {
    this.props.history.push(buildAppRoute(getAppRoute(), '/notices/new'))
  }
}

const mapStateToProps = (state: State) => {
  return {
    notices: state.businessDataState.noticeData.notices,
    totalElements: state.businessDataState.noticeData.total,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchNotices: (page: number, pageSize: number, onlyMy: boolean) =>
      dispatch(fetchNotices(page - 1, pageSize, onlyMy)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NoticesList))
