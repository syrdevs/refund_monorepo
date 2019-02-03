import React, { Component } from 'react';
import {
  Tabs,
  Spin,
  Form,
  Divider,
  Button,
  Icon,
  Col,
  Card,
  Row,
  Select,
  Input,
  Table,
  Popconfirm,
  DatePicker,
  LocaleProvider,
  Badge,
  Radio, Switch, Modal
} from "antd";
import connect from "../../Redux";
import ContentLayout from "../../layouts/ContentLayout";
import styles from "../Acts/style.css";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { md: 6, xs: 24, sm: 24 },
  wrapperCol: { md: 18, xs: 24, sm: 24},
};
const formRenderLayout = {
  labelCol: { md: 24, xs: 24, sm: 24 },
  wrapperCol: { md: 24, xs: 24, sm: 24},
}
const Option = Select.Option;
const RenderformItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 14
  }
};


const RendetField =({name, label, type, getFieldDecorator, validatemessage, references}) => {
  switch (type) {
    case 'combobox': {
      return(
        <FormItem
          {...RenderformItemLayout}
          style={{marginBottom:'24px'}}
          label={label}

        >
          {getFieldDecorator(name, {
            rules: [{
              required: false,
              message: validatemessage,
            }],
          })(
            <Select  key={name} style={{marginLeft:'10px', width:'95%'}} name={name}>
              {references && references.map((item) => {
                return <Select.Option key={item.id} value={item.id} prop={item}>{item.nameRu}</Select.Option>;
              })}
            </Select>)}
        </FormItem>
      )}
    case 'text': {
      return(
        <FormItem
          {...RenderformItemLayout}
          style={{marginBottom:'24px'}}
          key={name}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: false,
              message: validatemessage,
            }],
            initialValue: ''
          })(
            <Input  key={name} style={{marginLeft:'10px', width:'95%'}} name={name}/>)}
        </FormItem>
      )}
    case 'datePicker': {
      return(
        <FormItem
          {...RenderformItemLayout}
          style={{marginBottom:'24px'}}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: false,
              message: validatemessage,
            }],
            initialValue: ''
          })(
            <DatePicker style={{marginLeft:'10px', width:'95%'}} name={name} format={'DD.MM.YYYY'}/>
          )}
        </FormItem>
      )}
    default:
      break;
  }
}


