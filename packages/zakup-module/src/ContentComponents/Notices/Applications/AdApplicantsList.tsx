import { buildAppRoute, ReduxActionType } from '@vitacore/shared-ui'
import { Table } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import { NoticeApplicant } from '../../../Entities/NoticeApplicant'
import { fetchAdApplicants } from '../../../Redux/Actions/businessDataStateActions'
import { getHistory } from '../../../Redux/history'
import { State } from '../../../Redux/StateModels'
import { getAppRoute } from '../../../utils'
import { ContentLayout } from '../../shared'

const getColumns = (adId: number) => {
  const columns: any[] = [
    {
      title: '№ п/п',
      width: '60px',
      dataIndex: 'id',
      key: '#',
      align: 'center',
      render: (data: any, originalRow: NoticeApplicant, index: number) => {
        return index + 1
      },
    },
    {
      title: 'Наименование субъекта здравоохранения',
      dataIndex: 'name',
      sorter: (a: NoticeApplicant, b: NoticeApplicant) => a.name!.localeCompare(b.name!),
      width: '70%',
    },
    {
      title: 'Представленные документы',
      dataIndex: 'id',
      render: (data: any, originalRow: NoticeApplicant) => {
        return (
          <Link
            to={{
              pathname: buildAppRoute(getAppRoute(), `/notices/${adId}/applicants/${originalRow.id!.toString()}`),
            }}
          >
            Перечень документов
          </Link>
        )
      },
    },
  ]

  return columns
}

type Props = {
  adApplicants: NoticeApplicant[] | null
  header: string
  fetchAdApplicants: (id: number) => any
  match: any
  history: any
  location: any
}

class AdApplicantsList extends React.Component<Props> {
  public componentDidMount() {
    const id = this.props.match.params.id
    if (!id) {
      getHistory().push(buildAppRoute(getAppRoute(), '/notices/all/1'))
    } else {
      this.props.fetchAdApplicants(id)
    }
  }

  public render() {
    const { adApplicants, header } = this.props
    const adId = this.props.match.params.id
    const contentNode = adApplicants && (
      <Table
        columns={getColumns(adId)}
        dataSource={adApplicants}
        rowKey={r => r.id.toString()}
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
        path: 'notices',
        breadcrumbName: 'Все объявления',
      },
      {
        path: adId,
        breadcrumbName: 'Объявление',
      },
      {
        path: 'applicants',
        breadcrumbName: 'Подавшие заявки',
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
    adApplicants: state.businessDataState.adApplicants,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchAdApplicants: (id: number) => dispatch(fetchAdApplicants(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdApplicantsList))
