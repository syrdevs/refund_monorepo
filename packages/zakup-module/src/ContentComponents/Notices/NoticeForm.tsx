import { buildAppRoute, DictionaryBaseML, Identifiable, ReduxActionType } from '@vitacore/shared-ui'
import { Button, DatePicker, Form, message, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as _ from 'lodash'
import moment, { Moment } from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import CreateOkModalInfo from '../../Components/Modals/OkModalInfo'
import { PeriodYearPick } from '../../Entities/PeriodYear'
import { dispatchClearFetchEntityStatus, fetchSingleNotice } from '../../Redux/Actions/businessDataStateActions'
import { dispatchAddNewModal, dispatchCloseRecentModal } from '../../Redux/Actions/infrastructureStateActions'
import { FETCH_ENTITY_STATUS, SET_NEW_NOTICE_REQUESTED } from '../../Redux/Constants/businessDataStateConstants'
import { getHistory } from '../../Redux/history'
import { State } from '../../Redux/StateModels'
import { createApiClient, getAppRoute, isDisabledPreviousDate, isDisabledPreviousTime } from '../../utils'
import { CommonFormItemLayout, ContentLayout } from '../shared'
const FormItem = Form.Item
const Option = Select.Option

type EntityProps = {
  id: { value?: string }
  name: { value?: DictionaryBaseML }
  region: { value?: DictionaryBaseML }
  periodYear: { value?: PeriodYearPick }
  dateBegin: { value?: Date }
  dateEnd: { value?: Date }
  noticeMedicalTypes: { value: Array<{ id?: string; medicalType: DictionaryBaseML }> }
  noticeMedicalForms: { value: Array<{ id?: string; medicalForm: DictionaryBaseML }> }
  numberOfApplications: { value?: number }
  status: { value?: string }
}

type OwnProps = {
  onChange: any
  valid: boolean
  handleSubmit: (form: WrappedFormUtils) => any
  createProtocol: (noticeId: string) => any
  noticeMedicalTypesDict: DictionaryBaseML[]
  noticeMedicalFormsDict: DictionaryBaseML[]
  periodYearsDict: PeriodYearPick[]
  namesDict: DictionaryBaseML[]
  regionsDict: DictionaryBaseML[]
  hasApplications: boolean
  isOpen: boolean
}

type Props = OwnProps & EntityProps
const CustomizedForm = Form.create({
  onFieldsChange(props: FormComponentProps & Props, changedFields: any) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props: FormComponentProps & Props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value ? props.name.value.id : '',
      }),
      region: Form.createFormField({
        ...props.region,
        value: props.region.value ? props.region.value.id : '',
      }),
      periodYear: Form.createFormField({
        ...props.periodYear,
        value: props.periodYear.value ? props.periodYear.value.id : '',
      }),
      dateBegin: Form.createFormField({
        ...props.dateBegin,
        value: props.dateBegin.value,
      }),
      dateEnd: Form.createFormField({
        ...props.dateEnd,
        value: props.dateEnd.value,
      }),
      noticeMedicalTypes: Form.createFormField({
        ...props.noticeMedicalTypes,
        value: props.noticeMedicalTypes && props.noticeMedicalTypes.value.map(i => i.medicalType.id),
      }),
      noticeMedicalForms: Form.createFormField({
        ...props.noticeMedicalForms,
        value: props.noticeMedicalForms && props.noticeMedicalForms.value.map(i => i.medicalForm.id),
      }),
    }
  },
})((props: FormComponentProps & Props) => {
  const { getFieldDecorator } = props.form
  return (
    <Form onSubmit={props.handleSubmit(props.form)} style={{ display: 'flex', flexDirection: 'column' }}>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Наименование объявления" {...CommonFormItemLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <Select>
            {props.namesDict.map(option => {
              return <Option key={option.id}>{option.nameRu}</Option>
            })}
          </Select>
        )}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Регион" {...CommonFormItemLayout}>
        {getFieldDecorator('region', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <Select>
            {props.regionsDict.map(option => {
              return <Option key={option.id}>{option.nameRu}</Option>
            })}
          </Select>
        )}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Плановый период" {...CommonFormItemLayout}>
        {getFieldDecorator('periodYear', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <Select>
            {props.periodYearsDict.map(option => {
              return <Option key={option.id}>{option.year}</Option>
            })}
          </Select>
        )}
      </FormItem>
      <FormItem
        style={{ marginBottom: '0', flexShrink: 0 }}
        label="Дата начала приема заявок"
        {...CommonFormItemLayout}
      >
        {getFieldDecorator('dateBegin', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <DatePicker
            showTime
            format="DD.MM.YYYY HH:mm"
            disabledDate={isDisabledPreviousDate}
            disabledTime={isDisabledPreviousTime}
          />
        )}
      </FormItem>
      <FormItem
        style={{ marginBottom: '0', flexShrink: 0 }}
        label="Дата окончания приема заявок"
        {...CommonFormItemLayout}
      >
        {getFieldDecorator('dateEnd', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <DatePicker
            showTime
            format="DD.MM.YYYY HH:mm"
            disabledDate={isDisabledPreviousDate}
            disabledTime={isDisabledPreviousTime}
          />
        )}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Вид медицинской помощи" {...CommonFormItemLayout}>
        {getFieldDecorator('noticeMedicalTypes', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <Select mode="multiple">
            {props.noticeMedicalTypesDict.map(option => {
              return <Option key={option.id}>{option.nameRu}</Option>
            })}
          </Select>
        )}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Форма медицинской помощи" {...CommonFormItemLayout}>
        {getFieldDecorator('noticeMedicalForms', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <Select mode="multiple">
            {props.noticeMedicalFormsDict.map(option => {
              return <Option key={option.id}>{option.nameRu}</Option>
            })}
          </Select>
        )}
      </FormItem>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', flexShrink: 0 }}>
        <Button
          style={{ marginRight: 5 }}
          type="primary"
          htmlType="button"
          disabled={!props.id.value || !props.isOpen}
          onClick={() => {
            localStorage.setItem('noticeId', props.id.value!)
            localStorage.setItem('regionId', props.region.value!.id!)
            localStorage.setItem('periodYearId', props.periodYear.value!.id!)
            getHistory().push(buildAppRoute(getAppRoute(), '/requests/proposals/new'))
          }}
        >
          Создать заявку на объемы
        </Button>
        <Button
          style={{ marginRight: 5 }}
          type="primary"
          htmlType="button"
          disabled={!props.id.value || !props.hasApplications || !props.isOpen}
          onClick={() => props.createProtocol(props.id.value!)}
        >
          Сформировать протокол
        </Button>
        <Button type="primary" htmlType="submit" disabled={!props.valid}>
          Сохранить
        </Button>
      </div>
    </Form>
  )
})

