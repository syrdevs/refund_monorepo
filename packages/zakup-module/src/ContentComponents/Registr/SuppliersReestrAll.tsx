import { buildAppRoute, ReduxActionType } from '@vitacore/shared-ui'
import { Table } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import Supplier from '../../Entities/Supplier'
import { fetchAllSuppliers } from '../../Redux/Actions/businessDataStateActions'
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
    render: (data: any, originalRow: Supplier, index: number) => {
      return index + 1
    },
  },
  {
    title: '№ региона',
    dataIndex: 'regionNum',
    sorter: (a: Supplier, b: Supplier) => a.regionNum!.localeCompare(b.regionNum!),
  },
  {
    title: 'Наименование субъекта здравоохранения',
    dataIndex: 'name',
    sorter: (a: Supplier, b: Supplier) => a.name!.localeCompare(b.name!),
    width: '55%',
    render: (data: any, originalRow: Supplier) => {
      const isBad = originalRow.isBadSupplier
      const styleObj = isBad ? { color: 'red' } : undefined
      return (
        <Link to={{ pathname: buildAppRoute(getAppRoute(), isBad ? '/reestr/bad' : '/reestr/all') }} style={styleObj}>
          {data}
        </Link>
      )
    },
  },
  {
    title: 'БИК/ИНН',
    dataIndex: 'BIN_INN',
  },
  {
    title: 'Территориальная принадлежность',
    sorter: (a: Supplier, b: Supplier) => a.territory!.localeCompare(b.territory!),
    width: '170px',
    dataIndex: 'territory',
  },
]

type Props = {
  header: string
  suppliers: Supplier[]
  fetchAllSuppliers: () => any
}

class SuppliersReestrAll extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchAllSuppliers()
  }

  public render() {
    const { suppliers, header } = this.props
    const contentNode = suppliers && (
      <Table columns={columns} dataSource={suppliers} rowKey={r => r.name} size="middle" pagination={false} />
    )

    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'reestr/all',
        breadcrumbName: 'Регистр поставщиков',
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
    suppliers: state.businessDataState.suppliers,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchAllSuppliers: () => dispatch(fetchAllSuppliers()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliersReestrAll)
