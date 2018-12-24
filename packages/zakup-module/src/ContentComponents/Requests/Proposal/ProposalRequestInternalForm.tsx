import { DictionaryBaseML } from '@vitacore/shared-ui'
import { Button, Col, DatePicker, Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import { ClinicPick } from '../../../Entities/Organization'
import { PeriodYearPick } from '../../../Entities/PeriodYear'
import { isDisabledPreviousDate } from '../../../utils'
import { CommonFormItemLayout, LabelColStyled, RowStyled } from '../../shared'
import { EntityProps } from './EntityProps'
const FormItem = Form.Item
const Option = Select.Option

type OwnProps = {
  onChange: any
  valid: boolean
  isNew: boolean
  regionId?: string
  periodYearId?: string
  handleSubmit: (form: WrappedFormUtils) => any
  periodYearsDict: PeriodYearPick[]
  clinicsDict: ClinicPick[]
  regionsDict: DictionaryBaseML[]
  proposalTypesDict: DictionaryBaseML[]
  hasItems: boolean
  onSendToReview: () => any
}

type Props = OwnProps & EntityProps
const ProposalRequestInternalForm = Form.create({
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
      periodYear: Form.createFormField({
        ...props.periodYear,
        value: props.periodYear.value ? props.periodYear.value.id : props.periodYearId || '',
      }),
      clinic: Form.createFormField({
        ...props.clinic,
        value: props.clinic.value ? props.clinic.value.id : '',
      }),
      region: Form.createFormField({
        ...props.region,
        value: props.region.value ? props.region.value.id : props.regionId || '',
      }),
      proposalType: Form.createFormField({
        ...props.proposalType,
        value: props.proposalType.value ? props.proposalType.value.id : '',
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
          <Select disabled={!!props.regionId}>
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
          <Select disabled={!!props.periodYearId}>
            {props.periodYearsDict.map(option => {
              return <Option key={option.id}>{option.year}</Option>
            })}
          </Select>
        )}
      </FormItem>
      <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Вид заявки" {...CommonFormItemLayout}>
        {getFieldDecorator('proposalType', {
          rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(
          <Select>
            {props.proposalTypesDict.map(option => {
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

export default ProposalRequestInternalForm
