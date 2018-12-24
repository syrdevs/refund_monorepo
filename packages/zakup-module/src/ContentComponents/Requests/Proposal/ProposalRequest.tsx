import { buildAppRoute, DictionaryBaseML, Identifiable, ReduxActionType } from '@vitacore/shared-ui'
import { message, Tabs } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { RcFile } from 'antd/lib/upload/interface'
import moment, { Moment } from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Activity } from '../../../Entities/Activity'
import { DocumentAttachment } from '../../../Entities/DocumentAttachment'
import { ClinicPick } from '../../../Entities/Organization'
import { PeriodYearPick } from '../../../Entities/PeriodYear'
import { ProposalItem } from '../../../Entities/Proposal'
import { dictionariesNames } from '../../../Infrastructure/dictionariesList'
import { fetchCustomDict } from '../../../Redux/Actions/businessDataStateActions'
import { getHistory } from '../../../Redux/history'
import { State } from '../../../Redux/StateModels'
import { createApiClient, getAppRoute } from '../../../utils'
import { ContentLayout } from '../../shared'
import DocumentAttachments from '../DocumentAttachments'
import { EntityProps } from './EntityProps'
import ProposalRequestActivitiesTable from './ProposalRequestActivitiesTable'
import ProposalRequestInternalForm from './ProposalRequestInternalForm'
const TabPane = Tabs.TabPane

type InitialValuesProps = {
  number?: string
  descr?: string
  documentDate?: Moment
  periodYear?: PeriodYearPick
  clinic?: ClinicPick
  region?: DictionaryBaseML
  proposalType?: DictionaryBaseML
}

const initialValues = {
  number: '',
  descr: '',
  documentDate: moment(),
  periodYear: undefined,
  clinic: undefined,
  region: undefined,
  proposalType: undefined,
} as InitialValuesProps

type CompOwnProps = {
  id: string
}

type CompStateProps = {
  regionsDict: DictionaryBaseML[]
  proposalTypesDict: DictionaryBaseML[]
  attachmentTypesDict: DictionaryBaseML[]
}

type CompDispatchProps = {
  fetchCustomDict: (dictNames: dictionariesNames[]) => any
}

type CompProps = CompOwnProps & CompStateProps & CompDispatchProps

type CompState = {
  fields: EntityProps
  noticeId?: string
  regionId?: string
  periodYearId?: string
  activities: Activity[]
  periodYearsDict: PeriodYearPick[]
  clinicsDict: ClinicPick[]
  valid: boolean
  proposalItems: ProposalItem[]
  attachments: DocumentAttachment[]
  originalAttachments: DocumentAttachment[]
  docType?: string
  docComment?: string
  file?: RcFile
  fetched: boolean
  notice?: {
    name: string
  }
}

class ProposalRequest extends React.Component<CompProps, CompState> {
  constructor(props: CompProps) {
    super(props)

    const thisState = {
      fields: this.convertPropsToEntityDataForState(initialValues) as EntityProps,
      valid: false,
      activities: [],
      periodYearsDict: [],
      clinicsDict: [],
      proposalItems: [],
      attachments: [],
      originalAttachments: [],
      fetched: this.props.id === 'new',
      notice: undefined,
    }

    if (props.id === 'new') {
      const noticeId = localStorage.getItem('noticeId')
      const regionId = localStorage.getItem('regionId')
      const periodYearId = localStorage.getItem('periodYearId')
      localStorage.removeItem('noticeId')
      localStorage.removeItem('regionId')
      localStorage.removeItem('periodYearId')

      if (noticeId && regionId) {
        thisState['noticeId'] = noticeId
        thisState['regionId'] = regionId
        thisState['periodYearId'] = periodYearId
      } else {
        getHistory().push(buildAppRoute(getAppRoute(), '/notices/all'))
      }
    }

    this.state = thisState
  }

  public componentDidMount() {
    const apiClient = createApiClient()

    apiClient.fetchDict<Activity>('activity', undefined, false).then(r => {
      this.setState({
        activities: r.data.content.map(i => ({
          id: i.id,
          name: i.name,
          code: i.code,
          activityMeasureUnits: i.activityMeasureUnits.map((k: any) => ({
            id: k.measureUnit.id,
            nameRu: k.measureUnit.nameRu,
            nameKz: k.measureUnit.nameKz,
            code: k.measureUnit.code,
          })),
        })) as Activity[],
      })
    })

    apiClient.fetchDict<PeriodYearPick>('periodYear', undefined, false).then(r => {
      this.setState({
        periodYearsDict: r.data.content,
      })
    })

    apiClient.fetchDict<ClinicPick>('clinic', undefined, false).then(r => {
      this.setState({
        clinicsDict: r.data.content,
      })
    })

    this.props.fetchCustomDict(['measureUnit', 'region', 'proposalType', 'attachmentType'])

    const id = this.props.id
    if (id !== 'new') {
      this.getObjectById(id)
    }
  }

