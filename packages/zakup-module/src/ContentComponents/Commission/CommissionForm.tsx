import { buildAppRoute, DictionaryBaseML, ReduxActionType } from '@vitacore/shared-ui'
import { Button, DatePicker, Form, message, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as _ from 'lodash'
import moment, { Moment } from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import CreateOkModalInfo from '../../Components/Modals/OkModalInfo'
import { CommissionMember } from '../../Entities/CommissionMember'
import { dispatchClearFetchEntityStatus, fetchSingleCommission } from '../../Redux/Actions/businessDataStateActions'
import { dispatchAddNewModal, dispatchCloseRecentModal } from '../../Redux/Actions/infrastructureStateActions'
import { FETCH_ENTITY_STATUS, SET_NEW_COMMISSION_REQUESTED } from '../../Redux/Constants/businessDataStateConstants'
import { getHistory } from '../../Redux/history'
import { State } from '../../Redux/StateModels'
import { createApiClient, getAppRoute, isDisabledPreviousDate } from '../../utils'
import { CommonFormItemLayout, ContentLayout } from '../shared'
const FormItem = Form.Item
const Option = Select.Option

type EntityProps = {
  id: { value?: string }
  region: { value?: DictionaryBaseML }
  dateBegin: { value?: Date }
}

type OwnProps = {
  onChange: any
  valid: boolean
  handleSubmit: (form: WrappedFormUtils) => any
  regionsDict: DictionaryBaseML[]
}

type Props = OwnProps & EntityProps
const CustomizedForm = Form.create({
  onFieldsChange(props: FormComponentProps & Props, changedFields: any) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props: FormComponentProps & Props) {
    return {
      region: Form.createFormField({
        ...props.region,
        value: props.region.value ? props.region.value.id : '',
      }),
      dateBegin: Form.createFormField({
        ...props.dateBegin,
        value: props.dateBegin.value,
      }),
    }
  },
})((props: FormComponentProps & Props) => {
  const { getFieldDecorator } = props.form
  return (
    <Form onSubmit={props.handleSubmit(props.form)} style={{ display: 'flex', flexDirection: 'column' }}>
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
      <FormItem
        style={{ marginBottom: '0', flexShrink: 0 }}
        label="Дата начала действия комиссии"
        {...CommonFormItemLayout}
      >
        {getFieldDecorator('dateBegin', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(<DatePicker format="DD.MM.YYYY" disabledDate={isDisabledPreviousDate} />)}
      </FormItem>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', flexShrink: 0 }}>
        <Button type="primary" htmlType="submit" disabled={!props.valid}>
          Сохранить
        </Button>
      </div>
    </Form>
  )
})

type CompState = {
  fields: EntityProps
  valid: boolean
}

type CompOwnProps = {
  match: any
}

type CompDispatchProps = {
  fetchSingleCommission: (id: string) => any
  setNewCommission: () => any
}

type StateProps = {
  initialValues?: {
    id?: string
    region?: DictionaryBaseML
    dateBegin?: Moment
    meetingMembers: CommissionMember[]
  }
  fetchSingleCommissionStatus: FETCH_ENTITY_STATUS
  dictsFetching: boolean
  regionsDict: DictionaryBaseML[]
}

type CompProps = CompOwnProps & StateProps & CompDispatchProps
class CommissionForm extends React.Component<CompProps, CompState> {
  constructor(props: CompProps) {
    super(props)

    this.state = {
      fields: this.convertPropsToEntityDataForState(props),
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
          meetingMembers: this.props.initialValues!.meetingMembers,
        }

        createApiClient()
          .saveCommission({ id, ...valuesToSend })
          .then(() => {
            message.success('Коммиссия сохранена!')
            if (id) {
              this.setState({ valid: false })
            } else {
              getHistory().push(buildAppRoute(getAppRoute(), '/commissions/all'))
            }
          })
      }
    })
  }

  public componentWillReceiveProps(newProps: CompProps) {
    if (!_.isEqual(this.props.initialValues, newProps.initialValues)) {
      this.setState({
        fields: this.convertPropsToEntityDataForState(newProps),
      })
    }
  }

  public componentDidMount() {
    const id = this.props.match.params.id
    if (id === 'new') {
      this.props.setNewCommission()
    } else {
      this.fetchEntity(id)
    }
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
    const { fields, valid } = this.state
    const { fetchSingleCommissionStatus, dictsFetching } = this.props

    if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.FETCHING || dictsFetching) {
      return <ContentLayout contentName="Комиссия" />
    }
    if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.IDLE) {
      return null
    }
    if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.FAILED) {
      const modalInfo = CreateOkModalInfo(
        'Ошибка при загрузке комиссии',
        'Комиссия не найдена',
        () => {
          dispatchCloseRecentModal()
          getHistory().push(buildAppRoute(getAppRoute(), '/commissions/all'))
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

    const id = this.props.match.params.id
    const bcRoutes = [
      {
        path: '/',
        breadcrumbName: 'Главная',
      },
      {
        path: 'commissions',
        breadcrumbName: 'Комиссии',
      },
      {
        path: `${id}`,
        breadcrumbName: id === 'new' ? 'Новая комиссия' : 'Информация о комиссии',
      },
    ]

    return (
      <ContentLayout contentName="Комиссия" breadcrumbRoutes={bcRoutes}>
        <CustomizedForm
          {...fields}
          valid={valid}
          onChange={this.handleFormChange}
          handleSubmit={this.handleSubmit}
          regionsDict={this.props.regionsDict}
        />
      </ContentLayout>
    )
  }

  private handleSelectValueChanged = (changedFields: any) => {
    const fieldsWithSelect = ['region']

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
    const allDictData = this.props[dictPropsName] as DictionaryBaseML[]

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
      region: {
        value: undefined,
      },
      dateBegin: {
        value: undefined,
      },
    }

    if (props.initialValues) {
      for (const key in props.initialValues) {
        if (props.initialValues!.hasOwnProperty(key)) {
          const value = props.initialValues && props.initialValues[key]
          data[key] = {
            value,
          }
        }
      }
    }
    return data
  }

  private fetchEntity = (id: string) => {
    this.props.fetchSingleCommission(id)
  }
}

const mapStateToProps = (state: State) => {
  return {
    initialValues: state.businessDataState.commissionsData.currentCommission
      ? {
          ...state.businessDataState.commissionsData.currentCommission,
          region: state.businessDataState.commissionsData.currentCommission.region,
          dateBegin: moment(state.businessDataState.commissionsData.currentCommission.dateBegin, 'DD.MM.YYYY'),
          meetingMembers: state.businessDataState.commissionsData.currentCommission.meetingMembers,
        }
      : undefined,
    fetchSingleCommissionStatus: state.businessDataState.commissionsData.fetchSingleCommissionStatus,
    dictsFetching: state.dictionariesDataState.dictNamesFetching.length > 0,
    regionsDict: state.dictionariesDataState.region as DictionaryBaseML[],
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchSingleCommission: (id: string) => dispatch(fetchSingleCommission(id)),
    setNewCommission: () => dispatch({ type: SET_NEW_COMMISSION_REQUESTED, payload: undefined }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionForm)
