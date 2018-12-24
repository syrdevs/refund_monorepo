import { buildAppRoute, ReduxActionType } from '@vitacore/shared-ui'
import { Select, Table } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Dispatch } from 'redux'
import createRejectReasonModalInfo from '../../../Components/Modals/ApplicantDocRejectReason'
import CreateYesNoModalInfo from '../../../Components/Modals/YesNoModalInfo'
import adApplicantDecisions from '../../../Data/adApplicantDecisions'
import { NoticeApplicant, NoticeApplicantDoc } from '../../../Entities/NoticeApplicant'
import { ModalInfo } from '../../../Models/ModalInfo'
import { fetchAdApplicants } from '../../../Redux/Actions/businessDataStateActions'
import { addNewModal, closeRecentModal } from '../../../Redux/Actions/infrastructureStateActions'
import { State } from '../../../Redux/StateModels'
import { getStore } from '../../../Redux/store'
import { getAppRoute } from '../../../utils'
import { ContentLayout } from '../../shared'
const Option = Select.Option

type OwnProps = {
  header: string
}

type RouterProps = {
  match: any
  history: any
  location: any
}

type StateProps = {
  adApplicantDocs: NoticeApplicantDoc[]
}

type DispatchProps = {
  fetchAdApplicants: (id: number) => any
  addNewModal: (modalInfo: ModalInfo) => any
  closeRecentModal: (numberToClose?: number) => any
}

type CompState = {
  docsRejectionStatuses: Array<{ docName: string; decision: number }>
}

type Props = OwnProps & RouterProps & StateProps & DispatchProps
class AdApplicantDocs extends React.Component<Props, CompState> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: CompState) {
    if (nextProps.adApplicantDocs.length !== prevState.docsRejectionStatuses.length) {
      return {
        docsRejectionStatuses: AdApplicantDocs.extractDocsRejectionStatuses(nextProps.adApplicantDocs),
      } as Partial<CompState>
    }

    return null
  }

  private static extractDocsRejectionStatuses = (applicantDocs: NoticeApplicantDoc[]) => {
    return applicantDocs.map(i => ({ docName: i.docName, decision: i.decision }))
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      docsRejectionStatuses: AdApplicantDocs.extractDocsRejectionStatuses(props.adApplicantDocs),
    }
  }

  public componentDidMount() {
    if (
      !getStore().getState().businessDataState.adApplicants ||
      getStore().getState().businessDataState.adApplicants!.length === 0
    ) {
      const adId = this.props.match.params.adId
      this.props.fetchAdApplicants(adId)
    }
  }

  public render() {
    const { adApplicantDocs, header } = this.props
    const adId = +this.props.match.params.adId

    const contentNode = adApplicantDocs && (
      <Table
        columns={this.getColumns()}
        dataSource={adApplicantDocs}
        rowKey={r => r.docName}
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
        path: buildAppRoute(getAppRoute(), 'notices'),
        breadcrumbName: 'Объявления',
      },
      {
        path: `${adId}/applicants`,
        breadcrumbName: 'Подавшие заявки субъекты здравоохранения',
      },
      {
        path: '#',
        breadcrumbName: 'Документы по заявке',
      },
    ]

    return (
      <ContentLayout contentName={header} breadcrumbRoutes={bcRoutes}>
        {contentNode}
      </ContentLayout>
    )
  }

  private getColumns = () => {
    const columns: any[] = [
      {
        title: '№ п/п',
        width: '60px',
        dataIndex: 'id',
        key: '#',
        align: 'center',
        render: (data: any, originalRow: NoticeApplicantDoc, index: number) => {
          return index + 1
        },
      },
      {
        title: 'Наименование документа',
        dataIndex: 'docName',
        sorter: (a: NoticeApplicantDoc, b: NoticeApplicantDoc) => a.docName!.localeCompare(b.docName!),
      },
      {
        title: 'Решение',
        dataIndex: 'decision',
        width: '170px',
        render: (data: any, originalRow: NoticeApplicantDoc) => {
          const currentStatus = this.state.docsRejectionStatuses.find(i => i.docName === originalRow.docName)!
          const idx = this.state.docsRejectionStatuses.indexOf(currentStatus)

          return (
            <Select
              labelInValue
              value={{ key: currentStatus.decision.toString(), label: null }}
              onChange={(value: { key: string; label: any }) => {
                if (value.key === '2') {
                  const modalInfo = createRejectReasonModalInfo(
                    'Укажите причину отказа',
                    (rejectText: string) => () => {
                      const yesNoModalInfo = CreateYesNoModalInfo(
                        'Отказ',
                        'Вы действительно хотите отказать?',
                        () => {
                          console.log(rejectText)
                          // CALL SAVE
                          const adId = +this.props.match.params.adId
                          this.props.fetchAdApplicants(adId)
                          this.props.closeRecentModal(2)
                        },
                        undefined,
                        () => this.props.closeRecentModal(),
                        undefined,
                        false
                      )

                      this.props.addNewModal(yesNoModalInfo)
                    },
                    () => {
                      const docsRejectionStatuses = [...this.state.docsRejectionStatuses]
                      docsRejectionStatuses[idx] = {
                        ...docsRejectionStatuses[idx],
                        decision: 1,
                      }

                      this.setState({
                        docsRejectionStatuses,
                      })

                      this.props.closeRecentModal()
                    },
                    undefined,
                    undefined,
                    false
                  )
                  this.props.addNewModal(modalInfo)
                } else {
                  const docsRejectionStatuses = [...this.state.docsRejectionStatuses]
                  docsRejectionStatuses[idx] = {
                    ...docsRejectionStatuses[idx],
                    decision: +value.key,
                  }

                  this.setState({
                    docsRejectionStatuses,
                  })
                }
              }}
            >
              {adApplicantDecisions.map(i => (
                <Option key={i.id.toString()} value={i.id.toString()}>
                  {i.name}
                </Option>
              ))}
            </Select>
          )
        },
      },
      {
        title: 'Причина отказа',
        dataIndex: 'rejectReason',
      },
    ]

    return columns
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps & RouterProps) => {
  const id = +ownProps.match.params.id
  const applicant = state.businessDataState.adApplicants
    ? ({ ...state.businessDataState.adApplicants.find(i => i.id === id) } as NoticeApplicant)
    : null
  const docs = applicant ? applicant.docs : []

  return {
    adApplicantDocs: docs,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchAdApplicants: (id: number) => dispatch(fetchAdApplicants(id)),
    addNewModal: (modalInfo: ModalInfo) => dispatch(addNewModal(modalInfo)),
    closeRecentModal: (numberToClose?: number) => dispatch(closeRecentModal(numberToClose)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdApplicantDocs)
)