  public render() {
    const { fetched, fields, valid, periodYearsDict, activities, clinicsDict, notice } = this.state
    const { regionsDict, proposalTypesDict, attachmentTypesDict } = this.props

    let header = 'Заявка на объемы'
    if (
      !attachmentTypesDict.length ||
      !periodYearsDict.length ||
      !activities.length ||
      !regionsDict.length ||
      !proposalTypesDict.length ||
      !clinicsDict.length ||
      !fetched
    ) {
      return <ContentLayout contentName={header} />
    }

    const id = this.props.id
    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'requests/proposals/all',
        breadcrumbName: 'Заявки на объемы',
      },
      {
        path: id,
        breadcrumbName: id === 'new' ? 'Новая заявка' : 'Заявка',
      },
    ]

    if (id !== 'new') {
      const noticeInfo = notice ? ` Подана на ${notice.name}.` : ''
      header = `Заявка на объемы #${fields.number.value} от ${fields.documentDate.value!.format(
        'DD.MM.YYYY'
      )}. Регион: ${fields.region.value!.nameRu}.${noticeInfo}`
    } else {
      header = 'Новая заявка на объемы'
    }
    return (
      <ContentLayout
        contentName={header}
        breadcrumbRoutes={bcRoutes}
        entity="proposal"
        disableCommands={id === 'new'}
        showCommands={true}
        onCommandClick={this.onCommandClick}
      >
        <Tabs tabPosition="left" size="small">
          <TabPane tab="Титульная часть" key="1">
            <ProposalRequestInternalForm
              {...fields}
              valid={valid}
              isNew={id === 'new'}
              regionId={this.state.regionId}
              periodYearId={this.state.periodYearId}
              hasItems={this.state.proposalItems.length > 0}
              onChange={this.handleFormChange}
              handleSubmit={this.handleSubmit}
              periodYearsDict={this.state.periodYearsDict}
              clinicsDict={this.state.clinicsDict}
              regionsDict={this.props.regionsDict}
              proposalTypesDict={this.props.proposalTypesDict}
              onSendToReview={this.onSendToReview}
            />
          </TabPane>
          <TabPane tab="Спецификация" key="2">
            <ProposalRequestActivitiesTable
              allActivities={this.state.activities}
              proposalItems={this.state.proposalItems}
              onProposalItemValueChange={this.onProposalItemValueChange}
            />
          </TabPane>
          <TabPane tab="Файлы" key="3">
            <DocumentAttachments
              docs={this.state.attachments}
              docType={this.state.docType}
              docComment={this.state.docComment}
              file={this.state.file}
              attachmentTypesDict={this.props.attachmentTypesDict}
              onChange={this.onDocumentAttachmentsChange}
              onUpload={this.onUploadFile}
              onDelete={this.onDelete}
              clearCurrentUploadInfo={this.clearCurrentUploadInfo}
            />
          </TabPane>
        </Tabs>
      </ContentLayout>
    )
  }

  public componentWillReceiveProps(nextProps: Readonly<CompProps>) {
    const id = nextProps.id
    if (id !== 'new') {
      this.getObjectById(id)
      this.setState({
        valid: false,
      })
    }
  }

  private onCommandClick = (commandId: string, isReport: boolean) => {
    createApiClient().runCommand(commandId, [this.props.id], isReport)
  }

  private getObjectById = (id: string) => {
    createApiClient()
      .fetchProposalById(id)
      .then(({ data }) => {
        const proposal = {
          id: data.id,
          descr: data.descr,
          number: data.number,
          documentDate: moment(data.documentDate, 'DD.MM.YYYY'),
          periodYear: data.periodYear,
          clinic: data.clinic,
          proposalType: data.proposalType,
          region: data.region,
        }

        const proposalItems = data.proposalItems
          ? data.proposalItems.map((i: any) => ({
              id: i.id,
              activity: {
                id: i.activity.id,
                name: i.activity.name,
              },
              proposalItemValues: i.proposalItemValues,
            }))
          : []

        this.setState({
          fields: this.convertPropsToEntityDataForState(proposal) as EntityProps,
          proposalItems,
          attachments: data.documentAttachments,
          originalAttachments: data.documentAttachments,
          fetched: true,
          notice: {
            name: data.notice.noticeType.nameRu,
          },
        })
      })
  }

  private onDelete = (doc: DocumentAttachment) => {
    const newDocs = this.state.attachments.filter(i => i.attachmentType!.id !== doc.attachmentType!.id)
    this.setState({
      attachments: newDocs,
      valid: true,
    })
  }

  private clearCurrentUploadInfo = () => {
    this.setState({
      docComment: undefined,
      docType: undefined,
      file: undefined,
    })
  }

  private onUploadFile = () => {
    const { file, docType, docComment } = this.state

    const newAttachments = [
      ...this.state.attachments,
      {
        name: file!.name,
        filename: file!.name,
        fileDescription: docComment,
        attachmentType: {
          ...this.props.attachmentTypesDict.find(i => i.id === docType)!,
        },
        file,
      },
    ] as DocumentAttachment[]

    this.setState({
      attachments: newAttachments,
      valid: true,
    })
  }

  private onDocumentAttachmentsChange = (docType?: string, docComment?: string, file?: RcFile) => {
    this.setState({
      docType,
      docComment,
      file,
    })
  }

  private onSendToReview = () => {
    // doSend
    message.success('Заявка отправлена на рассмотрение')
  }

  private onProposalItemValueChange = (updatedProposalItems: ProposalItem[]) => {
    this.setState({
      proposalItems: updatedProposalItems,
      valid: true,
    })
  }

  private handleSubmit = (form: WrappedFormUtils) => (e: any) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        const id = this.props.id

        const dataToSave = {
          ...values,
          id: id === 'new' ? undefined : id,
          documentDate: values['documentDate'].format('DD.MM.YYYY'),
          periodYear: {
            id: values['periodYear'],
          },
          clinic: {
            id: values['clinic'],
          },
          region: {
            id: values['region'],
          },
          proposalType: {
            id: values['proposalType'],
          },
          documentAttachments: [...this.state.originalAttachments],
          proposalItems: this.state.proposalItems.map(i => ({
            id: i.id,
            activity: {
              id: i.activity.id,
            },
            proposalItemValues: i.proposalItemValues
              ? i.proposalItemValues.map(k => ({
                  id: k.id,
                  measureUnit: {
                    id: k.measureUnit.id,
                  },
                  value: k.value,
                }))
              : undefined,
          })),
        }

        if (this.state.noticeId) {
          dataToSave['notice'] = {
            id: this.state.noticeId,
          }
        }

        if (this.state.regionId) {
          dataToSave['region'] = {
            id: this.state.regionId,
          }
        }

        if (this.state.periodYearId) {
          dataToSave['periodYear'] = {
            id: this.state.periodYearId,
          }
        }

        const apiClient = createApiClient()

        apiClient
          .saveProposal(dataToSave)
          .then(resp => {
            const newId = id === 'new' ? resp.data.id : id

            const { attachments, originalAttachments } = this.state
            const filesToDelete = originalAttachments.filter(i => attachments.findIndex(k => k.id === i.id) === -1)
            const filesToUpload = attachments.filter(i => originalAttachments.findIndex(k => k.id === i.id) === -1)

            const fileToDeletePromises = filesToDelete.map(i => apiClient.deleteFile(i.id!))
            const fileToUploadPromises = filesToUpload.map(i => apiClient.uploadFile('proposal', newId, i))

            Promise.all([...fileToDeletePromises, ...fileToUploadPromises]).then(() => {
              message.success('Заявка сохранена!')
              getHistory().push(buildAppRoute(getAppRoute(), `/requests/proposals/${newId}`))
            })
          })
          .catch(error => message.error('Ошибка при сохранении заявки'))
      }
    })
  }

  private handleFormChange = (changedFields: any) => {
    const data = this.handleSelectValueChanged(changedFields)
    let isValid = true
    for (const field in data) {
      if (data.hasOwnProperty(field)) {
        if (data[field].errors && Array.isArray(data[field].errors) && data[field].errors.length > 0) {
          isValid = false
          break
        }
      }
    }

    this.setState(({ fields }) => ({
      fields: { ...fields, ...this.handleSelectValueChanged(changedFields) },
      valid: isValid,
    }))
  }

  private handleSelectValueChanged = (changedFields: any) => {
    const fieldsWithSelect = ['periodYear', 'clinic', 'region', 'proposalType']

    const rightFieldsData = { ...changedFields }
    for (const f of fieldsWithSelect) {
      if (changedFields.hasOwnProperty(f)) {
        rightFieldsData[f] = {
          ...changedFields[f],
          value: this.extractDictionaryValue(f, changedFields[f].value),
        }
      }
    }

    return rightFieldsData
  }

  private extractDictionaryValue = (fieldName: string, value: string | string[], multi = false) => {
    const dictPropsName = `${fieldName}${multi ? '' : 's'}Dict`
    let allDictData = this.props[dictPropsName] as Identifiable[]
    if (!allDictData) {
      allDictData = this.state[dictPropsName] as Identifiable[]
    }

    if (!value) {
      return multi ? [] : undefined
    }

    if (multi) {
      return allDictData.filter(i => (value as string[]).indexOf(i.id as string) > -1)
    }

    const data = allDictData.filter(i => i.id === (value as string))
    return data.length ? data[0] : undefined
  }

  private convertPropsToEntityDataForState(values: InitialValuesProps) {
    return Object.keys(values).reduce((prev, curr) => ({ ...prev, [curr]: { value: values[curr] } }), {})
  }
}

const mapStateToProps = (state: State) => {
  return {
    regionsDict: state.dictionariesDataState.region as DictionaryBaseML[],
    proposalTypesDict: state.dictionariesDataState.proposalType as DictionaryBaseML[],
    attachmentTypesDict: state.dictionariesDataState.attachmentType as DictionaryBaseML[],
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchCustomDict: (dictNames: dictionariesNames[]) => dispatch(fetchCustomDict(dictNames)),
  }
}

export default connect<CompStateProps, CompDispatchProps, CompOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ProposalRequest)
