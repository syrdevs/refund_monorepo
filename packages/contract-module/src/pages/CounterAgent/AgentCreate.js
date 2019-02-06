import React, { Component } from "react";
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
import moment from "moment";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { md: 6, xs: 24, sm: 24 },
  wrapperCol: { md: 18, xs: 24, sm: 24 }
};
const formRenderLayout = {
  labelCol: { md: 24, xs: 24, sm: 24 },
  wrapperCol: { md: 24, xs: 24, sm: 24 }
};
const Option = Select.Option;
const RenderformItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 17
  }
};


const RendetField = ({ name, label, local, type, getFieldDecorator, validatemessage, references, counteragent }) => {
  switch (type) {
    case "combobox": {
      return (
        <FormItem
          {...RenderformItemLayout}
          style={{ marginBottom: "24px" }}
          label={label}

        >
          {getFieldDecorator(name, {
            rules: [{
              required: false,
              message: validatemessage
            }],
            initialValue: counteragent[local] ? counteragent[local].id : null
          })(
            <Select key={name} style={{ marginLeft: "10px", width: "95%" }} name={name}>
              {references && references.map((item) => {
                return <Select.Option key={item.id} value={item.id} prop={item}>{item.nameRu}</Select.Option>;
              })}
            </Select>)}
        </FormItem>
      );
    }
    case "text": {
      return (
        <FormItem
          {...RenderformItemLayout}
          style={{ marginBottom: "24px" }}
          key={name}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: false,
              message: validatemessage
            }],
            initialValue: counteragent[local]
          })(
            <Input key={name} style={{ marginLeft: "10px", width: "95%" }} name={name}/>)}
        </FormItem>
      );
    }
    case "datePicker": {
      return (
        <FormItem
          {...RenderformItemLayout}
          style={{ marginBottom: "24px" }}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: false,
              message: validatemessage
            }],
            initialValue: counteragent[local] ? moment(counteragent[local], "DD.MM.YYYY") : null
          })(
            <DatePicker style={{ marginLeft: "10px", width: "95%" }} name={name} format={"DD.MM.YYYY"}/>
          )}
        </FormItem>
      );
    }
    default:
      break;
  }
};