type CompState = {
  fields: EntityProps
  periodYearsDict: PeriodYearPick[]
  valid: boolean
}

type CompOwnProps = {
  match: any
}

type CompDispatchProps = {
  fetchSingleNotice: (id: string) => any
  setNewAd: () => any
}

type StateProps = {
  initialValues?: {
    id?: string
    name?: DictionaryBaseML
    region?: DictionaryBaseML
    dateBegin?: Moment
    dateEnd?: Moment
    noticeMedicalTypes?: Array<{ id?: string; medicalType: DictionaryBaseML }>
    noticeMedicalForms?: Array<{ id?: string; medicalForm: DictionaryBaseML }>
  }
  fetchSingleNoticeStatus: FETCH_ENTITY_STATUS
  dictsFetching: boolean
  noticeMedicalTypesDict: DictionaryBaseML[]
  noticeMedicalFormsDict: DictionaryBaseML[]
  namesDict: DictionaryBaseML[]
  regionsDict: DictionaryBaseML[]
}

type CompProps = CompOwnProps & StateProps & CompDispatchProps
class NoticeForm extends React.Component<CompProps, CompState> {
  constructor(props: CompProps) {
    super(props)

    this.state = {
      fields: this.convertPropsToEntityDataForState(props),
      periodYearsDict: [],
      valid: false,
    }
  }

