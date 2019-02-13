import React, { Component } from "react";
import {
  Tabs,
  Spin,
  Form,
  Divider,
  Button,
  Icon,
  Col,
  Dropdown,
  Card,
  Menu,
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
import Guid from "../../utils/Guid";
import request from "../../utils/request";
import hasRole from "../../utils/hasRole";
import formatMessage from "../../utils/formatMessage";

const SubMenu = Menu.SubMenu;
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
const smallRenderformItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};

const RendetField = ({ small, name, label, local, disabled, type, getFieldDecorator, validatemessage, references, counteragent }) => {
  let renderstyle = {
    ...RenderformItemLayout
  };
  if (small) {
    renderstyle = {
      ...smallRenderformItemLayout
    };
  }
  switch (type) {
    case "combobox": {
      return (
        <FormItem
          {...renderstyle}
          style={{ marginBottom: "24px" }}
          label={label}

        >
          {getFieldDecorator(name, {
            rules: [{
              required: false,
              message: validatemessage
            }],
            initialValue: counteragent ? (counteragent[local] ? counteragent[local].id : null) : null
          })(
            <Select key={name} style={{ marginLeft: "10px", width: "95%" }} name={name} disabled={disabled}>
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
          {...renderstyle}
          style={{ marginBottom: "24px" }}
          key={name}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: false,
              message: validatemessage
            }],
            initialValue: counteragent ? counteragent[local] : null
          })(
            <Input key={name} style={{ marginLeft: "10px", width: "95%" }} name={name} disabled={disabled}/>)}
        </FormItem>
      );
    }
    case "datePicker": {
      return (
        <FormItem
          {...renderstyle}
          style={{ marginBottom: "24px" }}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: false,
              message: validatemessage
            }],
            initialValue: counteragent ? (counteragent[local] ? moment(counteragent[local], "DD.MM.YYYY") : null) : null
          })(
            <DatePicker style={{ marginLeft: "10px", width: "195px" }} name={name} format={"DD.MM.YYYY"}
                        disabled={disabled}/>
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

      subMenuChild: [],
      data: {
        codeagent: null
      },
      panes: [
        {
          title: "Организация",
          content: [
            {
              name: "legalForm",
              local: "legalForm",
              label: "Организационно-правовая форма",
              type: "combobox",
              disabled: false
            },
            {
              name: "name",
              local: "name",
              label: "Наименование",
              type: "text",
              disabled: false
            },
            {
              name: "fullName",
              local: "fullName",
              label: "Наименование полное",
              type: "text",
              disabled: false
            },
            {
              name: "shortName",
              local: "shortName",
              label: "Наименование краткое",
              type: "text",
              disabled: false
            }
          ],
          key: "7"
        },
        {
          title: "Индивидуальный предприниматель",
          content: [
            /* {
               name: 'iin',
               local: 'iin',
               label: 'ИИН',
               type: 'iin',
               disabled: false,
             },*/
            {
              name: "firstName",
              local: "firstName",
              label: "Имя",
              type: "text",
              disabled: true
            },
            {
              name: "lastName",
              local: "lastName",
              label: "Фамилия",
              type: "text",
              disabled: true
            },
            {
              name: "patronymic",
              local: "patronymic",
              label: "Отчество",
              type: "text",
              disabled: true
            },
            {
              name: "sex",
              local: "sex",
              label: "Пол",
              type: "combobox",
              disabled: true
            },
            {
              name: "birthdate",
              local: "birthdate",
              label: "Дата рождения",
              type: "datePicker",
              disabled: true
            }
          ],
          key: "8"
        }
      ],
      fizpane: {
        title: "Индивидуальный предприниматель", content: [
          {
            name: "fiz_surname",
            label: "Вид идентификатора",
            type: "combobox"
          },
          {
            name: "fiz_name",
            label: "Имя",
            type: "text"
          },
          {
            name: "fiz_patronic",
            label: "Отчество",
            type: "text"
          },
          /*{
            name: 'sex',
            lib: "sex",
            label: 'Пол',
            type: 'combobox',
          },*/
          {
            name: "fio_genitive",
            label: "ФИО в родительном падеже",
            type: "text"
          },
          {
            name: "fiz_fio_genitive",
            label: "ФИО в родительном падеже",
            type: "text"
          },
          {
            name: "fiz_fio_genitive_initials",
            label: "Фамилия и инициалы в родительном падеже",
            type: "text"
          }
        ], key: "7"
      },
      orgpane: {
        title: "Организация", content: [
          {
            name: "legalForm",
            local: "legalForm",
            lib: "legalForm",
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
      clinicRegisters: [],
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
                      <DatePicker style={{ width: "195px" }}
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
                    <DatePicker style={{ width: "195px" }}
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
                        this.identValueAdress(e, record, "adresstype", "adresses");
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
                    <DatePicker style={{ width: "195px" }} name={"adressbeginDate" + record.key} format={"DD.MM.YYYY"}
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
                    <DatePicker style={{ width: "195px" }} name={"adressendDate" + record.key} format={"DD.MM.YYYY"}
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
                    <DatePicker style={{ width: "195px" }} name={"contactbeginDate" + record.key} format={"DD.MM.YYYY"}
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
                    <DatePicker style={{ width: "195px" }} name={"contactendDate" + record.key} format={"DD.MM.YYYY"}
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
                    <DatePicker style={{ width: "195px" }} name={"bankbeginDate" + record.key} format={"DD.MM.YYYY"}
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
                    <DatePicker style={{ width: "195px" }} name={"bankendDate" + record.key} format={"DD.MM.YYYY"}
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
              width: "35%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("indusadress" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.Industbase[record.key] ? (this.state.Industbase[record.key].id ? this.state.Industbase[record.key].id : null) : null
                    })(
                      <Select name={"bank" + record.key} style={{ width: "90%", maxWidth: "500px" }} onChange={(e) => {
                        this.identValue(e, record, "id", "Industbase");
                      }}>
                        {this.state.adresses && this.state.adresses.map((item) => {
                          return <Select.Option value={item.id}
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
              width: "20%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("indusbeginDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.Industbase[record.key] ? (this.state.Industbase[record.key].indusbeginDate ? moment(this.state.Industbase[record.key].indusbeginDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "195px" }} name={"indusbeginDate" + record.key} format={"DD.MM.YYYY"}
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
              width: "20%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("indusendDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.Industbase[record.key] ? (this.state.Industbase[record.key].indusendDate ? moment(this.state.Industbase[record.key].indusendDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "195px" }} name={"indusendDate" + record.key} format={"DD.MM.YYYY"}
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
              width: "25%",
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
        },
        {
          name: "clinicRegisters",
          title: "Включение в БДСЗ",
          columns: [
            {
              dataIndex: "clinicRegistersbeginDate",
              title: "Дата включения в БДСЗ",
              width: "25%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("clinicRegistersbeginDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.clinicRegisters[record.key] ?
                      (this.state.clinicRegisters[record.key].clinicRegistersbeginDate ? moment(this.state.clinicRegisters[record.key].clinicRegistersbeginDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "195px" }} name={"clinicRegistersbeginDate" + record.key}
                                format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "clinicRegistersbeginDate", "clinicRegisters");
                                }}/>
                  )}
                </FormItem>);
              }
            },
            {
              dataIndex: "clinicRegistersendDate",
              title: "Дата исключения из БДСЗ",
              width: "25%",
              render: (text, record) => {
                return (<FormItem
                >
                  {this.props.form.getFieldDecorator("clinicRegistersendDate" + record.key, {
                    rules: [{
                      required: false,
                      message: this.state.validatemessage
                    }],
                    initialValue: this.state.clinicRegisters[record.key] ?
                      (this.state.clinicRegisters[record.key].clinicRegistersendDate ? moment(this.state.clinicRegisters[record.key].clinicRegistersendDate, "DD.MM.YYYY") : null) : null
                  })(
                    <DatePicker style={{ width: "195px" }} name={"clinicRegistersendDate" + record.key}
                                format={"DD.MM.YYYY"}
                                onChange={(e) => {
                                  this.identValue(e, record, "clinicRegistersendDate", "clinicRegisters");
                                }}/>
                  )}
                </FormItem>);
              }
            },
            {
              dataIndex: "clinicRegistersreason",
              title: "Причина исключения",
              width: "40%",
              render: (text, record) => {
                return (
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator("clinicRegistersreason" + record.key, {
                      rules: [{
                        required: false,
                        message: this.state.validatemessage
                      }],
                      initialValue: this.state.clinicRegisters[record.key] ? this.state.clinicRegisters[record.key].clinicRegistersreason : ""
                    })(
                      <Input name={"clinicRegistersreason" + record.key} onChange={(e) => {
                        this.identValue(e.target.value, record, "clinicRegistersreason", "clinicRegisters");
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
                    <a onClick={() => this.remove("clinicRegisters", record.key)}>Удалить</a>
                  </div>
                );
              }
            }
          ]
        }
      ],
      counteragent: {},
      tabname: "orgpane",
      iin: ""
    };
  }

  /*identitiescount: 0,
     adressescount: 0,
     contactscount: 0,
     bankscount: 0,
     responsescount: 0,
     RegistrerSZscount: 0,
     Industbasecount: 0,*/

  /* {
              name: 'fio_genitive',
              local: 'fio_genitive',
              label: 'ФИО в родительном падеже',
              type: 'text',
            },
            {
              name: 'fiz_fio_genitive',
              local: 'fiz_fio_genitive',
              label: 'ФИО в родительном падеже',
              type: 'text',
            },
            {
              name: 'fiz_fio_genitive_initials',
              local: 'fiz_fio_genitive_initials',
              label: 'Фамилия и инициалы в родительном падеже',
              type: 'text',
            },*/
  componentDidMount() {
    this.getMenuActions();
    if (this.props.location.query.id) {
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
  };

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
        "entity": "representativeType"
      }
    });
    dispatch({
      type: "universal2/getList",
      payload: {
        "start": 0,
        "length": 1000,
        "entity": "sex"
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
        sort: [{ field: "nameRu", "asc": true }]
      }
    });
  };
  addmultifields = (data) => {
    if (data.representatives) {
      this.setState({
        iin: data.representatives.person ? (data.representatives.person.iin ? data.representatives.person.iin : "") : ""
      });
    }
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
        "id": item.id,
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

    let locations = data.locations ? data.locations.map((item, index) => {
      return {
        "id": item.address ? item.address.id : "",
        "indusadress": item.address ? item.address.addressText : "",
        "indusbeginDate": item.dateBegin ? moment(item.dateBegin, "DD.MM.YYYY") : null,
        "indusendDate": item.dateEnd ? moment(item.dateEnd, "DD.MM.YYYY") : null,
        "key": index
      };
    }) : [];

    let clinicRegisters = data.clinicRegisters ? data.clinicRegisters.map((item, index) => {
      return {
        "clinicRegistersbeginDate": item.dateBegin ? moment(item.dateBegin, "DD.MM.YYYY") : null,
        "clinicRegistersendDate": item.dateEnd ? moment(item.dateEnd, "DD.MM.YYYY") : null,
        "key": index
      };
    }) : [];
    this.setState({
      identities: identities,
      adresses: addresses,
      banks: bankAccounts,
      contacts: contacts,
      clinicRegisters: clinicRegisters,
      Industbase: locations
    });
  };
  selecttypeagent = (e) => {
    this.setState({
      tabname: e.target.value
    });
    /*if(e.target.value==="fizpane"){
      this.setState({
        panes: [this.state.fizpane]
      })
    }
    else  if(e.target.value==="orgpane"){
      this.setState({
        panes: [this.state.orgpane]
      })
    }*/
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
  identValueAdress = (e, record, name, arrname) => {
    let findItemIdx = this.state[arrname].findIndex((value) => value.key === record.key);
    let _dataSource = this.state[arrname];
    _dataSource[findItemIdx] = {
      ...record,
      id: Guid.newGuid(),
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
    let legals = [];
    if (values.legalForm) {
      legals = (this.props.universal.legalForm.content ? this.props.universal.legalForm.content : []).filter((item) => {
        return item.id === values.legalForm;
      });
    }

    let attr = {
      "entity": "clinic",
      "alias": null,
      "data": {
        "shortName": values.shortName ? values.shortName : "",
        "fullName": values.fullName ? values.fullName : "",
        "code": "1",
        "name": values.name ? values.name : "",
        "isRural": values.isRural ? true : false,
        "dateBegin": values.dateBegin ? values.dateBegin.format("DD.MM.YYYY") : null,
        "dateEnd": values.dateEnd ? values.dateEnd.format("DD.MM.YYYY") : null,
        "legalForm": legals.length ? legals[0] : undefined

      }
    };

    if (values.firstName) {
      attr.data.representatives = [
        {
          "dateBegin": values.dateBegin ? values.dateBegin.format("DD.MM.YYYY") : undefined,
          "person": {
            "iin": this.state.iin ? this.state.iin : undefined,
            "patronymic": values.patronymic ? values.patronymic : undefined,
            "firstName": values.firstName ? values.firstName : undefined,
            "lastName": values.lastName ? values.lastName : undefined,
            "birthdate": values.birthdate ? values.birthdate.format("DD.MM.YYYY") : undefined,
            "workPlace": "",
            "sex": {
              "id": values.sex ? values.sex : null
            }
          }
        }
      ];
    }
    if (this.props.location.query.id) {
      attr.data.id = this.props.location.query.id;
    }
    if (this.state.identities) {
      attr.data.idendifiers = this.state.identities ? this.state.identities.map((item) => {

        let val = {
          "value": item.identityname ? item.identityname : null,
          "dateBegin": item.identitybeginDate ? item.identitybeginDate.format("DD.MM.YYYY") : null,
          "dateEnd": item.identityendDate ? item.identityendDate.format("DD.MM.YYYY") : null
        };
        if (item.identitytype) {
          val = {
            ...val,
            "idendifierType": {
              "id": item.identitytype
            }
          };
        }
        return val;
      }) : undefined;
    }
    if (this.state.banks) {
      attr.data.bankAccounts = this.state.banks ? this.state.banks.map((item) => {
        let val = {
          "accountNumber": item.iik ? item.iik : "",
          "dateBegin": item.bankbeginDate ? item.bankbeginDate.format("DD.MM.YYYY") : null,
          "dateEnd": item.bankendDate ? item.bankendDate.format("DD.MM.YYYY") : null
        };

        if (item.bank) {
          val = {
            ...val,
            "bank": {
              "id": item.bank ? item.bank : undefined
            }
          };
        }
        if (item.currency) {
          val = {
            ...val,
            "currencyType": {
              "id": item.currency ? item.currency : undefined
            }
          };
        }
        return val;
      }) : undefined;
    }
    if (this.state.adresses) {
      attr.data.addresses = this.state.adresses ? this.state.adresses.map((item) => {
        let val = {
          "addressText": item.adressname,
          "dateBegin": item.adressbeginDate ? item.adressbeginDate.format("DD.MM.YYYY") : null,
          "dateEnd": item.adressendDate ? item.adressendDate.format("DD.MM.YYYY") : null,
          "id": item.id ? item.id : null
        };
        if (item.adresstype) {
          val = {
            ...val,
            "addressType": {
              "id": item.adresstype
            }
          };
        }
        return val;
      }) : undefined;
    }
    if (this.state.contacts) {
      attr.data.contacts = this.state.contacts ? this.state.contacts.map((item) => {

        let val = {
          "comment": item.contactnote,
          "value": item.contactname,
          "dateBegin": item.contactbeginDate ? item.contactbeginDate.format("DD.MM.YYYY") : null,
          "dateEnd": item.contactendDate ? item.contactendDate.format("DD.MM.YYYY") : null
        };

        if (item.contacttype) {
          val = {
            ...val,
            "contactType": {
              "id": item.contacttype
            }
          };
        }
        return val;
      }) : undefined;
    }
    if (this.state.clinicRegisters) {
      attr.data.clinicRegisters = this.state.clinicRegisters ? this.state.clinicRegisters.map((item) => {

        let val = {
          "dateBegin": item.clinicRegistersbeginDate ? item.clinicRegistersbeginDate.format("DD.MM.YYYY") : null,
          "dateEnd": item.clinicRegistersendDate ? item.clinicRegistersendDate.format("DD.MM.YYYY") : null,
          "clinicRole": 0
        };
        return val;
      }) : undefined;
    }
    if (this.state.Industbase) {
      attr.data.locations = this.state.Industbase ? this.state.Industbase.map((item) => {

        let val = {
          "dateBegin": item.indusbeginDate ? item.indusbeginDate.format("DD.MM.YYYY") : null,
          "dateEnd": item.indusendDate ? item.indusendDate.format("DD.MM.YYYY") : null
        };
        if (item.id) {
          val = {
            ...val,
            "address": {
              "id": item.id
            }
          };
        }
        return val;
      }) : undefined;
    }
    const { dispatch } = this.props;
    dispatch({
      type: "universal/saveobject",
      payload: attr
    })
      .then((e) => {
        Modal.success({
          title: "Успешно сохранен",
          content: e.id ? "ID субьекта: " + e.id : "",
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
  ChangeText = (e) => {
    const { dispatch } = this.props;
    this.setState({
      iin: e.target.value
    }, () => {
      if (this.state.iin.length === 12) {
        dispatch({
          type: "universal2/getPersonByIIN",
          payload: {
            "iin": this.state.iin
          }
        })
          .then((e) => {
            if (this.state.counteragent.representatives) {
              this.setState({
                counteragent: {
                  ...this.state.counteragent,
                  representatives: [{
                    ...this.state.counteragent.representatives[0],
                    person: {
                      ...e
                    }
                  }]
                }
              }, () => {
                this.setIINs(e);
              });
            }
            else {
              this.setState({
                counteragent: {
                  ...this.state.counteragent,
                  representatives: [{
                    person: {
                      ...e
                    }
                  }]
                }
              }, () => {
                this.setIINs(e);
              });
            }
          })
          .catch((e) => {
            this.clearIINs();
            Modal.error({
              content: "ИИН не найден!"
            });
          });
      }
      else {
        /*this.props.form.validateFields(
          (err, values) => {
            if (values.firstName) {
              this.clearIINs();

            }
          })*/
        this.clearIINs();
      }
    });
  };
  clearIINs = () => {
    if (this.state.counteragent.representatives) {
      this.setState({
        counteragent: {
          ...this.state.counteragent,
          representatives: [{
            ...this.state.counteragent.representatives[0],
            person: {}
          }]
        }
      }, () => {
        this.props.form.resetFields(["firstName", "patronymic", "lastName", "birthdate", "sex"]);
      });
    }
    else {
      this.setState({
        counteragent: {
          ...this.state.counteragent,
          representatives: [{
            person: {}
          }]
        }
      }, () => {
        this.props.form.resetFields(["firstName", "patronymic", "lastName", "birthdate", "sex"]);
      });
    }
  };
  setIINs = (e) => {
    this.props.form.setFieldsValue({
      firstName: e.firstName ? e.firstName : null,
      patronymic: e.patronymic ? e.patronymic : null,
      lastName: e.lastName ? e.lastName : null,
      ///birthdate:e.birthdate ? e.birthdate : null,
      sex: e.sex ? e.sex.id : null
    });
  };

  getMenuActions = () => {
    request("/api/uicommand/getList", {
      method: "POST",
      body: {
        "start": 0,
        "length": 20,
        "entity": "contractType",
        "filter": {
          "basicContractType.code": "1"
        }
      },
      getResponse: (response) => {
        if (response.status === 200) {
          this.setState({
            subMenuChild: response.data.content && response.data.content
          });
        }
      }
    });
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
    let label = "Форма создания субъекта здравоохранения";
    if (this.props.location.query.id) {
      label = "Форма редактирование субъекта здравоохранения";
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
            <Col>
              <div style={{ float: "left", margin: "0px 0px 10px 0" }}>
                <Button
                  onClick={(e) => {
                    this.cancelform();
                  }}
                >
                  Закрыть
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  type='primary'
                  onClick={(e) => {
                    this.sendserver(e);
                  }}
                >
                  Сохранить
                </Button>
                { this.props.location.query && this.props.location.query.id &&
                <Dropdown key={"dropdown"} trigger={["click"]} overlay={<Menu>
                  <SubMenu
                    disabled={hasRole(["ADMIN"])}
                    key="register_document"
                    title="Создать договор">
                    {this.state.subMenuChild && this.state.subMenuChild
                      .map((menuItem) => (<Menu.Item
                        onClick={() => {
                          this.props.history.push("/contracts/v2/contracts/create?counterAgentId=" + this.props.location.query.id + "&contractTypeId=" + menuItem.id);
                        }}
                        key={menuItem.id}>{menuItem.shortName}</Menu.Item>))}
                  </SubMenu>
                </Menu>}>
                  <Button
                    style={{ marginLeft: "5px" }}
                    key={"action"}>{formatMessage({ id: "menu.mainview.actionBtn" })} <Icon
                    type="down"/></Button>
                </Dropdown>}
              </div>
            </Col>
          </Row>
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
                  initialValue: this.state.tabname//"orgpane"
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
                  <DatePicker style={{ width: "195px" }} name={"dateBegin"} format={"DD.MM.YYYY"}/>
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
                  <DatePicker style={{ width: "195px" }} name={"dateBegin"} format={"DD.MM.YYYY"}/>
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
                    if (pane.key === "7") {
                      return (
                        <TabPane tab={<span style={title}>{pane.title}</span>} key={pane.key}>
                          <Card style={{ margin: "20px" }}>
                            {
                              pane.content.map((content) => {
                                return (
                                  <RendetField
                                    key={content.name}
                                    small={false}
                                    name={content.name}
                                    label={content.label}
                                    local={content.local}
                                    disabled={content.disabled}
                                    type={content.type}
                                    getFieldDecorator={getFieldDecorator}
                                    validatemessage={this.state.validatemessage}
                                    references={this.props.universal.legalForm.content ? this.props.universal.legalForm.content : []}
                                    counteragent={this.state.counteragent && this.state.counteragent._organization}
                                  />
                                );
                              })}
                          </Card>
                        </TabPane>
                      );
                    }
                    else if (pane.key === "8") {
                      return (
                        <TabPane tab={<span style={title}>{pane.title}</span>} key={pane.key}>
                          <Card style={{ margin: "20px" }}>
                            <FormItem
                              {...smallRenderformItemLayout}
                              style={{ marginBottom: "24px" }}
                              label={"ИИН"}
                            >
                              <Input key={"iin"} style={{ marginLeft: "10px", width: "30%" }} maxLength={12}
                                     value={this.state.iin} onChange={(e) => {
                                this.ChangeText(e);
                              }}/>
                            </FormItem>
                            {
                              pane.content.map((content) => {
                                return (
                                  <RendetField
                                    key={content.name}
                                    small={true}
                                    name={content.name}
                                    label={content.label}
                                    local={content.local}
                                    disabled={content.disabled}
                                    type={content.type}
                                    getFieldDecorator={getFieldDecorator}
                                    validatemessage={this.state.validatemessage}
                                    references={this.props.universal2.references.sex && (this.props.universal2.references.sex.content ? this.props.universal2.references.sex.content : [])}
                                    counteragent={this.state.counteragent.representatives && this.state.counteragent.representatives[0].person}
                                  />
                                );
                              })}
                          </Card>
                        </TabPane>
                      );
                    }
                  }
                )}


                {smarttabs.map(smarttab => {
                  return (
                    <TabPane tab={
                      <Badge count={this.state[smarttab.name].length}
                             style={{ backgroundColor: "#1990FF", marginLeft: "5px" }}>
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

        </Form>
      </ContentLayout>

    );
  };
}


export default connect(({ references, universal, universal2, loading }) => ({
  references,
  universal,
  universal2,
  loadingData: loading.effects["references/load"]
}))(AgentCreate);

{/* */
}