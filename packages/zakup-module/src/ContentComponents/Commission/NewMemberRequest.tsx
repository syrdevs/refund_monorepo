// import { Button, Col, Form, Input, message, Row, Select } from 'antd'
// import { FormComponentProps } from 'antd/lib/form'
// import { WrappedFormUtils } from 'antd/lib/form/Form'
// import Search from 'antd/lib/input/Search'
// import TextArea from 'antd/lib/input/TextArea'
// import * as _ from 'lodash'
// import * as React from 'react'
// import commissionMemberRoles from '../../Data/commissionMemberRoles'
// import { CommissionMember } from '../../Entities/CommissionMember'
// import { createApiClient } from '../../utils'
// const FormItem = Form.Item
// const Option = Select.Option
//
// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 6 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 18 },
//   },
// }
//
// type EntityProps = {
//   id: { value?: number }
//   FIO: { value?: string }
//   INN: { value?: string }
//   workPlace: { value?: string }
//   companyPosition: { value?: string }
//   reason: { value?: string }
//   role: { value?: number }
//   comment: { value?: string }
// }
//
// type OwnProps = {
//   onChange: any
//   handleSubmit: (form: WrappedFormUtils) => any
// }
//
// type Props = OwnProps & EntityProps
//
// const CustomizedForm = Form.create({
//   onFieldsChange(props: FormComponentProps & Props, changedFields: any) {
//     props.onChange(changedFields)
//   },
//   mapPropsToFields(props: FormComponentProps & Props) {
//     return {
//       FIO: Form.createFormField({
//         ...props.FIO,
//         value: props.FIO.value,
//       }),
//       INN: Form.createFormField({
//         ...props.INN,
//         value: props.INN.value,
//       }),
//       workPlace: Form.createFormField({
//         ...props.workPlace,
//         value: props.workPlace.value,
//       }),
//       companyPosition: Form.createFormField({
//         ...props.companyPosition,
//         value: props.companyPosition.value,
//       }),
//       reason: Form.createFormField({
//         ...props.reason,
//         value: props.reason.value,
//       }),
//       role: Form.createFormField({
//         ...props.role,
//         value: props.role.value,
//       }),
//       comment: Form.createFormField({
//         ...props.comment,
//         value: props.comment.value,
//       }),
//     }
//   },
// })((props: FormComponentProps & Props) => {
//   const { getFieldDecorator } = props.form
//   return (
//     <Form onSubmit={props.handleSubmit(props.form)} style={{ display: 'flex', flexDirection: 'column' }}>
//       <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="ФИО" {...formItemLayout}>
//         {getFieldDecorator('FIO', {
//           rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
//         })(<Input />)}
//       </FormItem>
//       <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="ИНН" {...formItemLayout}>
//         {getFieldDecorator('INN', {
//           rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
//         })(<Input />)}
//       </FormItem>
//       <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Место работы" {...formItemLayout}>
//         {getFieldDecorator('workPlace', {
//           rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
//         })(<Input />)}
//       </FormItem>
//       <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Должность" {...formItemLayout}>
//         {getFieldDecorator('companyPosition', {
//           rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
//         })(<Input />)}
//       </FormItem>
//       <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Основание" {...formItemLayout}>
//         {getFieldDecorator('reason', {
//           rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
//         })(<Input />)}
//       </FormItem>
//       <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Роль" {...formItemLayout}>
//         {getFieldDecorator('role', {
//           rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
//         })(
//           <Select>
//             {commissionMemberRoles.map(option => {
//               return <Option key={option.id.toString()}>{option.name}</Option>
//             })}
//           </Select>
//         )}
//       </FormItem>
//       <FormItem style={{ marginBottom: '0', flexShrink: 0 }} label="Дополнительные сведения" {...formItemLayout}>
//         <TextArea />
//       </FormItem>
//       <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', flexShrink: 0 }}>
//         <Button type="primary" htmlType="submit">
//           Направить приглашение
//         </Button>
//       </div>
//     </Form>
//   )
// })
//
// type CompDispatchProps = {}
//
// type StateProps = {
//   initialValues?: {
//     id?: number
//     FIO?: string
//     INN?: string
//     companyPosition?: string
//     workPlace?: string
//     reason?: string
//     role?: number
//     comment?: string
//   }
// }
//
// type CompProps = StateProps & CompDispatchProps
//
// type CompState = {
//   fields: EntityProps
// }
//
// class NewMemberRequest extends React.Component<CompProps, CompState> {
//   constructor(props: CompProps) {
//     super(props)
//
//     this.state = {
//       fields: this.convertPropsToEntityDataForState(props),
//     }
//   }
//
//   public componentWillReceiveProps(newProps: CompProps) {
//     if (!_.isEqual(this.props.initialValues, newProps.initialValues)) {
//       this.setState({
//         fields: this.convertPropsToEntityDataForState(newProps),
//       })
//     }
//   }
//
//   public handleFormChange = (changedFields: any) => {
//     this.setState(({ fields }) => ({
//       fields: { ...fields, ...changedFields },
//     }))
//   }
//
//   public handleSubmit = (form: WrappedFormUtils) => (e: any) => {
//     e.preventDefault()
//     form.validateFields((err, values) => {
//       // const id = this.state.fields.id.value
//       if (!err) {
//         debugger
//       }
//     })
//   }
//
//   public render() {
//     const { fields } = this.state
//     return (
//       <div>
//         <Row style={{ marginBottom: '15px' }}>
//           <Col span={18} offset={6}>
//             <Search placeholder="ИНН" onSearch={value => this.findCommissionMember(value)} />
//           </Col>
//         </Row>
//         <CustomizedForm {...fields} onChange={this.handleFormChange} handleSubmit={this.handleSubmit} />
//       </div>
//     )
//   }
//
//   private findCommissionMember = (innToFind: string) => {
//     if (!innToFind) {
//       return
//     }
//     const client = createApiClient()
//     client.findCommissionMemberByINN(innToFind).then((resp: any) => {
//       if (!resp.data) {
//         message.error('Член комиссии не найден')
//         this.setState({
//           fields: this.convertPropsToEntityDataForState({ initialValues: undefined }),
//         })
//         return
//       }
//
//       this.setState({
//         fields: this.convertPropsToEntityDataForState({ initialValues: resp.data as CommissionMember }),
//       })
//     })
//   }
//
//   private convertPropsToEntityDataForState(props: CompProps) {
//     const data = {
//       id: {
//         value: undefined,
//       },
//       FIO: {
//         value: undefined,
//       },
//       INN: {
//         value: undefined,
//       },
//       companyPosition: {
//         value: undefined,
//       },
//       workPlace: {
//         value: undefined,
//       },
//       reason: {
//         value: undefined,
//       },
//       role: {
//         value: undefined,
//       },
//       comment: {
//         value: undefined,
//       },
//     }
//
//     if (props.initialValues) {
//       for (const key in props.initialValues) {
//         if (props.initialValues!.hasOwnProperty(key)) {
//           const value = props.initialValues && props.initialValues[key]
//           data[key] = {
//             value,
//           }
//         }
//       }
//     }
//     return data
//   }
// }
//
// export default NewMemberRequest
