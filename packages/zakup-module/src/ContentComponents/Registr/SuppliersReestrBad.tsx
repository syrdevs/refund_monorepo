import { buildAppRoute, ReduxActionType } from '@vitacore/shared-ui'
import { Table } from 'antd'
import { Moment } from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { BadSupplier } from '../../Entities/Supplier'
import { fetchBadSuppliers } from '../../Redux/Actions/businessDataStateActions'
import { State } from '../../Redux/StateModels'
import { getAppRoute } from '../../utils'
import { ContentLayout } from '../shared'

const columns: any[] = [
  {
    title: '№ п/п',
    width: '60px',
    dataIndex: 'name',
    key: '#',
    align: 'center',
    render: (data: any, originalRow: BadSupplier, index: number) => {
      return index + 1
    },
  },
  {
    title: '№ региона',
    dataIndex: 'regionNum',
    width: '115px',
    sorter: (a: BadSupplier, b: BadSupplier) => a.regionNum!.localeCompare(b.regionNum!),
  },
  {
    title: 'Наименование субъекта здравоохранения',
    dataIndex: 'name',
    sorter: (a: BadSupplier, b: BadSupplier) => a.name!.localeCompare(b.name!),
    width: '40%',
    render: (data: any) => {
      return <Link to={{ pathname: buildAppRoute(getAppRoute(), '/reestr') }}>{data}</Link>
    },
  },
  {
    title: 'Основание',
    dataIndex: 'reasonLink',
    render: (data: any, originalRow: BadSupplier) => {
      return <Link to={{ pathname: buildAppRoute(getAppRoute(), data) }}>{originalRow.reasonLinkText}</Link>
    },
  },
  {
    title: 'Дата включения',
    sorter: (a: BadSupplier, b: BadSupplier) => +a.includedFrom - +b.includedFrom,
    width: '160px',
    dataIndex: 'includedFrom',
    render: (data: Moment) => {
      return data.format('DD.MM.YYYY')
    },
  },
  {
    title: 'Дата исключения',
    sorter: (a: BadSupplier, b: BadSupplier) => {
      if (!a.includedTo && !b.includedTo) {
        return 0
      }

      if (!a.includedTo && b.includedTo) {
        return -1
      }

      if (a.includedTo && !b.includedTo) {
        return 1
      }

      return +a.includedTo! - +b.includedTo!
    },
    width: '160px',
    dataIndex: 'includedTo',
    render: (data?: Moment) => {
      if (!data) {
        return ''
      }
      return data.format('DD.MM.YYYY')
    },
  },
]

type Props = {
  header: string
  badSuppliers: BadSupplier[]
  fetchBadSuppliers: () => any
}

class SuppliersReestrBad extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchBadSuppliers()
  }

  public render() {
    const { badSuppliers, header } = this.props
    const contentNode = badSuppliers && (
      <Table columns={columns} dataSource={badSuppliers} rowKey={r => r.name} size="middle" pagination={false} />
    )

    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'reestr/bad',
        breadcrumbName: 'Регистр недобросоветсных участников',
      },
    ]

    return (
      <ContentLayout contentName={header} breadcrumbRoutes={bcRoutes}>
        {contentNode}
      </ContentLayout>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    badSuppliers: state.businessDataState.badSuppliers,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchBadSuppliers: () => dispatch(fetchBadSuppliers()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliersReestrBad)