@Form.create()
class AgentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        codeagent: null
      },
      panes: [
        {
          title: "Организация", content: [
            {
              name: "legalForm",
              local: "_organization",
              label: "Организационно-правовая форма",
              type: "combobox"
            },
            {
              name: "name",
              local: "name",
              label: "Наименование",
              type: "text"
            },
            {
              name: "fullName",
              local: "fullName",
              label: "Наименование полное",
              type: "text"
            },
            {
              name: "shortName",
              local: "shortName",
              label: "Наименование краткое",
              type: "text"
            }
          ], key: "7"
        }
      ],
      fizpane: {
        title: "Индивидуальный предприниматель", content: [
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
        ], key: "7"
      },
      orgpane: {
        title: "Организация", content: [
          {
            name: "org_form",
            label: "Организационно-правовая форма",
            type: "text"
          },
          {
            name: "name",
            label: "Наименование",
            type: "text"
          },
          {
            name: "fullName",
            label: "Наименование полное",
            type: "text"
          },
          {
            name: "shortName",
            label: "Наименование краткое",
            type: "text"
          }
        ], key: "7"
      },
      isNew: false,
      validatemessage: "Поле обязательно для заполнения",
      hasError: false,
      idents: [],
      identitiesarr: [],
      adressesarr: [],
      contactsarr: [],
      banksarr: [],
      responsesarr: [],
      RegistrerSZsarr: [],
      identities: [],
      adresses: [],
      contacts: [],
      banks: [],
      responses: [],
      RegistrerSZs: [],
      Industbase: [],
      smarttabs: [
        {
          name: "identities",
          title: "Идентификаторы",
          columns: [
            {
              title: "Идентификатор",
              dataIndex: "identitytype",
              type: "combobox",
              width: "15%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("identitytype" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.identities[record.key] ? (this.state.identities[record.key].identitytype ? this.state.identities[record.key].identitytype : null) : null
                    })(
                      <Select name={"identitytype" + record.key} key={"identitytype" + record.key}
                              style={{ width: 250 }} onChange={(e) => {
                        this.identValue(e, record, "identitytype", "identities");
                      }}>
                        {this.props.universal.identifierType.content && this.props.universal.identifierType.content.map((item) => {
                          return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>;
                        })}
                      </Select>
                    )}
                  </FormItem>);
              }
            },
            {
              title: "Значение",
              dataIndex: "identityname",
              width: "35%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("identityname" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.identities[record.key] ? this.state.identities[record.key].identityname : ""
                    })(
                      <Input
                        name={"identityname" + record.key}
                        key={"identityname" + record.key}
                        onChange={(e) => {
                          this.identValue(e.target.value, record, "identityname", "identities");
                        }}/>)}
                  </FormItem>);
              }
            },
            {
              title: "Дата начала действия",
              dataIndex: "identitybeginDate",
              width: "25%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("identitybeginDate" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.identities[record.key] ? (this.state.identities[record.key].identitybeginDate ? moment(this.state.identities[record.key].identitybeginDate, "DD.MM.YYYY") : null) : null
                    })(
                      <DatePicker style={{ width: "100%" }}
                                  key={"identitybeginDate" + record.key}
                                  name={"identitybeginDate" + record.key}
                                  format={"DD.MM.YYYY"}
                                  onChange={(e) => {
                                    this.identValue(e, record, "identitybeginDate", "identities");
                                  }}/>)}
                  </FormItem>
                );
              }
            },
            {
              title: "Дата окончания действия",
              dataIndex: "identityendDate",
              width: "20%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("identityendDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.identities[record.key] ? (this.state.identities[record.key].identityendDate ? moment(this.state.identities[record.key].identityendDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "100%" }}
                                key={"identityendDate" + record.key}
                                name={"identityendDate" + record.key}
                                format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "identityendDate", "identities");
                                }}/>)}
                </FormItem>);
              }
            },
            {
              title: "Действие",
              dataIndex: "operation",
              width: "10%",
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{ marginTop: "-20px" }}>
                    <a onClick={() => this.remove("identities", record.key)}>Удалить</a>
                  </div>
                );
              }
            }
          ]
        },
        {
          name: "adresses",
          title: "Адреса",
          columns: [
            {
              dataIndex: "adresstype",
              title: "Вид адреса",
              width: "20%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("adresstype" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.adresses[record.key] ? (this.state.adresses[record.key].adresstype ? this.state.adresses[record.key].adresstype : null) : null
                    })(
                      /*<Input name={'adresstype'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'adresstype', "adresses")}}/>*/

                      <Select name={"adresstype" + record.key} style={{ width: 250 }} onChange={(e) => {
                        this.identValue(e, record, "adresstype", "adresses");
                      }}>
                        {this.props.universal2.references.addressType.content && this.props.universal2.references.addressType.content.map((item) => {
                          return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>;
                        })}
                      </Select>
                    )}
                  </FormItem>);
              }
            },
            {
              dataIndex: "adressname",
              title: "Адрес",
              width: "40%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("adressname" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.adresses[record.key] ? this.state.adresses[record.key].adressname : ""
                    })(
                      <Input name={"adressname" + record.key} onChange={(e) => {
                        this.identValue(e.target.value, record, "adressname", "adresses");
                      }}/>)}
                  </FormItem>);
              }
            },
            {
              dataIndex: "adressbeginDate",
              title: "Дата начала действия",
              width: "13%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("adressbeginDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.adresses[record.key] ? (this.state.adresses[record.key].adressbeginDate ? moment(this.state.adresses[record.key].adressbeginDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "100%" }} name={"adressbeginDate" + record.key} format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "adressbeginDate", "adresses");
                                }}/>)}
                </FormItem>);
              }
            },
            {
              dataIndex: "adressendDate",
              title: "Дата окончания действия",
              width: "15%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("adressendDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.adresses[record.key] ? (this.state.adresses[record.key].adressendDate ? moment(this.state.adresses[record.key].adressendDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "100%" }} name={"adressendDate" + record.key} format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "adressendDate", "adresses");
                                }}/>
                  )}
                </FormItem>);
              }
            },
            {
              title: "Действие",
              dataIndex: "operation",
              width: "10%",
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{ marginTop: "-20px" }}>
                    <a onClick={() => this.remove("adresses", record.key)}>Удалить</a>
                  </div>
                );
              }
            }
          ]
        },
        {
          name: "contacts",
          title: "Контакты",
          columns: [
            {
              dataIndex: "contacttype",
              title: "Вид контакта",
              width: "15%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("contacttype" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.contacts[record.key] ? (this.state.contacts[record.key].contacttype ? this.state.contacts[record.key].contacttype : null) : null
                    })(
                      <Select name={"contacttype" + record.key} style={{ width: 250 }} onChange={(e) => {
                        this.identValue(e, record, "contacttype", "contacts");
                      }}>
                        {this.props.universal2.references.contactType.content && this.props.universal2.references.contactType.content.map((item) => {
                          return <Select.Option value={item.id} key={item.id}>{item.nameRu}</Select.Option>;
                        })}
                      </Select>
                    )}
                  </FormItem>);
              }
            },
            {
              dataIndex: "contactname",
              title: "Контакт",
              width: "15%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("contactname" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.contacts[record.key] ? this.state.contacts[record.key].contactname : ""
                    })(
                      <Input name={"contactname" + record.key} onChange={(e) => {
                        this.identValue(e.target.value, record, "contactname", "contacts");
                      }}/>)}
                  </FormItem>);
              }
            },
            {
              dataIndex: "contactnote",
              title: "Примечание",
              width: "30%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("contactnote" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.contacts[record.key] ? this.state.contacts[record.key].contactnote : ""
                    })(
                      <Input name={"contactnote" + record.key} onChange={(e) => {
                        this.identValue(e.target.value, record, "contactnote", "contacts");
                      }}/>)}
                  </FormItem>);
              }
            },
            {
              dataIndex: "contactbeginDate",
              title: "Дата начала действия",
              width: "13%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("contactbeginDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.contacts[record.key] ? (this.state.contacts[record.key].contactbeginDate ? moment(this.state.contacts[record.key].contactbeginDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "100%" }} name={"contactbeginDate" + record.key} format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "contactbeginDate", "contacts");
                                }}/>
                  )}
                </FormItem>);
              }
            },
            {
              dataIndex: "contactendDate",
              title: "Дата окончания действия",
              width: "15%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("contactendDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.contacts[record.key] ? (this.state.contacts[record.key].contactendDate ? moment(this.state.contacts[record.key].contactendDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "100%" }} name={"contactendDate" + record.key} format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "contactendDate", "contacts");
                                }}/>
                  )}
                </FormItem>);
              }
            },
            {
              title: "Действие",
              dataIndex: "operation",
              width: "10%",
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{ marginTop: "-20px" }}>
                    <a onClick={() => this.remove("contacts", record.key)}>Удалить</a>
                  </div>
                );
              }
            }
          ]
        },
        {
          name: "banks",
          title: "Банковские реквизиты",
          columns: [
            {
              dataIndex: "bank",
              title: "Банк (БВУ)",
              width: "10%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("bank" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.banks[record.key] ? (this.state.banks[record.key].bank ? this.state.banks[record.key].bank : null) : null
                    })(
                      /*<Input name={'bank'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'bank', "banks")}}/>)}*/
                      <Select name={"bank" + record.key} style={{ width: 250 }} onChange={(e) => {
                        this.identValue(e, record, "bank", "banks");
                      }}>
                        {this.props.universal2.references.bank.content && this.props.universal2.references.bank.content.map((item) => {
                          return <Select.Option value={item.id}
                                                key={item.id}>{item.bikCode + "  " + item.shortName}</Select.Option>;
                        })}
                      </Select>
                    )}
                  </FormItem>);
              }
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
              dataIndex: "iik",
              title: "Счет (ИИК)",
              width: "54%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("iik" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.banks[record.key] ? this.state.banks[record.key].iik : ""
                    })(
                      <Input name={"iik" + record.key} onChange={(e) => {
                        this.identValue(e.target.value, record, "iik", "banks");
                      }}/>)}
                  </FormItem>);
              }
            },
            {
              dataIndex: "currency",
              title: "Валюта счета",
              width: "10%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("currency" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.banks[record.key] ? (this.state.banks[record.key].currency ? this.state.banks[record.key].currency : " ") : " "
                    })(
                      <Select name={"currency" + record.key} style={{ width: 150 }} onChange={(e) => {
                        this.identValue(e, record, "currency", "banks");
                      }}>
                        {this.props.universal.currencyType.content && this.props.universal.currencyType.content.map((item) => {
                          return <Select.Option key={item.id}>{item.name}</Select.Option>;
                        })}
                      </Select>
                    )}
                  </FormItem>);
              }
            },
            {
              dataIndex: "bankbeginDate",
              title: "Дата начала действия",
              width: "10%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("bankbeginDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.banks[record.key] ? (this.state.banks[record.key].bankbeginDate ? moment(this.state.banks[record.key].bankbeginDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "100%" }} name={"bankbeginDate" + record.key} format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "bankbeginDate", "banks");
                                }}/>
                  )}
                </FormItem>);
              }
            },
            {
              dataIndex: "bankendDate",
              title: "Дата окончания действия",
              width: "13%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("bankendDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.banks[record.key] ? (this.state.banks[record.key].bankendDate ? moment(this.state.banks[record.key].bankendDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "100%" }} name={"bankendDate" + record.key} format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "bankendDate", "banks");
                                }}/>
                  )}
                </FormItem>);
              }
            },
            {
              title: "Действие",
              dataIndex: "operation",
              width: "13%",
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{ marginTop: "-20px" }}>
                    <a onClick={() => this.remove("banks", record.key)}>Удалить</a>
                  </div>
                );
              }
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
          title: "Производственная база",
          cols: {
            identitytype: null,
            identityname: null,
            identitybeginDate: null,
            identityendDate: null
          },
          columns: [
            {
              dataIndex: "indusadress",
              title: "Адрес",
              width: "50%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("indusadress" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }]
                    })(
                      <Select name={"bank" + record.key} style={{ width: '90%' }} onChange={(e) => {
                        this.identValue(e, record, "bank", "banks");
                      }}>
                        {this.state.adresses && this.state.adresses.map((item) => {
                          return <Select.Option value={item.adressname}
                                                key={item.adressname}>{item.adressname}</Select.Option>;
                        })}
                      </Select>
                    )}
                  </FormItem>);
              }
            },
            {
              dataIndex: "indusbeginDate",
              title: "Дата начала",
              width: "15%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("indusbeginDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }]
                  })(
                    <DatePicker style={{ width: "100%" }} name={"indusbeginDate" + record.key} format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "indusbeginDate", "Industbase");
                                }}/>
                  )}
                </FormItem>);
              }
            },
            {
              dataIndex: "indusendDate",
              title: "Дата окончания",
              width: "15%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("indusendDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }]
                  })(
                    <DatePicker style={{ width: "100%" }} name={"indusendDate" + record.key} format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "indusendDate", "Industbase");
                                }}/>
                  )}
                </FormItem>);
              }
            },
            {
              title: "Действие",
              dataIndex: "operation",
              width: "10%",
              render: (text, record) => {
                const { editable } = record;
                return (
                  <div style={{ marginTop: "-20px" }}>
                    <a onClick={() => this.remove("Industbase", record.key)}>Удалить</a>
                  </div>
                );
              }
            }
          ]
        }
      ],
      counteragent: {}
    };
  }
  /*identitiescount: 0,
     adressescount: 0,
     contactscount: 0,
     bankscount: 0,
     responsescount: 0,
     RegistrerSZscount: 0,
     Industbasecount: 0,*/

  componentDidMount() {
    if (this.props.location.query.id){
      const { dispatch } = this.props;
      dispatch({
        type: "universal/getobject",
        payload: {
          "entity": "clinic",
          "alias": null,
          "id": this.props.location.query.id
        }
      })
        .then((data) => {
          this.setState({
            counteragent: data
          }, () => {
            this.addmultifields(this.state.counteragent);
          });

        })
        .catch((e) => {
          Modal.error({
            //content: "Ошибка на стороне сервера!",
            content: e.getResponseValue().data ? (e.getResponseValue().data.Message) : "Ошибка на стороне сервера!",
            onOk: () => {
              this.props.history.push("/contracts/v2/counteragent/main");
            }
          });
        });
    }
    this.getlibs();
  }

  getlibs = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "references/load",
      code: "knp"
    });
    dispatch({
      type: "universal/getidentifierType",
      payload: {
        "start": 0,
        "length": 1000,
        "entity": "identifierType"
      }
    });
    dispatch({
      type: "universal2/getList",
      payload: {
        "start": 0,
        "length": 1000,
        "entity": "addressType"
      }
    });
    dispatch({
      type: "universal2/getList",
      payload: {
        "start": 0,
        "length": 1000,
        "entity": "contactType"
      }
    });
    dispatch({
      type: "universal2/getList",
      payload: {
        "start": 0,
        "length": 1000,
        "entity": "bank"
      }
    });
    dispatch({
      type: "universal/getcurrencyType",
      payload: {
        "start": 0,
        "length": 1000,
        "entity": "currencyType"
      }
    });
    dispatch({
      type: "universal/getlegalForm",
      payload: {
        "start": 0,
        "length": 1000,
        "entity": "legalForm",
        sort: [{field: "nameRu", 'asc': true}],
      }
    });
  };

  addmultifields = (data) => {
    let identities = data.idendifiers ? data.idendifiers.map((item, index) => {
      return {
        "identityname": item.value,
        "identitybeginDate": item.dateBegin ? moment(item.dateBegin, "DD.MM.YYYY") : null,
        "identityendDate": item.dateEnd ? moment(item.dateEnd, "DD.MM.YYYY") : null,
        "identitytype": item.idendifierType ? item.idendifierType.id : null,
        "key": index
      };
    }) : [];
    let bankAccounts = data.bankAccounts ? data.bankAccounts.map((item, index) => {
      return {
        "iik": item.accountNumber,
        "bankbeginDate": item.dateBegin ? moment(item.dateBegin, "DD.MM.YYYY") : null,
        "bankendDate": item.dateEnd ? moment(item.dateEnd, "DD.MM.YYYY") : null,
        "bank": item.bank ? item.bank.id : null,
        "currency": item.currencyType ? item.currencyType.id : null,
        "key": index
      };
    }) : [];
    let addresses = data.addresses ? data.addresses.map((item, index) => {
      return {
        "adressname": item.addressText,
        "adressbeginDate": item.dateBegin ? moment(item.dateBegin, "DD.MM.YYYY") : null,
        "adressendDate": item.dateEnd ? moment(item.dateEnd, "DD.MM.YYYY") : null,
        "adresstype": item.addressType ? item.addressType.id : null,
        "key": index
      };
    }) : [];
    let contacts = data.contacts ? data.contacts.map((item, index) => {
      return {
        "contactnote": item.comment,
        "contactname": item.value,
        "contactbeginDate": item.dateBegin ? moment(item.dateBegin, "DD.MM.YYYY") : null,
        "contactendDate": item.dateEnd ? moment(item.dateEnd, "DD.MM.YYYY") : null,
        "contacttype": item.contactType ? item.contactType.id : null,
        "key": index
      };
    }) : [];
    this.setState({
      identities: identities,
      adresses: addresses,
      banks: bankAccounts,
      contacts: contacts
    }, () => {
    });
  };

  selecttypeagent = (e) => {

  };

  fieldOnChange = (filterItem, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [filterItem.name]: value
      }
    });
  };

  identValue = (e, record, name, arrname) => {
    let findItemIdx = this.state[arrname].findIndex((value) => value.key === record.key);
    let _dataSource = this.state[arrname];
    _dataSource[findItemIdx] = {
      ...record,
      [name]: e
    };
    this.setState({
      [arrname]: _dataSource
    }, () => {
    });
  };

  remove(table, key) {
    let findItemIdx = this.state[table].findIndex((value) => value.key === key);
    let _dataSource = this.state[table].filter((x, i) => (i !== findItemIdx));

    this.setState({
      [table]: _dataSource.map((x, i) => {
        return { ...x, key: i };
      })
    });
  }

  mainfiels = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  sendserver = (e) => {
    this.props.form.validateFields(
      (err, values) => {
        if (!err) {
          this.saveobject(values);
        } else {
          this.setState({
            hasError: true
          });
        }
      }
    );
  };

  saveobject = (values) => {
    let attr = {
      "entity": "clinic",
      "alias": null,
      "data": {
        "shortName": values.shortName ? values.shortName : "",
        "fullName": values.fullName ? values.fullName : "",
        "code": "1",
        "name": values.name ? values.name : "",
        "isRural": values.isRural ? true : false,
        "dateBegin": values.dateBegin ? values.dateBegin.format("DD.MM.YYYY"): null,
        "dateEnd": values.dateEnd ? values.dateEnd.format("DD.MM.YYYY"): null,
        "_organization": values.legalForm ? (this.props.universal.legalForm.content ? this.props.universal.legalForm.content : []).filter((item) => {
          return item.id === values.legalForm;
        }) : undefined
      }
    };
    if (this.props.location.query.id) {
      attr.data.id = this.props.location.query.id;
    }
    if (this.state.identities) {
      attr.data.idendifiers = this.state.identities ? this.state.identities.map((item) => {

        let val = {
          "value": item.identityname ? item.identityname : null,
          "dateBegin": item.identitybeginDate ? item.identitybeginDate.format("DD.MM.YYYY") : null,
          "dateEnd": item.identityendDate ? item.identityendDate.format("DD.MM.YYYY") : null,
        };
        if (item.identitytype) {
          val = {
            ...val,
            "idendifierType": {
              "id": item.identitytype
            }
          }
        }
        return val;
      }) : undefined;
    }
    if (this.state.banks) {
      attr.data.bankAccounts = this.state.banks ? this.state.banks.map((item) => {
       let val = {
         "accountNumber": item.iik ? item.iik : '',
         "dateBegin": item.bankbeginDate ? item.bankbeginDate.format("DD.MM.YYYY") : null,
         "dateEnd": item.bankendDate ? item.bankendDate.format("DD.MM.YYYY") : null,
       }

        if (item.bank) {
          val = {
            ...val,
            "bank": {
              "id": item.bank ? item.bank : undefined
            },
          }
        }
        if (item.currency) {
          val = {
            ...val,
            "currencyType": {
              "id": item.currency ? item.currency : undefined
            }
          }
        }
        return val;
      }) : undefined;
    }
    if (this.state.adresses) {
      attr.data.addresses = this.state.adresses ? this.state.adresses.map((item) => {
        let val =  {
          "addressText": item.adressname,
          "dateBegin": item.adressbeginDate ? item.adressbeginDate.format("DD.MM.YYYY") : null,
          "dateEnd": item.adressendDate ? item.adressendDate.format("DD.MM.YYYY") : null,
        };
        if (item.adresstype) {
          val = {
            ...val,
            "addressType": {
              "id": item.adresstype
            }
          }
        }
        return val;
      }) : undefined;
    }
    if (this.state.contacts) {
      attr.data.contacts = this.state.contacts ? this.state.contacts.map((item) => {

        let val =  {
          "comment": item.contactnote,
          "value": item.contactname,
          "dateBegin": item.contactbeginDate ? item.contactbeginDate.format("DD.MM.YYYY") : null,
          "dateEnd": item.contactendDate ? item.contactendDate.format("DD.MM.YYYY") : null,
        };

        if (item.contacttype) {
          val = {
            ...val,
            "contactType": {
              "id": item.contacttype
            }
          }
        }
        return val;
      }) : undefined;
    }

    console.log("attr");
    console.log(attr);
    const { dispatch } = this.props;
    dispatch({
      type: "universal/saveobject",
      payload: attr
    })
      .then((e) => {
        Modal.success({
          title: "Успешно сохранен",
          content:  e.id ? "ID субьекта: "+e.id : "",
          onOk: () => {
            this.props.history.push("/contracts/v2/counteragent/main");
          }
        });
      })
      .catch((e) => {
        Modal.error({
          //content:  "Ошибка на стороне сервера!",
          content: e.getResponseValue().data.Message ? (e.getResponseValue().data.Message) : "Ошибка на стороне сервера!"
        });
      });
  };

  cancelform = () => {
    this.props.history.push("/contracts/v2/counteragent/main");
  };

  render() {
    const { panes, smarttabs } = this.state;
    const dateFormat = "DD.MM.YYYY";
    const title = { fontSize: "15px", fontWeight: "bold" };
    const titledata = { marginLeft: "0px", width: "80%" };
    const errStyle = { color: "red", textAlign: "right", fontSize: "17px", marginRight: "16px" };
    const {
      form: { getFieldDecorator }
    } = this.props;
    console.log(this.props.location.query.id)
    let  label = 'Форма создания субъекта здравоохранения'
    if (this.props.location.query.id) {
      label= 'Форма редактирование субъекта здравоохранения'
    }

    return (
      <ContentLayout
        contentName={label}
        breadcrumbRoutes={[{
          path: "/",
          breadcrumbName: "Главная"
        }, {
          path: "/contracts/v2/counteragent/main",
          breadcrumbName: "Субъекты здравоохранения"
        }, {
          path: "/contracts/v2/counteragent/main/create",
          breadcrumbName: label
        }
        ]}>
        <Form layout={"horizontal"}>
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
                {getFieldDecorator("radio-button", {
                  rules: [{
                    required: false
                  }],
                  initialValue: "orgpane"
                })(
                  <Radio.Group style={{ marginTop: "8px" }} onChange={this.selecttypeagent}>
                    <Radio value="orgpane">Организация</Radio>
                    <Radio value="fizpane">Индивидуальный предприниматель</Radio>
                  </Radio.Group>
                )}
              </FormItem>
              <FormItem
                label={<span style={title}>СЗ районного значения и села</span>}
                {...formItemLayout}
              >
                {getFieldDecorator("isRural", {
                  rules: [{
                    required: false
                  }],
                  valuePropName: "checked",
                  initialValue: this.state.counteragent.isRural
                })(
                  <Switch style={{ marginTop: "8px" }} name={"isRural"}/>
                )}
              </FormItem>
              <FormItem
                label={<span style={title}>Дата начала работы</span>}
                {...formItemLayout}
              >

                {getFieldDecorator("dateBegin", {
                  rules: [{
                    required: false
                  }],
                  initialValue: this.state.counteragent.dateBegin ? moment(this.state.counteragent.dateBegin, "DD.MM.YYYY") : null
                })
                (
                  <DatePicker style={{ width: "180px" }} name={"dateBegin"} format={"DD.MM.YYYY"}/>
                )}
              </FormItem>
              <FormItem
                label={<span style={title}>Дата окончания работы</span>}
                {...formItemLayout}
              >
                {getFieldDecorator("dateEnd", {
                  rules: [{
                    required: false
                  }],
                  initialValue: this.state.counteragent.dateEnd ? moment(this.state.counteragent.dateEnd, "DD.MM.YYYY") : null
                })
                (
                  <DatePicker style={{ width: "180px" }} name={"dateBegin"} format={"DD.MM.YYYY"}/>
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
            <div style={{ margin: "0px 20px 0px 20px" }}>
              <Divider
                style={{ marginBottom: "20px" }}
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
                {panes.map(pane => {
                    return (
                      <TabPane tab={<span style={title}>{pane.title}</span>} key={pane.key}>
                        <Card style={{ margin: "20px" }}>
                          {
                            pane.content.map((content) => {
                              return (
                                <RendetField
                                  key={content.name}
                                  name={content.name}
                                  label={content.label}
                                  local={content.local}
                                  type={content.type}
                                  getFieldDecorator={getFieldDecorator}
                                  validatemessage={this.state.validatemessage}
                                  references={this.props.universal.legalForm.content ? this.props.universal.legalForm.content : []}
                                  counteragent={this.state.counteragent}
                                />
                              );
                            })}
                        </Card>
                      </TabPane>
                    );
                  }
                )}


                {smarttabs.map(smarttab => {
                  return (
                    <TabPane tab={
                      <Badge count={this.state[smarttab.name].length} style={{ backgroundColor: "#1990FF", marginLeft:'5px'}}>
                        <div><span style={title}>{smarttab.title}</span></div>
                      </Badge>} key={smarttab.name}>
                      <div>
                        <Button onClick={() => {
                          this.setState({
                            [smarttab.name]: [
                              ...this.state[smarttab.name],
                              {
                                ...smarttab.cols,
                                key: this.state[smarttab.name].length
                              }
                            ]
                          }, () => {
                          });
                        }} type="primary" style={{ marginBottom: 16 }}>
                          Добавить
                        </Button>
                        <Table bordered={false} dataSource={this.state[smarttab.name]}
                               columns={this.state.smarttabs.find(x => x.name === smarttab.name).columns}/>
                      </div>
                    </TabPane>
                  );
                })}

              </Tabs>
            </div>
          </Row>
          <Row>
            {this.state.hasError &&
            <div style={errStyle} className='ant-form-explain'>Пожалуйста заполните обязательные поля</div>}
            <Divider
              style={{ margin: "16px 10px 0 0", height: "2px" }}
            />
          </Row>
          <Row>
            <Col>
              <div style={{ float: "right", margin: "20px 20px 10px 0" }}>
                <Button
                  size={"large"}
                  style={{ marginRight: "20px" }}
                  type='primary'
                  onClick={(e) => {
                    this.sendserver(e);
                  }}
                >
                  Сохранить
                </Button>
                <Button
                  size={"large"}
                  onClick={(e) => {
                    this.cancelform();
                  }}
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
  loadingData: loading.effects["references/load"]
}))(AgentCreate);

{/* */
}