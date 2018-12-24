import { buildAppRoute, DictionaryBaseML, ReduxActionType } from '@vitacore/shared-ui'
import { message, Tabs } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { RcFile } from 'antd/lib/upload/interface'
import moment, { Moment } from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AppRolesDict from '../../../Data/AppRolesDict'
import { ActivityPick } from '../../../Entities/Activity'
import { ApplicationItem, ApplicationRole } from '../../../Entities/Application'
import { DocumentAttachment } from '../../../Entities/DocumentAttachment'
import { ClinicPick } from '../../../Entities/Organization'
import { dictionariesNames } from '../../../Infrastructure/dictionariesList'
import { fetchCustomDict } from '../../../Redux/Actions/businessDataStateActions'
import { getHistory } from '../../../Redux/history'
import { State } from '../../../Redux/StateModels'
import { createApiClient, getAppRoute } from '../../../utils'
import { ContentLayout } from '../../shared'
import DocumentAttachments from '../DocumentAttachments'
import ApplicationRequestActivitiesTable from './ApplicationRequestActivitiesTable'
import ApplicationRequestInternalForm from './ApplicationRequestInternalForm'
import { EntityProps } from './EntityProps'
const TabPane = Tabs.TabPane

type InitialValuesProps = {
  id?: string
  number?: string
  descr?: string
  documentDate?: Moment
  clinic?: ClinicPick
  region?: DictionaryBaseML
  role?: ApplicationRole
}

const initialValues = {
  number: '',
  descr: '',
  documentDate: moment(),
  region: undefined,
  role: undefined,
  clinic: undefined,
} as InitialValuesProps

type CompOwnProps = {
  match: any
}

type CompStateProps = {
  regionsDict: DictionaryBaseML[]
  attachmentTypesDict: DictionaryBaseML[]
}

type CompDispatchProps = {
  fetchCustomDict: (dictNames: dictionariesNames[]) => any
}

type CompProps = CompOwnProps & CompStateProps & CompDispatchProps

type CompState = {
  fields: EntityProps
  activities: ActivityPick[]
  valid: boolean
  applicationItems: ApplicationItem[]
  clinicsDict: ClinicPick[]
  attachments: DocumentAttachment[]
  originalAttachments: DocumentAttachment[]
  docType?: string
  docComment?: string
  file?: RcFile
  fetched: boolean
}
class ApplicationRequest extends React.Component<CompProps, CompState> {
  constructor(props: CompProps) {
    super(props)

    this.state = {
      fields: this.convertPropsToEntityDataForState(initialValues) as EntityProps,
      valid: false,
      activities: [],
      applicationItems: [],
      clinicsDict: [],
      attachments: [],
      originalAttachments: [],
      fetched: this.props.match.params.id === 'new',
    }
  }

