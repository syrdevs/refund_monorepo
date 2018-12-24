import { buildAppRoute, ReduxActionType } from '@vitacore/shared-ui'
import { Icon, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { Commission } from '../../Entities/Commission'
import { fetchCommissions } from '../../Redux/Actions/businessDataStateActions'
import { getHistory } from '../../Redux/history'
import { State } from '../../Redux/StateModels'
import { getAppRoute } from '../../utils'
import { ButtonData } from '../../Vitacore/Controls/Button'
import { ContentLayout } from '../shared'

const columns: Array<ColumnProps<Commission>> = [
  {
    title: '№ п/п',
    width: '60px',
    dataIndex: 'id',
    key: '#',
    align: 'center',
    render: (data: any, originalRow: Commission, index: number) => {
      return index + 1
    },
  },
  {
    title: 'Регион',
    dataIndex: 'region.nameRu',
    sorter: (a: Commission, b: Commission) => a.region!.nameRu!.localeCompare(b.region!.nameRu!),
    render: (data: any, originalRow: Commission) => {
      return (
        <Link to={{ pathname: buildAppRoute(getAppRoute(), `/commissions/${originalRow.id}/members`) }}>{data}</Link>
      )
    },
  },
  {
    title: 'Дата начала действия комиссии',
    width: '270px',
    dataIndex: 'dateBegin',
    sorter: (a: Commission, b: Commission) => moment(a.dateBegin, 'DD.MM.YYYY').diff(moment(b.dateBegin, 'DD.MM.YYYY')),
    defaultSortOrder: 'descend',
  },
  {
    title: '',
    width: '30px',
    dataIndex: 'id',
    align: 'center',
    render: (id: any, originalRow: Commission) => {
      return (
        <Link to={buildAppRoute(getAppRoute(), `/commissions/${id}`)}>
          <Icon type="edit" />
        </Link>
      )
    },
  },
]

type Props = {
  commissions: Commission[] | null
  header: string
  fetchCommissions: () => any
}

class CommissionsList extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchCommissions()
  }

  public render() {
    const { commissions, header } = this.props
    const contentNode = commissions && (
      <Table
        columns={columns}
        dataSource={commissions}
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
    ]

    const buttons = [
      {
        text: 'Создать комиссию',
        onClick: () => getHistory().push(buildAppRoute(getAppRoute(), '/commissions/new')),
      },
    ] as ButtonData[]

    return (
      <ContentLayout contentName={header} breadcrumbRoutes={bcRoutes} buttons={buttons}>
        {contentNode}
      </ContentLayout>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    commissions: state.businessDataState.commissionsData.commissions,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchCommissions: () => dispatch(fetchCommissions()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionsList)
