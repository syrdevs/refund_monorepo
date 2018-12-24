import { buildAppRoute } from '@vitacore/shared-ui'
import { message, Table } from 'antd'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { ProtocolForList } from '../../Entities/Protocol'
import { PROTOCOLS_TABLE_ITEMS_PER_PAGE } from '../../Infrastructure/localStorageConstants'
import { NativeHistory } from '../../Redux/history'
import { createApiClient, getAppRoute } from '../../utils'
import { ContentLayout } from '../shared'

const columns: any[] = [
  {
    title: 'Плановый период',
    dataIndex: 'periodYear.year',
    width: '200px',
    sorter: (a: ProtocolForList, b: ProtocolForList) => a.periodYear!.year! - b.periodYear!.year!,
  },
  {
    title: 'Регион',
    dataIndex: 'region.nameRu',
    sorter: (a: ProtocolForList, b: ProtocolForList) => a.region!.nameRu!.localeCompare(b.region!.nameRu!),
  },
  {
    title: 'Регистрационный номер',
    dataIndex: 'number',
    width: '220px',
    sorter: (a: ProtocolForList, b: ProtocolForList) => a.number!.localeCompare(b.number!),
    render: (data: any, originalRow: ProtocolForList) => {
      return (
        <Link to={{ pathname: buildAppRoute(getAppRoute(), `/protocols/${originalRow.id!.toString()}`) }}>{data}</Link>
      )
    },
  },
  {
    title: 'Тип',
    width: '150px',
    dataIndex: 'planProtocolType.nameRu',
    sorter: (a: ProtocolForList, b: ProtocolForList) =>
      a.planProtocolType!.nameRu!.localeCompare(b.planProtocolType!.nameRu!),
  },
  {
    title: 'Дата',
    width: '120px',
    dataIndex: 'documentDate',
    sorter: (a: ProtocolForList, b: ProtocolForList) =>
      +moment(a.documentDate!, 'DD.MM.YYYY') - +moment(b.documentDate!, 'DD.MM.YYYY'),
  },
]

type Props = {
  header: string
  match: any
}

type State = {
  protocols: ProtocolForList[]
  currentPage: number
  itemsPerPage: number
  totalElements: number
}

class ProtocolsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    let page = +props.match.params.page
    if (!page) {
      page = 1
    }

    const itemsPerPage = localStorage.getItem(PROTOCOLS_TABLE_ITEMS_PER_PAGE)
    this.state = {
      protocols: [],
      currentPage: page,
      itemsPerPage: (itemsPerPage && +itemsPerPage) || 10,
      totalElements: 0,
    }
  }

  public componentDidMount() {
    const { currentPage, itemsPerPage } = this.state
    this.fetchProtocols(currentPage, itemsPerPage)
  }

  public render() {
    const { header } = this.props
    const { protocols, totalElements } = this.state
    const contentNode = protocols && (
      <Table
        columns={columns}
        dataSource={protocols}
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
            NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), `/protocols/all/${page}`))
            this.setState({
              currentPage: page,
            })
            this.fetchProtocols(page, pageSize)
          },
          onShowSizeChange: (current: number, size: number) => {
            localStorage.setItem(PROTOCOLS_TABLE_ITEMS_PER_PAGE, size.toString())
            if (this.state.currentPage !== current) {
              NativeHistory.pushState(null, document.title, buildAppRoute(getAppRoute(), `/protocols/all/${current}`))
            }

            this.setState({
              currentPage: current,
              itemsPerPage: size,
            })
            this.fetchProtocols(current, size)
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
        path: 'procotols/all/1',
        breadcrumbName: 'Все протоколы',
      },
    ]

    return (
      <ContentLayout contentName={header} breadcrumbRoutes={bcRoutes}>
        {contentNode}
      </ContentLayout>
    )
  }

  private fetchProtocols = (page: number, pageSize: number) => {
    createApiClient()
      .fetchProtocols(page - 1, pageSize)
      .then(resp => {
        const data = resp.data as { totalElements: number; content: ProtocolForList[] }
        this.setState({
          totalElements: data.totalElements,
          protocols: data.content,
        })
      })
      .catch(error => message.error(error.message))
  }
}

export default ProtocolsList