  public render() {
    const { fields, valid, applicationItems, activities, fetched, clinicsDict } = this.state
    const { match, regionsDict, attachmentTypesDict } = this.props

    let header = 'Заявка на включение в базу данных субъектов здравоохранения'
    if (!activities.length || !fetched || !clinicsDict.length || !regionsDict.length || !attachmentTypesDict.length) {
      return <ContentLayout contentName={header} />
    }

    const id = match.params.id
    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'requests/applications/all',
        breadcrumbName: 'Заявки на включение в базу данных субъектов здравоохранения',
      },
      {
        path: id,
        breadcrumbName: id === 'new' ? 'Новая заявка' : 'Заявка',
      },
    ]

    if (id !== 'new') {
      header = `Заявка на включение в базу данных субъектов здравоохранения #${
        fields.number.value
      } от ${fields.documentDate.value!.format('DD.MM.YYYY')}. Регион: ${fields.region.value!.nameRu}`
    } else {
      header = `Новая заявка на включение в базу данных субъектов здравоохранения`
    }
    return (
      <ContentLayout
        contentName={header}
        breadcrumbRoutes={bcRoutes}
        entity="app"
        disableCommands={id === 'new'}
        showCommands={true}
        onCommandClick={this.onCommandClick}
      >
        <Tabs tabPosition="left" size="small">
          <TabPane tab="Титульная часть" key="1">
            <ApplicationRequestInternalForm
              {...fields}
              valid={valid}
              isNew={id === 'new'}
              hasItems={this.state.applicationItems.length > 0}
              onChange={this.handleFormChange}
              handleSubmit={this.handleSubmit}
              clinicsDict={this.state.clinicsDict}
              regionsDict={this.props.regionsDict}
              onSendToReview={this.onSendToReview}
            />
          </TabPane>
          <TabPane tab="Спецификация" key="2">
            <ApplicationRequestActivitiesTable
              applicationItems={applicationItems}
              allActivities={this.state.activities}
              onApplicationItemsChange={this.onApplicationItemsChange}
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

  public componentDidMount() {
    const apiClient = createApiClient()

    apiClient.fetchDict<{ activity: ActivityPick }>('activityList', undefined, false).then(r => {
      this.setState({
        activities: r.data.content.map(i => i.activity),
      })
    })

    apiClient.fetchDict<ClinicPick>('clinic', undefined, false).then(r => {
      this.setState({
        clinicsDict: r.data.content,
      })
    })

    this.props.fetchCustomDict(['region', 'attachmentType'])

    const id = this.props.match.params.id
    if (id !== 'new') {
      this.getObjectById(id)
    }
  }

  public handleSubmit = (form: WrappedFormUtils) => (e: any) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        const id = this.props.match.params.id

        const dataToSave = {
          ...values,
          id: id === 'new' ? undefined : id,
          documentDate: values['documentDate'].format('DD.MM.YYYY'),
          clinic: {
            id: values['clinic'],
          },
          region: {
            id: values['region'],
          },
          periodYear: {
            search: true,
            year: new Date().getFullYear(),
          },
          role: +values['role'],
          applicationItems: this.state.applicationItems.map(i => ({
            id: i.id,
            activity: {
              id: i.activity.id,
            },
          })),
          documentAttachments: [...this.state.originalAttachments],
        }

        const apiClient = createApiClient()
        apiClient
          .saveApplication(dataToSave)
          .then(resp => {
            const newId = id === 'new' ? resp.data.id : id

            const { attachments, originalAttachments } = this.state
            const filesToDelete = originalAttachments.filter(i => attachments.findIndex(k => k.id === i.id) === -1)
            const filesToUpload = attachments.filter(i => originalAttachments.findIndex(k => k.id === i.id) === -1)

            const fileToDeletePromises = filesToDelete.map(i => apiClient.deleteFile(i.id!))
            const fileToUploadPromises = filesToUpload.map(i => apiClient.uploadFile('app', newId, i))

            Promise.all([...fileToDeletePromises, ...fileToUploadPromises]).then(() => {
              message.success('Заявка сохранена!')
              getHistory().push(buildAppRoute(getAppRoute(), `/requests/applications/${newId}`))
            })
          })
          .catch(error => message.error('Ошибка при сохранении заявки'))
      }
    })
  }

  public componentWillReceiveProps(nextProps: Readonly<CompProps>) {
    const id = nextProps.match.params.id
    if (id !== 'new' && !this.state.fetched) {
      this.getObjectById(id)
      this.setState({
        valid: false,
      })
    }
  }

  public handleFormChange = (changedFields: any) => {
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

  private onCommandClick = (commandId: string, isReport: boolean) => {
    createApiClient().runCommand(commandId, [this.props.match.params.id], isReport)
  }

  private getObjectById = (id: string) => {
    createApiClient()
      .fetchApplicationById(id)
      .then(({ data }) => {
        const application = {
          id: data.id,
          descr: data.descr,
          number: data.number,
          documentDate: moment(data.documentDate, 'DD.MM.YYYY'),
          periodYear: data.periodYear,
          clinic: data.clinic,
          region: data.region,
          role: AppRolesDict.find(i => i.id === `${data.role}`),
        }

        const applicationItems = data.applicationItems
          ? data.applicationItems.map((i: any) => ({
              id: i.id,
              activity: {
                id: i.activity.id,
                name: i.activity.name,
              },
            }))
          : []

        this.setState({
          fields: this.convertPropsToEntityDataForState(application) as EntityProps,
          applicationItems,
          attachments: data.documentAttachments,
          originalAttachments: data.documentAttachments,
          fetched: true,
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

  private onApplicationItemsChange = (applicationItems: ApplicationItem[]) => {
    this.setState({
      applicationItems,
      valid: true,
    })
  }

  private handleSelectValueChanged = (changedFields: any) => {
    const fieldsWithSelect = ['periodYear', 'region', 'clinic', 'role']

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
    let allDictData = this.props[dictPropsName] as DictionaryBaseML[]
    if (!allDictData) {
      allDictData = this.state[dictPropsName] as DictionaryBaseML[]
    }
    if (!allDictData && fieldName === 'role') {
      allDictData = AppRolesDict
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
)(ApplicationRequest)
