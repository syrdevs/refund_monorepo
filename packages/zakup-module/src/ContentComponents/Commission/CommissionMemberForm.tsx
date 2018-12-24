import { buildAppRoute, DictionaryBaseML, DictionaryBaseMLWithShortName, ReduxActionType } from '@vitacore/shared-ui'
import { Button, Col, DatePicker, Form, Input, message, Row, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as _ from 'lodash'
import moment, { Moment } from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import CreateOkModalInfo from '../../Components/Modals/OkModalInfo'
import { Commission } from '../../Entities/Commission'
import { CommissionMember, Person } from '../../Entities/CommissionMember'
import {
  dispatchClearFetchEntityStatus,
  fetchSingleCommission,
  findPersonByIIN,
} from '../../Redux/Actions/businessDataStateActions'
import { dispatchAddNewModal, dispatchCloseRecentModal } from '../../Redux/Actions/infrastructureStateActions'
import { FETCH_ENTITY_STATUS } from '../../Redux/Constants/businessDataStateConstants'
import { getHistory } from '../../Redux/history'
import { State } from '../../Redux/StateModels'
import { createApiClient, getAppRoute, isDisabledNextDate, isDisabledPreviousDate } from '../../utils'
import { CommonFormItemLayout, ContentLayout } from '../shared'
const FormItem = Form.Item
const Option = Select.Option
const Search = Input.Search

type EntityProps = {
  id: { value?: string }
  firstName: { value?: string }
  lastName: { value?: string }
  patronymic: { value?: string }
  iin: { value?: string }
  birthdate: { value?: Date }
  workPlace: { value?: string }
  dateBegin: { value?: Date }
  dateEnd?: { value?: Date }
  meetingMemberRole: { value?: DictionaryBaseML }
}

type OwnProps = {
  onChange: any
  valid: boolean
  handleSubmit: (form: WrappedFormUtils) => any
  findPersonByIIN: (iin: string) => any
  meetingMemberRolesDict: DictionaryBaseML[]
}

type Props = OwnProps & EntityProps
const CustomizedForm = Form.create({
  onFieldsChange(props: FormComponentProps & Props, changedFields: any) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props: FormComponentProps & Props) {
    return {
      firstName: Form.createFormField({
        ...props.firstName,
      }),
      lastName: Form.createFormField({
        ...props.lastName,
      }),
      patronymic: Form.createFormField({
        ...props.patronymic,
      }),
      iin: Form.createFormField({
        ...props.iin,
      }),
      birthdate: Form.createFormField({
        ...props.birthdate,
      }),
      workPlace: Form.createFormField({
        ...props.workPlace,
      }),
      dateBegin: Form.createFormField({
        ...props.dateBegin,
      }),
      dateEnd: Form.createFormField({
        ...props.dateEnd,
      }),
      meetingMemberRole: Form.createFormField({
        ...props.meetingMemberRole,
        value: props.meetingMemberRole.value ? props.meetingMemberRole.value.id : '',
      }),
    }
  },
})((props: FormComponentProps & Props) => {
  const { getFieldDecorator } = props.form
  return (
    <Form onSubmit={props.handleSubmit(props.form)} style={{ display: 'flex', flexDirection: 'column' }}>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 16, offset: 8 }}>
          <Search placeholder="ИИН" onSearch={value => props.findPersonByIIN(value)} />
        </Col>
      </Row>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Имя" {...CommonFormItemLayout}>
        {getFieldDecorator('firstName', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(<Input disabled={true} />)}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Фамилия" {...CommonFormItemLayout}>
        {getFieldDecorator('lastName', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(<Input disabled={true} />)}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Отчество (если есть)" {...CommonFormItemLayout}>
        {getFieldDecorator('patronymic')(<Input disabled={true} />)}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="ИИН" {...CommonFormItemLayout}>
        {getFieldDecorator('iin', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(<Input disabled={true} />)}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Дата рождения" {...CommonFormItemLayout}>
        {getFieldDecorator('birthdate', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(<DatePicker format="DD.MM.YYYY" disabledDate={isDisabledNextDate} />)}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Место работы" {...CommonFormItemLayout}>
        {getFieldDecorator('workPlace', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(<Input />)}
      </FormItem>
      <FormItem
        style={{ marginBottom: '0', flexShrink: 0 }}
        label="Дата начала работы в комиссии"
        {...CommonFormItemLayout}
      >
        {getFieldDecorator('dateBegin', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(<DatePicker format="DD.MM.YYYY" disabledDate={isDisabledPreviousDate} />)}
      </FormItem>
      <FormItem
        style={{ marginBottom: '0', flexShrink: 0 }}
        label="Дата окончания работы в комиссии"
        {...CommonFormItemLayout}
      >
        {getFieldDecorator('dateEnd')(<DatePicker format="DD.MM.YYYY" disabledDate={isDisabledPreviousDate} />)}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Роль в комиссии" {...CommonFormItemLayout}>
        {getFieldDecorator('meetingMemberRole', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <Select>
            {props.meetingMemberRolesDict.map(option => {
              return <Option key={option.id}>{option.nameRu}</Option>
            })}
          </Select>
        )}
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
  lastIINSearched?: string
}

type CompOwnProps = {
  match: any
}

type CompDispatchProps = {
  fetchSingleCommission: (id: string) => any
  findPersonByIIN: (iin: string) => any
}

type InitialValuesProps = {
  id?: string
  firstName: string
  lastName: string
  patronymic?: string
  iin?: string
  birthdate: Moment
  sex: DictionaryBaseMLWithShortName
  workPlace?: string
  dateBegin: Moment
  dateEnd?: Moment
  meetingMemberRole: DictionaryBaseML
}

type StateProps = {
  initialValues?: InitialValuesProps
  personFound: Person | null
  currentCommission: Commission | null
  fetchSingleCommissionStatus: FETCH_ENTITY_STATUS
  dictsFetching: boolean
  meetingMemberRolesDict: DictionaryBaseML[]
}

type CompProps = CompOwnProps & StateProps & CompDispatchProps
class CommissionMemberForm extends React.Component<CompProps, CompState> {
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
      // const id = this.state.fields.id.value
      if (!err) {
        const isNew = this.props.match.params.id === 'new'
        console.log(this.props.initialValues)
        const updatedOrNewMeetingMember = {
          person: {
            firstName: values.firstName,
            lastName: values.lastName,
            patronymic: values.patronymic,
            birthdate: values.birthdate.format('DD.MM.YYYY'),
            workPlace: values.workPlace,
            sex: {
              id: this.props.initialValues!.sex!.id,
            },
          },
          dateBegin: values.dateBegin.format('DD.MM.YYYY'),
          dateEnd: values.dateEnd ? values.dateEnd.format('DD.MM.YYYY') : null,
          meetingMemberRole: {
            id: values.meetingMemberRole,
          },
        }

        if (!isNew) {
          updatedOrNewMeetingMember['id'] = this.props.match.params.id
        }

        const meetingMembers = (isNew
          ? [...this.props.currentCommission!.meetingMembers.map(i => ({ id: i.id })), updatedOrNewMeetingMember]
          : [
              ...this.props
                .currentCommission!.meetingMembers.filter(i => i.id !== this.props.match.params.id)
                .map(i => ({ id: i.id })),
              updatedOrNewMeetingMember,
            ]) as CommissionMember[]

        const updatedCommission = {
          ...this.props.currentCommission!,
          dateBegin: this.props.currentCommission!.dateBegin,
          region: this.props.currentCommission!.region!.id!,
          meetingMembers,
        }

        createApiClient()
          .saveCommission(updatedCommission)
          .then(() => {
            message.success('Член комиссии сохранен!')
            getHistory().push(
              buildAppRoute(getAppRoute(), `/commissions/${this.props.match.params.commissionId}/members`)
            )
          })
      }
    })
  }

  public componentWillReceiveProps(newProps: CompProps) {
    if (
      !_.isEqual(this.props.initialValues, newProps.initialValues) ||
      (!this.props.personFound && newProps.personFound)
    ) {
      const newInitialValues = newProps.personFound
        ? ({
            ...newProps.initialValues,
            ...{
              ...newProps.personFound,
              birthdate: moment(newProps.personFound.birthdate),
              iin: newProps.personFound.iin || this.state.lastIINSearched,
            },
          } as InitialValuesProps)
        : ({ ...newProps.initialValues } as InitialValuesProps)

      const propsUpdated: CompProps = { ...newProps, initialValues: newInitialValues }
      this.setState({
        fields: this.convertPropsToEntityDataForState(propsUpdated),
      })
    }
  }

  public componentDidMount() {
    const commissionId = this.props.match.params.commissionId
    if (!this.props.initialValues) {
      this.fetchEntity(commissionId)
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
    const { fetchSingleCommissionStatus, dictsFetching, match } = this.props

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

    const { commissionId, id } = match.params
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
        path: `${commissionId}/members`,
        breadcrumbName: 'Члены комиссии',
      },
      {
        path: id,
        breadcrumbName: id === 'new' ? 'Новый член комиссии' : 'Информация о члене комиссии',
      },
    ]

    return (
      <ContentLayout contentName="Член комиссии" breadcrumbRoutes={bcRoutes}>
        <CustomizedForm
          {...fields}
          valid={valid}
          onChange={this.handleFormChange}
          handleSubmit={this.handleSubmit}
          findPersonByIIN={this.findPersonByIIN}
          meetingMemberRolesDict={this.props.meetingMemberRolesDict}
        />
      </ContentLayout>
    )
  }

  private handleSelectValueChanged = (changedFields: any) => {
    const fieldsWithSelect = ['meetingMemberRole']

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

  private findPersonByIIN = (value: string) => {
    this.setState(
      {
        lastIINSearched: value,
      },
      () => this.props.findPersonByIIN(value)
    )
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
      firstName: {
        value: undefined,
      },
      lastName: {
        value: undefined,
      },
      patronymic: {
        value: undefined,
      },
      iin: {
        value: undefined,
      },
      birthdate: {
        value: undefined,
      },
      workPlace: {
        value: undefined,
      },
      dateBegin: {
        value: undefined,
      },
      dateEnd: {
        value: undefined,
      },
      meetingMemberRole: {
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

const mapStateToProps = (state: State, ownProps: CompProps) => {
  const allMembers =
    state.businessDataState.commissionsData.currentCommission &&
    state.businessDataState.commissionsData.currentCommission.meetingMembers
  const currentMember = allMembers && allMembers.find(i => i.id === ownProps.match.params.id)

  return {
    initialValues: currentMember
      ? {
          ...currentMember.person,
          birthdate: moment(currentMember.person.birthdate),
          dateBegin: moment(currentMember.dateBegin, 'DD.MM.YYYY'),
          dateEnd: moment(currentMember.dateEnd, 'DD.MM.YYYY'),
          meetingMemberRole: currentMember.meetingMemberRole,
        }
      : undefined,
    currentCommission: state.businessDataState.commissionsData.currentCommission,
    personFound: state.businessDataState.commissionsData.personFound,
    fetchSingleCommissionStatus: state.businessDataState.commissionsData.fetchSingleCommissionStatus,
    dictsFetching: state.dictionariesDataState.dictNamesFetching.length > 0,
    meetingMemberRolesDict: state.dictionariesDataState.meetingMemberRole as DictionaryBaseML[],
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxActionType>) => {
  return {
    fetchSingleCommission: (id: string) => dispatch(fetchSingleCommission(id)),
    findPersonByIIN: (iin: string) => dispatch(findPersonByIIN(iin)),
  }
}

export default connect<StateProps, CompDispatchProps, CompOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(CommissionMemberForm)
