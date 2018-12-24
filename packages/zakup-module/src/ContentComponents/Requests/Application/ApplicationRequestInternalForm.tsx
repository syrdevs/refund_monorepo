import { DictionaryBaseML } from '@vitacore/shared-ui'
import { Button, Col, DatePicker, Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import AppRolesDict from '../../../Data/AppRolesDict'
import { ClinicPick } from '../../../Entities/Organization'
import { isDisabledPreviousDate } from '../../../utils'
import { CommonFormItemLayout, LabelColStyled, RowStyled } from '../../shared'
import { EntityProps } from './EntityProps'
const FormItem = Form.Item
const Option = Select.Option

type OwnProps = {
  onChange: any
  valid: boolean
  isNew: boolean
  hasItems: boolean
  handleSubmit: (form: WrappedFormUtils) => any
  clinicsDict: ClinicPick[]
  regionsDict: DictionaryBaseML[]
  onSendToReview: () => any
}

type Props = OwnProps & EntityProps
const ApplicationRequestInternalForm = Form.create({
  onFieldsChange(props: FormComponentProps & Props, changedFields: any) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props: FormComponentProps & Props) {
    return {
      descr: Form.createFormField({
        ...props.descr,
      }),
      documentDate: Form.createFormField({
        ...props.documentDate,
      }),
      clinic: Form.createFormField({
        ...props.clinic,
        value: props.clinic.value ? props.clinic.value.id : '',
      }),
      region: Form.createFormField({
        ...props.region,
        value: props.region.value ? props.region.value.id : '',
      }),
      role: Form.createFormField({
        ...props.role,
        value: props.role.value ? props.role.value.id : '',
      }),
    }
  },
})((props: FormComponentProps & Props) => {
  const { getFieldDecorator } = props.form
  return (
    <Form onSubmit={props.handleSubmit(props.form)} style={{ display: 'flex', flexDirection: 'column' }}>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Организация" {...CommonFormItemLayout}>
        {getFieldDecorator('clinic', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <Select>
            {props.clinicsDict.map(option => {
              return <Option key={option.id}>{option.shortName}</Option>
            })}
          </Select>
        )}
      </FormItem>
      <FormItem
        style={{ marginBottom: '0', flexShrink: 0 }}
        label="Регион осуществления деятельности"
        {...CommonFormItemLayout}
      >
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
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Дата подачи заявки" {...CommonFormItemLayout}>
        {getFieldDecorator('documentDate', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(<DatePicker format="DD.MM.YYYY" disabledDate={isDisabledPreviousDate} />)}
      </FormItem>
      {!props.isNew && (
        <RowStyled>
          <LabelColStyled {...CommonFormItemLayout.labelCol}>Регистрационный номер</LabelColStyled>
          <Col {...CommonFormItemLayout.wrapperCol}>
            <Input disabled={true} value={props.number.value} />
          </Col>
        </RowStyled>
      )}
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Комментарий" {...CommonFormItemLayout}>
        {getFieldDecorator('descr')(<Input />)}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Роль" {...CommonFormItemLayout}>
        {getFieldDecorator('role', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <Select>
            {AppRolesDict.map(option => {
              return <Option key={option.id}>{option.name}</Option>
            })}
          </Select>
        )}
      </FormItem>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', flexShrink: 0 }}>
        <Button
          type="primary"
          htmlType="button"
          disabled={props.isNew || !props.hasItems}
          style={{ marginRight: '10px' }}
          onClick={props.onSendToReview}
        >
          Отправить на рассмотрение
        </Button>
        <Button type="primary" htmlType="submit" disabled={!props.valid}>
          Сохранить
        </Button>
      </div>
    </Form>
  )
})

export default ApplicationRequestInternalForm