  public handleSubmit = (form: WrappedFormUtils) => (e: any) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      const id = this.state.fields.id.value
      if (!err) {
        const valuesToSend = {
          ...values,
          noticeMedicalTypes: [...values.noticeMedicalTypes],
          noticeMedicalForms: [...values.noticeMedicalForms],
        }

        const initialNoticeMedicalTypes = this.props.initialValues!.noticeMedicalTypes!
        const initialNoticeMedicalForms = this.props.initialValues!.noticeMedicalForms!

        for (let i = 0; i < valuesToSend.noticeMedicalTypes.length; i += 1) {
          const initialObj = initialNoticeMedicalTypes.find(t => t.medicalType.id === values.noticeMedicalTypes[i])
          if (initialObj) {
            valuesToSend.noticeMedicalTypes[i] = { ...initialObj }
          } else {
            valuesToSend.noticeMedicalTypes[i] = {
              medicalType: {
                id: valuesToSend.noticeMedicalTypes[i],
              },
            }
          }
        }

        for (let i = 0; i < valuesToSend.noticeMedicalForms.length; i += 1) {
          const initialObj = initialNoticeMedicalForms.find(
            t => t.medicalForm.id === valuesToSend.noticeMedicalForms[i]
          )
          if (initialObj) {
            valuesToSend.noticeMedicalForms[i] = { ...initialObj }
          } else {
            valuesToSend.noticeMedicalForms[i] = {
              medicalForm: {
                id: valuesToSend.noticeMedicalForms[i],
              },
            }
          }
        }

        createApiClient()
          .saveNotice({ id, ...valuesToSend })
          .then(resp => {
            const newId = !id || id === 'new' ? resp.data.id : id
            message.success('Объявление сохранено!')
            this.fetchEntity(newId)
            // getHistory().push(buildAppRoute(getAppRoute(), `/notices/${newId}`))
          })
          .catch(error => message.error('Ошибка при сохранении объявления'))
      }
    })
  }

  public componentWillReceiveProps(newProps: CompProps) {
    if (!_.isEqual(this.props.initialValues, newProps.initialValues)) {
      this.setState({
        fields: this.convertPropsToEntityDataForState(newProps),
        valid: true,
      })
    }
  }

  public componentDidMount() {
    const id = this.props.match.params.id
    if (id === 'new') {
      this.props.setNewAd()
    } else {
      this.fetchEntity(id)
    }

    createApiClient()
      .fetchDict<PeriodYearPick>('periodYear', undefined, false)
      .then(r => {
        this.setState({
          periodYearsDict: r.data.content,
        })
      })
  }

  public handleFormChange = (changedFields: any) => {
    const data = this.handleSelectValueChanged(changedFields)
    let isValid = true
    for (const field in data) {
      if (data[field].errors && Array.isArray(data[field].errors) && data[field].errors.length > 0) {
        isValid = false
        break
      }
    }

    this.setState(({ fields }) => ({
      fields: { ...fields, ...this.handleSelectValueChanged(changedFields) },
      valid: isValid,
    }))
  }

  public render() {
    const { fields, valid, periodYearsDict } = this.state
    const { fetchSingleNoticeStatus, dictsFetching, match } = this.props

    let header = 'Объявление'
    if (fetchSingleNoticeStatus === FETCH_ENTITY_STATUS.FETCHING || dictsFetching || !periodYearsDict.length) {
      return <ContentLayout contentName={header} />
    }
    if (fetchSingleNoticeStatus === FETCH_ENTITY_STATUS.IDLE) {
      return null
    }
    if (fetchSingleNoticeStatus === FETCH_ENTITY_STATUS.FAILED) {
      const modalInfo = CreateOkModalInfo(
        'Ошибка при загрузке объявления',
        'Объявление не найдено',
        () => {
          dispatchCloseRecentModal()
          getHistory().push(buildAppRoute(getAppRoute(), '/notices/all/1'))
        },
        undefined,
        false
      )
      setTimeout(() => {
        dispatchClearFetchEntityStatus()
        dispatchAddNewModal(modalInfo)
      }, 0)
      return null
    }

    const id = match.params.id
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
        path: id,
        breadcrumbName: id === 'new' ? 'Новое объявление' : 'Объявление',
      },
    ]

    if (id !== 'new') {
      header = `${fields.name.value ? fields.name.value.nameRu : 'Объявление'}${
        fields.region.value ? `. Регион: ${fields.region.value.nameRu}` : ''
      }`
    } else {
      header = 'Новое объявление'
    }
    return (
      <ContentLayout
        contentName={header}
        breadcrumbRoutes={bcRoutes}
        entity="notice"
        disableCommands={id === 'new'}
        showCommands={true}
        onCommandClick={this.onCommandClick}
      >
        <CustomizedForm
          {...fields}
          valid={valid}
          hasApplications={
            this.state.fields.numberOfApplications.value ? this.state.fields.numberOfApplications.value! > 0 : false
          }
          isOpen={this.state.fields.status ? this.state.fields.status.value === 'Активно' : false}
          onChange={this.handleFormChange}
          handleSubmit={this.handleSubmit}
          noticeMedicalTypesDict={this.props.noticeMedicalTypesDict}
          noticeMedicalFormsDict={this.props.noticeMedicalFormsDict}
          periodYearsDict={this.state.periodYearsDict}
          regionsDict={this.props.regionsDict}
          namesDict={this.props.namesDict}
          createProtocol={this.createProtocol}
        />
      </ContentLayout>
    )
  }

  private onCommandClick = (commandId: string, isReport: boolean) => {
    createApiClient().runCommand(commandId, [this.props.match.params.id], isReport)
  }

  private createProtocol = (noticeId: string) => {
    createApiClient()
      .createProtocol(noticeId)
      .then(() => {
        message.success('Протокол сформирован!')
      })
      .catch(error => {
        message.error(
          (error.message && error.response.data && error.response.data.Message) || 'Ошибка при формировании протокола'
        )
      })
  }

  private handleSelectValueChanged = (changedFields: any) => {
    const fieldsWithSelect = ['name', 'region', 'periodYear']
    const fieldsWithMultiSelect = ['noticeMedicalTypes', 'noticeMedicalForms']

    const rightFieldsData = { ...changedFields }
    for (const f of fieldsWithSelect) {
      if (changedFields.hasOwnProperty(f)) {
        rightFieldsData[f] = {
          ...changedFields[f],
          value: this.extractDictionaryValue(f, changedFields[f].value),
        }
      }
    }

    for (const f of fieldsWithMultiSelect) {
      if (changedFields.hasOwnProperty(f)) {
        const propName = f === 'noticeMedicalTypes' ? 'medicalType' : 'medicalForm'
        rightFieldsData[f] = {
          ...changedFields[f],
          value: (this.extractDictionaryValue(f, changedFields[f].value, true) as DictionaryBaseML[]).map(i => ({
            [propName]: i,
          })),
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

  private convertPropsToEntityDataForState(props: CompProps) {
    const data = {
      id: {
        value: undefined,
      },
      name: {
        value: undefined,
      },
      region: {
        value: undefined,
      },
      periodYear: {
        value: undefined,
      },
      dateBegin: {
        value: undefined,
      },
      dateEnd: {
        value: undefined,
      },
      noticeMedicalTypes: {
        value: [],
      },
      noticeMedicalForms: {
        value: [],
      },
      numberOfApplications: {
        value: undefined,
      },
      status: {
        value: undefined,
      },
    }

    if (props.initialValues) {
      for (const key in props.initialValues) {
        if (props.initialValues!.hasOwnProperty(key)) {
          const value = props.initialValues && props.initialValues[key]
          if (value) {
            data[key] = {
              value,
            }
          }
        }
      }
    }
    return data
  }

  private fetchEntity = (id: string) => {
    this.props.fetchSingleNotice(id)
  }
}

const mapStateToProps = (state: State) => {
  return {
    initialValues: state.businessDataState.noticeData.currentNotice
      ? {
          ...state.businessDataState.noticeData.currentNotice,
          name: state.businessDataState.noticeData.currentNotice.noticeType,
          region: state.businessDataState.noticeData.currentNotice.region,
          dateBegin: moment(state.businessDataState.noticeData.currentNotice.dateBegin, 'DD.MM.YYYY HH:mm'),
          dateEnd: moment(state.businessDataState.noticeData.currentNotice.dateEnd, 'DD.MM.YYYY HH:mm'),
          noticeMedicalTypes: state.businessDataState.noticeData.currentNotice.noticeMedicalTypes || [],
          noticeMedicalForms: state.businessDataState.noticeData.currentNotice.noticeMedicalForms || [],
        }
      : undefined,
    fetchSingleNoticeStatus: state.businessDataState.noticeData.fetchSingleNoticeStatus,
    dictsFetching: state.dictionariesDataState.dictNamesFetching.length > 0,
    noticeMedicalTypesDict: state.dictionariesDataState.medicalType as DictionaryBaseML[],
    noticeMedicalFormsDict: state.dictionariesDataState.medicalForm as DictionaryBaseML[],
    namesDict: state.dictionariesDataState.noticeType as DictionaryBaseML[],
    regionsDict: state.dictionariesDataState.region as DictionaryBaseML[],
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchSingleNotice: (id: string) => dispatch(fetchSingleNotice(id)),
    setNewAd: () => dispatch({ type: SET_NEW_NOTICE_REQUESTED, payload: undefined }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticeForm)