@Form.create()
class CounterAgentNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        codeagent:null,
      },
      panes: [
        { title: 'Организация', content:  [
            {
              name: 'legalForm',
              label: 'Организационно-правовая форма',
              type: 'combobox',
            },
            {
              name: 'name',
              label: 'Наименование',
              type: 'text',
            },
            {
              name: 'fullName',
              label: 'Наименование полное',
              type: 'text',
            },
            {
              name: 'shortName',
              label: 'Наименование краткое',
              type: 'text',
            }
          ],key: '7' }
      ],
      fizpane: { title: 'Индивидуальный предприниматель', content:  [
         /* {
            name: 'fiz_surname',
            label: 'Вид идентификатора',
            type: 'combobox',
          },
          {
            name: 'fiz_name',
            label: 'Имя',
            type: 'text',
          },
          {
            name: 'fiz_patronic',
            label: 'Отчество',
            type: 'text',
          },
          {
            name: 'gender',
            label: 'Пол',
            type: 'combobox',
          },
          {
            name: 'fio_genitive',
            label: 'ФИО в родительном падеже',
            type: 'text',
          },
          {
            name: 'fiz_fio_genitive',
            label: 'ФИО в родительном падеже',
            type: 'text',
          },
          {
            name: 'fiz_fio_genitive_initials',
            label: 'Фамилия и инициалы в родительном падеже',
            type: 'text',
          },*/
        ],key: '7' },
      orgpane: { title: 'Организация', content:  [
          {
            name: 'org_form',
            label: 'Организационно-правовая форма',
            type: 'text',
          },
          {
            name: 'name',
            label: 'Наименование',
            type: 'text',
          },
          {
            name: 'fullName',
            label: 'Наименование полное',
            type: 'text',
          },
          {
            name: 'shortName',
            label: 'Наименование краткое',
            type: 'text',
          }
        ],key: '7' },
      isNew:false,
      validatemessage:'Поле обязательно для заполнения',
      hasError: false,
      identitiescount: 0,
      adressescount: 0,
      contactscount: 0,
      bankscount: 0,
      responsescount:0,
      RegistrerSZscount:0,
      Industbasecount:0,
      idents:[],
      identitiesarr:[],
      adressesarr:[],
      contactsarr:[],
      banksarr:[],
      responsesarr: [],
      RegistrerSZsarr: [],
      identities:[],
      adresses:[],
      contacts:[],
      banks:[],
      responses: [],
      RegistrerSZs: [],
      Industbase: [],
      smarttabs:[
        {
          name: "identities",
          title:"Идентификаторы",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
            {
              title: 'Идентификатор',
              dataIndex: 'identitytype',
              type: 'combobox',
              width: '15%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('identitytype'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Select name={'identitytype'+record.key} style={{ width: 250 }} onChange={(e)=>{this.identValue(e, record, 'identitytype', 'identities')}}>
                        {this.props.universal.identifierType.content && this.props.universal.identifierType.content.map((item) => {
                          return <Select.Option key={item.id}>{item.name}</Select.Option>;
                        })}
                      </Select>
                    )}
                  </FormItem>)
              },
            },
            {
              title: 'Значение',
              dataIndex: 'identityname',
              width: '35%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('identityname'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'identityname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'identityname', 'identities')}}/>)}
                  </FormItem>)
              },
            },
            {
              title: 'Дата начала действия',
              dataIndex: 'identitybeginDate',
              width: '25%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('identitybeginDate'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <DatePicker style={{width:'100%'}} name={'identitybeginDate'+record.key}  format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'identitybeginDate', 'identities')}}/>)}
                  </FormItem>
                )
              },
            },

            {
              title: 'Дата окончания действия',
              dataIndex: 'identityendDate',
              width: '20%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('identityendDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'identityendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'identityendDate', 'identities')}}/>)}
                </FormItem>)
              },
            },
            {
              title: 'Действие',
              dataIndex: 'operation',
              width: '10%',
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{marginTop: '-20px'}}>
                    <a onClick={() => this.remove('identities',record.key, 'identitiescount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
        {
          name: "adresses",
          title:"Адреса",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
            {
              dataIndex: 'adresstype',
              title: 'Вид адреса',
              width: '20%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('adresstype'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      /*<Input name={'adresstype'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'adresstype', "adresses")}}/>*/

                      <Select name={'adresstype'+record.key} style={{ width: 250 }} onChange={(e)=>{this.identValue(e, record, 'adresstype', "adresses")}}>
                          {this.props.universal2.references.addressType.content && this.props.universal2.references.addressType.content.map((item) => {
                            return <Select.Option key={item.id}>{item.name}</Select.Option>;
                          })}
                      </Select>

                    )}
                  </FormItem>)


/*
                {this.props.form.getFieldDecorator('identitytype'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Select name={'identitytype'+record.key} style={{ width: 250 }} onChange={(e)=>{this.identValue(e, record, 'identitytype', 'identities')}}>
                    {this.props.universal.identifierType.content && this.props.universal.identifierType.content.map((item) => {
                      return <Select.Option key={item.id}>{item.name}</Select.Option>;
                    })}
                  </Select>
                )}*/
              },
            },
            {
              dataIndex: 'adressname',
              title: 'Адрес',
              width: '40%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('adressname'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'adressname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'adressname', "adresses")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'adressbeginDate',
              title: 'Дата начала действия',
              width: '13%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('adressbeginDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'adressbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'adressbeginDate', "adresses")}}/>)}
                </FormItem>)
              },
            },
            {
              dataIndex: 'adressendDate',
              title: 'Дата окончания действия',
              width: '15%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('adressendDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'adressendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'adressendDate', "adresses")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              title: 'Действие',
              dataIndex: 'operation',
              width: '10%',
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{marginTop: '-20px'}}>
                    <a onClick={() => this.remove('adresses',record.key, 'adressescount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
        {
          name: "contacts",
          title:"Контакты",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [{
            dataIndex: 'contacttype',
            title: 'Вид контакта',
            width: '15%',
            render: (text, record) => {
              return (
                <FormItem
                >
                  {this.props.form.getFieldDecorator('contacttype'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    /*<Input name={'contacttype'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'contacttype', "contacts")}}/>)}*/

                  <Select name={'contacttype'+record.key} style={{ width: 250 }} onChange={(e)=>{this.identValue(e, record, 'contacttype', "contacts")}}>
                    {this.props.universal2.references.contactType.content && this.props.universal2.references.contactType.content.map((item) => {
                      return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                    })}
                  </Select>
                  )}
                </FormItem>)
            },
          },
            {
              dataIndex: 'contactname',
              title: 'Контакт',
              width: '15%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('contactname'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'contactname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'contactname', "contacts")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'contactnote',
              title: 'Примечание',
              width: '30%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('contactnote'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'contactnote'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'contactnote', "contacts")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'contactbeginDate',
              title: 'Дата начала действия',
              width: '13%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('contactbeginDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'contactbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'contactbeginDate', "contacts")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              dataIndex: 'contactendDate',
              title: 'Дата окончания действия',
              width: '15%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('contactendDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'contactendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'contactendDate', "contacts")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              title: 'Действие',
              dataIndex: 'operation',
              width: '10%',
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{marginTop: '-20px'}}>
                    <a onClick={() => this.remove('contacts',record.key, 'contactscount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
        {
          name: "banks",
          title:"Банковские реквизиты",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
            {
              dataIndex: 'bank',
              title: 'Банк (БВУ)',
              width: '15%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('bank'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      /*<Input name={'bank'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'bank', "banks")}}/>)}*/
                      <Select name={'bank'+record.key} style={{ width: 250 }} onChange={(e)=>{this.identValue(e, record, 'bank', "banks")}}>
                      {this.props.universal2.references.bank.content && this.props.universal2.references.bank.content.map((item) => {
                        return <Select.Option key={item.id}>{item.bikCode+"  "+item.shortName}</Select.Option>;
                      })}
                      </Select>
                      )}
                  </FormItem>)
              },
            },
           /* {
              dataIndex: 'bankname',
              title: 'Наименование банка (краткое)',
              width: '25%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('bankname'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'bankname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'bankname', "banks")}}/>)}
                  </FormItem>)
              },
            },*/
            {
              dataIndex: 'iik',
              title: 'Счет (ИИК)',
              width: '10%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('iik'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'iik'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'iik', "banks")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'currency',
              title: 'Валюта счета',
              width: '10%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('currency'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Select name={'currency'+record.key} style={{ width: 150 }} onChange={(e)=>{this.identValue(e, record, 'currency', "banks")}}>
                        {this.props.universal.currencyType.content && this.props.universal.currencyType.content.map((item) => {
                          return <Select.Option key={item.id}>{item.name}</Select.Option>;
                        })}
                      </Select>
                    )}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'bankbeginDate',
              title: 'Дата начала действия',
              width: '13%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('bankbeginDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'bankbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'bankbeginDate', "banks")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              dataIndex: 'bankendDate',
              title: 'Дата окончания действия',
              width: '15%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('bankendDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'bankendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'bankendDate', "banks")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              title: 'Действие',
              dataIndex: 'operation',
              width: '10%',
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{marginTop: '-20px'}}>
                    <a onClick={() => this.remove('banks',record.key, 'bankscount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
        /*{
          name: "responses",
          title:"Ответственные лица",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
            {
              dataIndex: 'position',
              title: 'Должность',
              width: '10%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('position'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'position'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'position', "responses")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'surname',
              title: 'Фамилия',
              width: '10%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('surname'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'surname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'surname', "responses")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'name',
              title: 'Имя',
              width: '10%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('name'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'name'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'name', "responses")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'patronic',
              title: 'Отчество',
              width: '10%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('patronic'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'patronic'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'patronic', "responses")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'bdate',
              title: 'Дата рождения',
              width: '10%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('bdate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'bdate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'bdate', "responses")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              dataIndex: 'fio_parently_initials',
              title: 'Фамилия, имя, отчество в родительном падеже',
              width: '20%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('fio_parently_initials'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'fio_parently_initials'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'fio_parently_initials', "responses")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'fio_genitive_initials',
              title: 'Фамилия и инициалы в родительном падеже',
              width: '20%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('fio_genitive_initials'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'fio_genitive_initials'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'fio_genitive_initials', "responses")}}/>)}
                  </FormItem>)
              },
            },
            {
              title: 'Действие',
              dataIndex: 'operation',
              width: '10%',
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{marginTop: '-20px'}}>
                    <a onClick={() => this.remove('responses',record.key, 'responsescount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
        {
          name: "RegistrerSZs",
          title:"Данные о включении в регистр СЗ",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
            {
              dataIndex: 'registrbeginDate',
              title: 'Дата включения в регистр',
              width: '15%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('registrbeginDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'registrbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'registrbeginDate', "RegistrerSZs")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              dataIndex: 'registrendDate',
              title: 'Дата исключения из регистра',
              width: '15%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('registrendDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'registrendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'registrendDate', "RegistrerSZs")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              dataIndex: 'registr_reason',
              title: 'Причина исключения',
              width: '60%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('registr_reason'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'registr_reason'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'registr_reason', "RegistrerSZs")}}/>)}
                  </FormItem>)
              },
            },
            {
              title: 'Действие',
              dataIndex: 'operation',
              width: '10%',
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{marginTop: '-20px'}}>
                    <a onClick={() => this.remove('RegistrerSZs',record.key, 'RegistrerSZscount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },*/
        {
          name: "Industbase",
          title:"Производственная база",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
            {
              dataIndex: 'indusadress',
              title: 'Адрес',
              width: '60%',
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('indusadress'+record.key, {
                      rules: [{
                        required: true,
                        message: this.state.validatemessage,
                      }],
                    })(
                      <Input name={'indusadress'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'indusadress', "Industbase")}}/>)}
                  </FormItem>)
              },
            },
            {
              dataIndex: 'indusbeginDate',
              title: 'Дата начала',
              width: '15%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('indusbeginDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'indusbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'indusbeginDate', "Industbase")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              dataIndex: 'indusendDate',
              title: 'Дата окончания',
              width: '15%',
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator('indusendDate'+record.key, {
                    rules: [{
                      required: true,
                      message: this.state.validatemessage,
                    }],
                  })(
                    <DatePicker style={{width:'100%'}} name={'indusendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'indusendDate', "Industbase")}}/>
                  )}
                </FormItem>)
              },
            },
            {
              title: 'Действие',
              dataIndex: 'operation',
              width: '10%',
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{marginTop: '-20px'}}>
                    <a onClick={() => this.remove('Industbase',record.key, 'Industbasecount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
      ]
    };
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'references/load',
      code: 'knp',
    });
    dispatch({
      type: 'universal/getidentifierType',
      payload: {
        "start":0,
        "length":1000,
        "entity":"identifierType"
      },
    });
    dispatch({
      type: 'universal2/getList',
      payload: {
        "start":0,
        "length":1000,
        "entity":"addressType"
      },
    });
    dispatch({
      type: 'universal2/getList',
      payload: {
        "start":0,
        "length":1000,
        "entity":"contactType"
      },
    })
    dispatch({
      type: 'universal2/getList',
      payload: {
        "start":0,
        "length":1000,
        "entity":"bank"
      },
    })
    dispatch({
      type: 'universal/getcurrencyType',
      payload: {
        "start":0,
        "length":1000,
        "entity":"currencyType"
      },
    });
    dispatch({
      type: 'universal/getlegalForm',
      payload: {
        "start":0,
        "length":1000,
        "entity":"legalForm"
      },
    });
  }

  selecttypeagent = (e) => {
    /*        console.log(e.target.value);
    this.setState({
      panes: [
        this.state[e.target.value],
        ...this.state.panes.filter((item)=>{
          console.log(item);
          item.key !=='7'
        }),
      ]
    });*/
  }

  fieldOnChange = (filterItem, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [filterItem.name]: value
      }
    })
  };

  identValue = (e, record, name, arrname) => {
    this.setState({
      [arrname]: [
        ...this.state[arrname].filter((value)=> value.key!==record.key),
        {
          ...record,
          [name]:e
        }
      ]
    })
  }

  remove(table, key, count) {
    this.setState({
      [table]: [
        ...this.state[table].filter(item => key !==item.key)
      ],
      [count]: this.state[count]-1
    })
  }

  mainfiels=(e)=>{
    this.setState({
      data:{
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    })
  }

  sendserver = (e) => {
    //console.log(this.state.identities)
    this.props.form.validateFields(
      (err, values) => {
        if (!err) {
          console.log(values.isRural);
          /*console.log({
            "entity":"clinic",
            "alias":null,
            "data":{
              "shortName": values.shortName,
              "code": "1",
              "name": values.name,
              "dateBegin": values.dateBegin.format('DD.MM.YYYY'),
              "dateEnd": values.dateEnd.format('DD.MM.YYYY'),
              "legalForm": (this.props.universal.legalForm.content ? this.props.universal.legalForm.content : []).filter((item)=>{return item.id === values.legalForm}),
              "idendifiers": this.state.identities.map((item)=>{
                return {
                  "value": item.identityname,
                  "dateBegin": item.identitybeginDate.format('DD.MM.YYYY'),
                  "dateEnd": item.identityendDate.format('DD.MM.YYYY'),
                  "idendifierType": {
                    "id": item.identitytype
                  }
                }
              }),
              "bankAccounts": this.state.banks.map((item)=>{
                    return {
                      "accountNumber": item.iik,
                      "dateBegin": item.bankbeginDate.format('DD.MM.YYYY'),
                      "dateEnd": item.bankendDate.format('DD.MM.YYYY'),
                      "bank": {
                        "id": item.bank

                      },
                      "currencyType": {
                        "id": item.currency
                      }
                    }
              }),
              "addresses": this.state.adresses.map((item)=>{
                    return {
                      "addressText": item.adressname,
                      "dateBegin": item.adressbeginDate.format('DD.MM.YYYY'),
                      "dateEnd": item.adressendDate.format('DD.MM.YYYY'),
                      "addressType": {
                        "id": item.adresstype
                      }
                    }
              }),
              "contacts": this.state.contacts.map((item)=>{
                return {
                  "comment": item.contactnote,
                  "value": item.contactname,
                  "dateBegin": item.contactbeginDate,
                  "dateEnd": item.contactendDate,
                  "contactType": {
                  "id": item.contacttype
                }
                }

              }),
            }
          })*/
          //saveobject
          const { dispatch } = this.props;
          dispatch({
            type: 'universal/saveobject',
            payload: {
              "entity":"clinic",
              "alias":null,
              "data":{
                "shortName": values.shortName,
                "code": "1",
                "name": values.name,
                "isRural": values.isRural ? true : false,
                "dateBegin": values.dateBegin.format('DD.MM.YYYY'),
                "dateEnd": values.dateEnd.format('DD.MM.YYYY'),
                "legalForm": (this.props.universal.legalForm.content ? this.props.universal.legalForm.content : []).filter((item)=>{return item.id === values.legalForm}),
                "idendifiers": this.state.identities.map((item)=>{
                  return {
                    "value": item.identityname,
                    "dateBegin": item.identitybeginDate.format('DD.MM.YYYY'),
                    "dateEnd": item.identityendDate.format('DD.MM.YYYY'),
                    "idendifierType": {
                      "id": item.identitytype
                    }
                  }
                }),
                "bankAccounts": this.state.banks.map((item)=>{
                  return {
                    "accountNumber": item.iik,
                    "dateBegin": item.bankbeginDate.format('DD.MM.YYYY'),
                    "dateEnd": item.bankendDate.format('DD.MM.YYYY'),
                    "bank": {
                      "id": item.bank

                    },
                    "currencyType": {
                      "id": item.currency
                    }
                  }
                }),
                "addresses": this.state.adresses.map((item)=>{
                  return {
                    "addressText": item.adressname,
                    "dateBegin": item.adressbeginDate.format('DD.MM.YYYY'),
                    "dateEnd": item.adressendDate.format('DD.MM.YYYY'),
                    "addressType": {
                      "id": item.adresstype
                    }
                  }
                }),
                "contacts": this.state.contacts.map((item)=>{
                  return {
                    "comment": item.contactnote,
                    "value": item.contactname,
                    "dateBegin": item.contactbeginDate,
                    "dateEnd": item.contactendDate,
                    "contactType": {
                      "id": item.contacttype
                    }
                  }

                }),
              }
            },
          }).then((e)=>{
            Modal.success({
              title: 'Успешно сохранен',
              content: 'ID субьекта: '+e.id,
              onOk: () => {
                this.props.history.push("/contracts/v2/counteragent/main");
              }
            });
          })
            .catch((e) => {
              Modal.error({
                content: e.getResponseValue().data.Message ? (e.getResponseValue().data.Message) : "Ошибка на стороне сервера!"
              });
            });

        }
        else {
          this.setState({
            hasError:true
          })
        }
      },
    );
  }

  cancelform = () => {
    this.props.history.push("/contracts/v2/counteragent/main");
  }

  render() {
    const {panes, smarttabs} = this.state;
    const dateFormat = 'DD.MM.YYYY';
    const title = {fontSize:'15px', fontWeight: 'bold'};
    const titledata = {marginLeft:'0px', width:'80%'};
    const errStyle = {color: 'red', textAlign: 'right', fontSize: '17px', marginRight: '16px'}
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <ContentLayout
        contentName={"Форма регистрации субъекта здравоохранения"}
        breadcrumbRoutes={[{
          path: "/",
          breadcrumbName: "Главная"
        }, {
          path: "/contracts/v2/counteragent/main",
          breadcrumbName: "Субъекты здравоохранения"
        },{
          path: "/contracts/v2/counteragent/main/create",
          breadcrumbName: "Форма регистрации субъекта здравоохранения"
        },
        ]}>
        <Form layout={'horizontal'}>
          <Row>
            <div>
             {/* {this.state.isNew &&
              <div>
                <FormItem
                  label={<span style={title}>Краткое наименование</span>}
                  {...formItemLayout}
                >
                  <div style={titledata}>AО Нейрореабилитационный центр "Луч"</div>
                </FormItem>
                <FormItem
                  style={{marginBottom: '10px'}}
                  label={<span style={title}>Полное наименование</span>}
                  {...formItemLayout}
                >
                  <div style={titledata}>Aкционерное Общество Нейрореабилитационный центр "Луч"</div>
                </FormItem>
              </div>}*/}
              {/*<FormItem
                label={<span style={title}>Код контрагента</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('codeagent', {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                  initialValue: this.state.data.codeagent
                })(
                  <Input style={titledata} name='codeagent' onChange={(e)=>{this.mainfiels(e)}} disabled={this.state.isNew}/>)}
              </FormItem>*/}
              {/*style={{marginBottom: '10px'}}*/}
              {/*<Select  defaultValue="Организация" style={titledata} onChange={this.selecttypeagent}>
                  <Option value="orgpane">Организация</Option>
                  <Option value="fizpane">Индивидуальный предприниматель</Option>
                </Select>*/}
              <FormItem
                label={<span style={title}>Вид субъекта здравоохранения</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('radio-button')(
                <Radio.Group style={{marginTop: '8px'}} onChange={this.selecttypeagent}>
                  <Radio value="orgpane">Организация</Radio>
                  <Radio value="fizpane">Индивидуальный предприниматель</Radio>
                </Radio.Group>
                )}
              </FormItem>
              <FormItem
                label={<span style={title}>СЗ районного значения и села</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('isRural', { valuePropName: 'checked' })(
                  <Switch  style={{marginTop: '8px'}} name={'isRural'}/>
                )}
              </FormItem>
              <FormItem
                label={<span style={title}>Дата начала работы</span>}
                {...formItemLayout}
              >

                {getFieldDecorator('dateBegin')(
                  <DatePicker style={{ width:'180px'}} name={"dateBegin"} format={'DD.MM.YYYY'}/>
                )}
              </FormItem>
              <FormItem
                label={<span style={title}>Дата окончания работы</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('dateEnd')(
                  <DatePicker style={{ width:'180px'}} name={"dateBegin"} format={'DD.MM.YYYY'}/>
                )}
              </FormItem>
             {/* {this.state.isNew &&
              <div>
                <FormItem
                  label={<span style={title}>ОПФ</span>}
                  {...formItemLayout}
                >
                  <Select  defaultValue="AO" style={titledata} disabled>
                    <Option value="AO">АО "Акционерное Общество"</Option>
                    <Option value="TOO">ТОО "Товарищество с ограниченной ответственностью"</Option>
                  </Select>
                </FormItem>
                <FormItem
                  style={{marginBottom: '10px'}}
                  label={<span style={title}>Полное наименование</span>}
                  {...formItemLayout}
                >
                  <Input style={titledata} value='Нейрореабилитационный центр "Луч"' disabled/>
                </FormItem>
              </div>}*/}
            </div>
          </Row>
          <Row>
            <div style={{ margin: '0px 20px 0px 20px' }}>
              <Divider
                style={{ marginBottom: '20px' }}
              />
             {/* <Tabs
                tabPosition='top'
                style={{marginBottom:'20px', minHeight: '550px'}}
              >*/}
                <Tabs
                  className={styles.stepFormText}
                  type={"card"}
                  defaultActiveKey="form"
                  tabPosition={"left"}>
                { panes.map(pane =>{
                    return(
                      <TabPane tab={<span style={title}>{pane.title}</span>}  key={pane.key}>
                        <Card style={{ margin: '20px' }}>
                          {
                            pane.content.map((content)=>{
                              return(
                                <RendetField
                                  key={content.name}
                                  name={content.name}
                                  label={content.label}
                                  type={content.type}
                                  getFieldDecorator={getFieldDecorator}
                                  validatemessage={this.state.validatemessage}
                                  references={this.props.universal.legalForm.content ? this.props.universal.legalForm.content : []}
                                />
                              )})}
                        </Card>
                      </TabPane>
                    )
                  }
                )}
                { smarttabs.map(smarttab => {
                  return (
                    <TabPane tab={
                      <Badge count={this.state[smarttab.name+'count']} style={{ backgroundColor: '#1990FF' }}><div><span style={title}>{smarttab.title}</span></div></Badge>} key={smarttab.name}>
                      <div>
                        <Button onClick={()=>{
                          this.setState({
                          [smarttab.name]: [
                            ...this.state[smarttab.name],
                            {
                              ...smarttab.cols,
                              key: this.state[smarttab.name+'count'],
                            }
                          ],
                          [smarttab.name+'count']: this.state[smarttab.name+'count']+1
                        },()=>{
                        })}} type="primary" style={{ marginBottom: 16 }}>
                          Добавить
                        </Button>
                        <Table bordered={false} dataSource={this.state[smarttab.name]} columns={this.state.smarttabs.find(x => x.name === smarttab.name).columns} />
                      </div>
                    </TabPane>
                  )
                })}

              </Tabs>
            </div>
          </Row>
          <Row>
            {this.state.hasError && <div style={errStyle} className='ant-form-explain'>Пожалуйста заполните обязательные поля</div>}
            <Divider
              style={{ margin: '16px 10px 0 0', height: '2px' }}
            />
          </Row>
          <Row>
            <Col>
              <div style={{float: 'right', margin: '20px 20px 10px 0'}}>
                <Button
                  size={'large'}
                  style={{ marginRight: '20px'}}
                  type='primary'
                  onClick={(e)=>{this.sendserver(e)}}
                >
                  Добавить
                </Button>
                <Button
                  size={'large'}
                  onClick={(e)=>{this.cancelform()}}
                >
                  Отменить
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </ContentLayout>

    );
  };
}


export default connect(({ references, universal, loading }) => ({
  references,
  universal,
  loadingData: loading.effects['references/load'],
}))(CounterAgentNew);

{/* */}