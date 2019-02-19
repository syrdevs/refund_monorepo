import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  Table,
  Row,
  Col,
  Tabs,
  Card,
  Spin,
  Badge,
  Icon,
  InputNumber, Tag, Modal
} from "antd";
import "./style.css";

const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import formatMessage from "../../utils/formatMessage";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SmartGridView from "../../components/SmartGridView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import connect from "../../Redux";
import ActModal from "../Acts/ActModal";
import moment from "moment";
import DogovorModal from "../CounterAgent/Modals/DogovorModal";
import ContractModal from "../Acts/ContractModal";
import TabPageStyle from "../CounterAgent/TabPages/TabPages.less";
import DropDownAction from "../../components/DropDownAction/";
//import reduxRouter from 'umi/router';
import ContentLayout from "../../layouts/ContentLayout";

const TabPane = Tabs.TabPane;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 14
  }
};


@Form.create()
class ContractRequestsadd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createMode: null,
      actcolumns: [
        {
          title: "Учетный период(год)",
          dataIndex: "periodYear.year",
          isVisible: true
        },
        {
          title: "Учетный период(месяц)",
          dataIndex: "periodSection.name",
          isVisible: true
        },
        /*{
          title: "Подразделение",
          dataIndex: "division",
          isVisible: true
        },*/
        {
          title: "Номер",
          dataIndex: "number",
          isVisible: true
        },
        {
          title: "Дата",
          dataIndex: "documentDate",
          isVisible: true
        },
        {
          title: "Сумма предъявленная, т",
          dataIndex: "documentSumRequested",
          isVisible: true
        },
        {
          title: "Сумма принятая, т",
          dataIndex: "documentSumAccepted",
          isVisible: true
        },
        {
          title: "Сумма удержания аванса, т",
          dataIndex: "documentSumAdvanceTakeout",
          isVisible: true
        }
      ],
      actfcolumns: [
        {
          title: "Контрагент",
          dataIndex: "contragent",
          isVisible: true,
          width: 550,
          order: 3,
          key: "contragent",
          render: (item) => {
            if (item) {
              return item.bin + "  " + item.shortName;
            }
          }
        },
       /* {
          title: "Договор",
          dataIndex: "contract",
          order: 4,
          width: 500,
          key: "contract",
          isVisible: true,
          render: (item) => {
            if (item) {
              return item.contractType + " №" + item.number + " от " + item.documentDate;
            }
          }
        },
        {
          title: "Протокол",
          dataIndex: "protocol",
          order: 5,
          width: 200,
          key: "operation",
          isVisible: true,
          render: (e) => {
            if (e) {
              return "№" + e.number + " от " + e.documentDate;
            }
          }
        }*/
      ],
      contractcolumns: [

    /*{
          title: "Подразделение",
          dataIndex: "division",
          isVisible: true
        },*/
        {
          title: "Учетный период: год",
          dataIndex: "periodYear.year",
          isVisible: true
        },
        {
          title: "Вид договора",
          dataIndex: "contractType.shortname",
          isVisible: true
        },
        {
          title: "Номер",
          dataIndex: "number",
          isVisible: true
        },
        {
          title: "Дата",
          dataIndex: "documentDate",
          isVisible: true
        },
        {
          title: "Сумма договора",
          dataIndex: "documentSum",
          isVisible: true
        },
        /*{
          title: "Дата начала",
          dataIndex: "dateBegin",
          isVisible: true
        },
        {
          title: "Дата окончания",
          dataIndex: "dateEnd",
          isVisible: true
        },*/
        /*{
          title: "Статус",
          dataIndex: "documentStatus.statusName",
          isVisible: true
        },
        {
          title: "Файлы",
          dataIndex: "documentAttachmentsCount",
          isVisible: true
        }*/
        {
          title: "Сумма аванса",
          dataIndex: "documentSumAdvance",
          isVisible: true
        },


      ],
      contractfcolumn: [
        /*{
          order: 12,
          title: "Протокол распределения объемов",
          dataIndex: "planProtocol",
          isVisible: true,
          render: (text, record) => {
            if (record && record.planProtocol) {
              return <span style={{
                color: "#1890ff",
                textDecoration: "underline",
                cursor: "pointer"
              }}>№{record.planProtocol.number} от {record.planProtocol.documentDate}</span>;
            }
          }
        },
        {
          title: "Родительский договор",
          order: 11,
          dataIndex: "parentContract.number",
          isVisible: true,
          render: (text, record) => {
            if (record && record.parentContract) {
              return <span style={{
                color: "#1890ff",
                textDecoration: "underline",
                cursor: "pointer"
              }}>{record.parentContract.contractType.shortName} №{record.parentContract.number} от {record.parentContract.documentDate}</span>;
            }
            //!***
            ////<parentContract.contractType> №<parentContract.number> от <parentContract.documentDate>
          }
        },
        {
          title: "Заявка на объемы",
          dataIndex: "proposal",
          isVisible: true,
          order: 13,
          render: (text, record) => {
            if (record && record.proposal) {
              return <span style={{
                color: "#1890ff",
                textDecoration: "underline",
                cursor: "pointer"
              }}>№{record.proposal.number} от {record.proposal.documentDate}</span>;
            }
          }
        }*/
        {
          title: "Контрагент",
          dataIndex: "contragent",
          isVisible: true,
          width: 550,
          order: 3,
          key: "contragent",
          render: (item) => {
            if (item) {
              return item.bin + "  " + item.shortName;
            }
          }
        },
      ],
      speccolumns: [
        {
          "title": "Код",
          "dataIndex": "activity.code",
          "isVisible": "true"
        },
        {
          "title": "Вид деятельности",
          "dataIndex": "activity.name",
          "isVisible": "true",
          "width": "400"
        },
        {
          title: "Способ оплаты",
          dataIndex: "activity.paymentType.shortname",
          isVisible: true
        },
        /*{
          title: "Количество предъявленное",
          dataIndex: "valueRequested",
          isVisible: true
        },
        {
          title: "Количество принятое",
          dataIndex: "value",
          isVisible: true
        },*/
        //Контрагент
        {
          title: "Тариф, т",
          dataIndex: "",
          isVisible: true
        },
        {
          title: "Сумма предъявленная, т",
          dataIndex: "sumRequested",
          isVisible: true
        },
        {
          title: "Сумма принятая, т",
          dataIndex: "valueSum",
          isVisible: true
        },
        {
          title: "Сумма вычета аванса, т",
          dataIndex: "sumAdvanceTakeout",
          isVisible: true
        }
      ],
      workactcolumn:[
        {
          "title": "Учетный период: год",
          "dataIndex": "aperiodYear.year",
          "isVisible": "true"
        },
        {
          "title": "Учетный период: месяц",
          "dataIndex": "periodSection.name",
          "isVisible": "true",
        },
        {
          title: "Контрагент",
          dataIndex: "contragent.bin",
          isVisible: true
        },
        {
          "title": "Номер",
          "dataIndex": "number",
          "isVisible": "true"
        },
        {
          "title": "Дата",
          "dataIndex": "documentDate",
          "isVisible": "true",
        },
        {
          title: "Сумма предъявленная, т",
          dataIndex: "documentSumRequested",
          isVisible: true
        },
        {
          "title": "Сумма принятая, т",
          "dataIndex": "documentSumAccepted",
          "isVisible": "true"
        },
        {
          "title": "Сумма удержания аванса, т",
          "dataIndex": "documentSumAdvanceTakeout",
          "isVisible": "true",
        },
      ],
      workactfcolumn:[{
        title: "Контрагент",
        dataIndex: "contragent",
        order: 3,
        isVisible: true,
        width: 300,
        render: (text, index) => {
          //return text.bin+" "+text.shortName;
          return (text && text.bin)+" "+(text && text.shortName);
        }
      }],
      specfcolumn: [
        /*{
        title: "Единица учета",
        dataIndex: "measureUnit.nameRu",
        order: 3,
        isVisible: true,
        width: 300,
        render: (text, index) => {
          if (index.key === "total") {
            return "";
          }
          return (<Tag color="blue">{text}</Tag>);
        }
      }*/
        {
        title: "Контрагент",
        dataIndex: "contragent",
        order: 3,
        isVisible: true,
        width: 300,
        render: (text, index) => {
          //return text.bin+" "+text.shortName;
          return text ? (text.bin+" "+text.shortName) : "";
        }
      }
      ],
      specdata: [],
      contractData: [],
      actData: [],
      reqcontractData: [],
      reqactData: [],
      reqpaymentRequestItems:[],
      selectedRowKeys: [],
      ShowClear: true,
      ContractModal: false,
      ActModal: false,
      activities: [],
      loadData: false
    };
  }
  componentDidMount() {

    let createMode = "";

    if (this.props.location.query.hasOwnProperty("contractId")) {
      createMode = "contract";
    }

    if (this.props.location.query.hasOwnProperty("actId")) {
      createMode = "act";
    }

    if (this.props.location.query.hasOwnProperty("id")) {
      createMode = "request";
    }

    if (createMode.length === 0) {
      this.props.history.push("/contracts/v2/contractrequests/table");
    }

    this.setState({
      loadData: true,
      createMode: createMode
    }, () => {
      const { dispatch } = this.props;
      const DicArr = [
        {name:"periodYear", sort: "year", "desc":true},
        {name:"periodSection", sort: "nameRu", "desc":true},
        {name:"divisions", sort: "name", "desc":false},
        {name:"medicalType", sort: "nameRu", "desc":true},
        {name:"paymentRequestType", sort: "nameRu", "desc":true},
      ];
      DicArr.forEach(function(item) {
        dispatch({
          type: "universal/get" + item.name,
          payload: {
            "start": 0,
            "length": 1000,
            "entity": item.name,
            "sort":[{"field": item.sort, "desc": item.desc}]
          }
        });
      });
      this.loadData();
    });

  }
  findOneActById = (id) => {
    return this.props.dispatch({
      type: "universal2/getList",
      payload: {
        start: 0,
        length: 1,
        entity: "act",
        alias: "actList",
        filter: {
          id: id
        },
        sort: []
      }
    });
  };
  findOneContractById = (id) => {
    return this.props.dispatch({
      type: "universal2/getList",
      payload: {
        start: 0,
        length: 1,
        entity: "contract",
        alias: "contractList",
        filter: {
          id: id
        },
        sort: []
      }
    });
  };
  loadData = () => {
    const { dispatch } = this.props;
    /*if (this.state.createMode === "act") {

      this.findOneActById(this.props.location.query.actId)
        .then((actData) => {
          if (actData.content.length > 0) {

            this.setState({
              actData: actData.content
            }, () => {
              actData.content.forEach((item) => {
                dispatch({
                  type: "universal/getobject",
                  payload: {
                    "entity": "act",
                    "alias": null,
                    "id": item.id
                  }
                }).then(() => {
                  this.setState({
                    loadData: false,
                    specdata: this.props.universal.getObjectData._actItemValues ? this.state.specdata.concat(this.props.universal.getObjectData._actItemValues) : []
                  }, () => {
                    if (this.state.specdata.length > 0) {
                      this.setState({
                        specdata: this.state.specdata.concat([{
                          key: "total",
                          activity: {
                            code: "Итого:"
                          },
                          sumAdvanceTakeout: this.calculateRow("sumAdvanceTakeout", this.state.specdata),
                          sumRequested: this.calculateRow("sumRequested", this.state.specdata),
                          value: this.calculateRow("value", this.state.specdata),
                          valueRequested: this.calculateRow("valueRequested", this.state.specdata),
                          valueSum: this.calculateRow("valueSum", this.state.specdata)
                        }])
                      });
                    }
                  });
                });
              });
            });
          }
        });


    }
    if (this.state.createMode === "contract") {

      this.findOneContractById(this.props.location.query.contractId)
        .then((contractData) => {
          if (contractData.content.length > 0) {
            this.setState({
              contractData: contractData.content
            }, () => {
              contractData.content.forEach((item) => {
                dispatch({
                  type: "universal/getobject",
                  payload: {
                    "entity": "contract",
                    "alias": null,
                    "id": item.id
                  }
                }).then(() => {
                  this.setState({
                    loadData: false,
                    specdata: this.props.universal.getObjectData._contractItemValue ? this.state.specdata.concat(this.props.universal.getObjectData._contractItemValue) : []
                  }, () => {
                    if (this.state.specdata.length > 0) {
                      this.setState({
                        specdata: this.state.specdata.concat([{
                          key: "total",
                          activity: {
                            code: "Итого:"
                          },
                          sumAdvanceTakeout: this.calculateRow("sumAdvanceTakeout", this.state.specdata),
                          sumRequested: this.calculateRow("sumRequested", this.state.specdata),
                          value: this.calculateRow("value", this.state.specdata),
                          valueRequested: this.calculateRow("valueRequested", this.state.specdata),
                          valueSum: this.calculateRow("valueSum", this.state.specdata)
                        }])
                      });
                    }
                  });
                });
              });
            });
          }
        });
      return;


    }*/
    if (this.state.createMode === "request") {
      this.props.dispatch({
        type: "universal/getobject",
        payload: {
          "entity": "paymentRequest",
          "id": this.props.location.query.id
        }
      })
        .then(() => {
          if (this.props.universal.getObjectData.paymentRequestItems) {
            this.setState({
              reqpaymentRequestItems: this.props.universal.getObjectData.paymentRequestItems
            })
          }
          this.props.universal.getObjectData.documentSources && this.props.universal.getObjectData.documentSources.map((item)=>{

            if (item.documentSource.documentType.id === 269){
              this.setState({
                reqactData: [
                  ...this.state.reqactData,
                  item
                ]
              })
            }
            else if (item.documentSource.documentType.id === 283){
              this.setState({
                reqcontractData: [
                  ...this.state.reqcontractData,
                  item
                ]
              },()=>{
              })
            }
          });

          this.setState({
            actData: this.props.universal.getObjectData._sourceActs ? this.state.specdata.concat(this.props.universal.getObjectData._sourceActs) : [],
            contractData: this.props.universal.getObjectData._sourceContracts ? this.state.specdata.concat(this.props.universal.getObjectData._sourceContracts) : [],
            loadData: false,
            specdata: this.props.universal.getObjectData._paymentRequestItemValues ? this.state.specdata.concat(this.props.universal.getObjectData._paymentRequestItemValues) : [],

          }, () => {
            if (this.state.specdata.length > 0) {
              this.setState({
                specdata: this.state.specdata.concat([{
                  key: "total",
                  activity: {
                    code: "Итого:"
                  },
                  sumAdvanceTakeout: this.calculateRow("sumAdvanceTakeout", this.state.specdata),
                  sumRequested: this.calculateRow("sumRequested", this.state.specdata),
                  value: this.calculateRow("value", this.state.specdata),
                  valueRequested: this.calculateRow("valueRequested", this.state.specdata),
                  valueSum: this.calculateRow("valueSum", this.state.specdata)
                }])
              });
            }
          });
        });
    }

  };
  calculateRow = (name, data) => {
    let count = 0;
    data.forEach((item) => {
      if (!isNaN(item[name])) {
        count = count + item[name];
      }
    });
    return count;
  };
  changeSpec = () => {
    const { dispatch } = this.props;
    this.setState({
      specdata: []
    }, () => {
      if (this.state.createMode === "act") {
        this.state.actData.forEach((item) => {
          dispatch({
            type: "universal/getobject",
            payload: {
              "entity": "act",
              "alias": null,
              "id": item.id
            }
          }).then(() => {
            this.setState({
              specdata: this.props.universal.getObjectData._actItemValues ? this.state.specdata.concat(this.props.universal.getObjectData._actItemValues) : []
            });
          });
        });
      }
      if (this.state.createMode === "contract") {

        this.state.contractData.forEach((item) => {
          dispatch({
            type: "universal/getobject",
            payload: {
              "entity": "contract",
              "alias": null,
              "id": item.id
            }
          }).then(() => {
            this.setState({
              specdata: this.props.universal.getObjectData._contractItemValue ? this.state.specdata.concat(this.props.universal.getObjectData._contractItemValue) : []
            });
          });
        });
      }
    });
  };

  render() {
    let title = "Заявка";
    let periodYear = null;
    let getObjectData = {};


    if (this.state.createMode === "request" && Object.keys(this.props.universal.getObjectData).length > 0) {
      getObjectData = this.props.universal.getObjectData ? this.props.universal.getObjectData : {};
      title = "Заявка №" + getObjectData.number + " от " + getObjectData.documentDate;
      periodYear = getObjectData.periodYear.id;
    }
    else {
      let periodYearData = this.props.universal.getObjectData ? this.props.universal.getObjectData : {};
      periodYear = periodYearData.hasOwnProperty("periodYear") ? periodYearData.periodYear.id : null;
    }

    const { form, dispatch } = this.props;
    const { getFieldDecorator } = form;

    return (
      <ContentLayout
        contentName={title}
        breadcrumbRoutes={[{
          path: "/",
          breadcrumbName: "Главная"
        }, {
          path: "/contracts/v2/contractrequests/table",
          breadcrumbName: "Заявки"
        }, {
          path: "/contracts/v2/contractrequests/table",
          breadcrumbName: "Заявка"
        }]}>
        {this.state.ActModal &&
        <ActModal
          onSelect={(records) => {
            this.setState({
              ActModal: false,
              actData: records
            }, () => {
              this.changeSpec();
            });
          }}
          hide={() => this.setState({
            ActModal: false
          })
          }/>}
        {this.state.ContractModal &&
        <ContractModal
          onSelect={(records) => {
            this.setState({
              ContractModal: false,
              contractData: records
            }, () => {
              this.changeSpec();
            });
          }}
          hide={() => this.setState({
            ContractModal: false
          })
          }/>}
        <Card
          headStyle={{ padding: 0 }}
          style={{ padding: "10px" }}
          className={"headPanel"}
          extra={[<Button
            key={"submit_form_btn"}
            htmlType="submit"
            style={{ float: "left" }}
            onClick={() => {
              this.props.form.validateFields(
                (err, values) => {
                  if (!err) {
                    let uniqueItemData = {};
                    this.state.specdata.forEach((item) => {
                      if (!uniqueItemData[item.activity.id]) {
                        uniqueItemData[item.activity.id] = {
                          activity: item.activity,
                          Values: []
                        };
                      }
                      uniqueItemData[item.activity.id].Values.push(item);
                    });

                    let data = {
                      ...values,
                      documentDate: values.documentDate ? values.documentDate.format("DD.MM.YYYY") : "",
                      "documentSigneds": [],
                      "documentAttacments": [],
                      /*"paymentRequestItems": []*/
                    };

                    /*data.paymentRequestItems = [
                      {
                        "activity": {
                          "id": "32576777-c4a9-41c9-86c4-393bb29072ef"
                        },
                        "paymentRequestItemValues": [
                          {
                            "valueSum": 15,
                            "sumRequested": 0,
                            "sumAdvanceTakeout": 0,
                            "value": 1,
                            "currencyType": {
                              "id": "5cd4e565-10da-4b79-8578-ffdd5a0d8270"
                            },
                            "measureUnit": {
                              "id": "be88fc85-e565-43cd-a14a-7cdd46828f4c"
                            }
                          }
                        ]
                      }
                    ]*/
                    /*if (this.state.createMode === "contract") {

                      Object.keys(uniqueItemData).map((itemKey) => (itemKey)).forEach((item) => {

                        if (item != "undefined") {
                          data.paymentRequestItems.push({
                            activity: {
                              id: item
                            },
                            paymentRequestItemValues: this.state.specdata.map(x => {

                              if (x.activity.id === item) {
                                return {
                                  "valueSum": x.valueSum ? x.valueSum : 0,
                                  "sumRequested": x.sumRequested ? x.sumRequested : 0,
                                  "sumAdvanceTakeout": x.sumAdvanceTakeout ? x.sumAdvanceTakeout : 0,
                                  "value": x.value ? x.value : 0,
                                  "valueRequested": x.valueRequested ? x.valueRequested : 0,
                                  "measureUnit": {
                                    "id": x.measureUnit ? x.measureUnit.id : 0
                                  }

                                };
                              }
                            })
                          });
                        }

                      });
                      data.sourceContracts = this.state.contractData;
                    }
                    if (this.state.createMode === "act") {

                      Object.keys(uniqueItemData).map((itemKey) => (itemKey)).forEach((item) => {
                        if (item != "undefined") {
                          data.paymentRequestItems.push({
                            activity: {
                              id: item
                            },
                            paymentRequestItemValues: this.state.specdata.map(x => {
                              if (x.activity.id === item) {
                                return {
                                  "valueSum": x.valueSum ? x.valueSum : 0,
                                  "sumRequested": x.sumRequested ? x.sumRequested : 0,
                                  "sumAdvanceTakeout": x.sumAdvanceTakeout ? x.sumAdvanceTakeout : 0,
                                  "value": x.value ? x.value : 0,
                                  "valueRequested": x.valueRequested ? x.valueRequested : 0,
                                  "measureUnit": {
                                    "id": x.measureUnit ? x.measureUnit.id : 0
                                  }

                                };
                              }
                            })
                          });
                        }
                      });
                      data.sourceActs = this.state.actData;
                      data.periodSection = { id: this.state.actData[0].periodSection.id };
                    }*/


                    this.setState({
                      loadData: true
                    });

                    if (data.division.id === null || JSON.stringify(data.division) === "{}") {
                      delete data["division"];
                    }
                    if (data.periodYear.id === null || JSON.stringify(data.periodYear) === "{}") {
                      delete data["periodYear"];
                    }
                    if (data.paymentRequestType.id === null || JSON.stringify(data.paymentRequestType) === "{}") {
                      delete data["paymentRequestType"];
                    }
                    if (this.props.location.query.id){
                      data.id = this.props.location.query.id;
                    }
                    if (this.state.reqpaymentRequestItems.length){
                      data.paymentRequestItems = this.state.reqpaymentRequestItems;
                    }
                    data.documentSources = [];

                    this.state.reqactData.map((item)=>{
                      data.documentSources.push(item)
                    })

                    this.state.reqcontractData.map((item)=>{
                      data.documentSources.push(item)
                    })
                    console.log(data);
                    console.log(this.state.specdata);
                    dispatch({
                      type: "universal/saveobject",
                      payload: {
                        "entity": "paymentRequest",
                        "data": data
                      }
                    }).then(() => {
                      this.setState({
                        loadData: false
                      }, () => {
                        if (!this.props.universal.saveanswer.Message) {
                          Modal.info({
                            title: "Информация",
                            content: "Сведения сохранены"
                          });
                        }
                      });
                    });
                  }
                  else {

                  }
                }
              );
              //this.props.tomain();
              /*this.props.history.push({
                pathname: '/contract/acts/table',
                state: {
                  data:this.state.selectedRowKeys
                },
              });*/
            }}
          >
            Сохранить
          </Button>,
            <div key={"close_div"} style={{ float: "left" }}>
              <Button
                key={"close"}
                style={{ margin: "0px 0px 10px 10px" }} onClick={() => {

                if (this.state.createMode === "act") {
                  this.props.history.push("/contracts/v2/acts/table");
                }
                if (this.state.createMode === "contract") {
                  this.props.history.push("/contracts/v2/contracts/table");
                }
                if (this.state.createMode === "request") {
                  this.props.history.push("/contracts/v2/contractrequests/table");
                }

              }}>
                Закрыть
              </Button>
              {this.state.ShowClear &&
              <Button
                key={"clear"}
                style={{ margin: "0px 0px 10px 10px" }} onClick={() => {
                this.props.form.resetFields();
              }}>
                Очистить
              </Button>}
            </div>,
            <DropDownAction
              key={"report_action"}
              disabled={!this.props.location.query}
              contractId={this.props.location.query.id}
              entity={"paymentRequest"}
              type={2}/>]}
          bordered={false}
          bodyStyle={{ padding: 0 }}>
          <Row style={{ marginTop: "5px" }}>
            <Form layout="horizontal" hideRequiredMark>
              <Tabs
                type={"card"}
                className={"stepFormText"}
                defaultActiveKey="form"
                onChange={(e) => {
                  if (e === "form") {
                    this.setState({
                      ShowClear: true
                    });
                  }
                  else {
                    this.setState({
                      ShowClear: false
                    });
                  }
                }}
                tabPosition={"left"}
              >
                <TabPane tab="Титульная часть" key="form">
                  <Card style={{ marginLeft: "-10px" }}>
                    <div style={{ margin: "10px 0", maxWidth: "70%" }}>
                      <Form.Item {...formItemLayout} label="Учетный период: год">
                        {getFieldDecorator("periodYear.id", {
                          initialValue: periodYear ? periodYear : null,
                          rules: [{ required: false, message: "не заполнено" }]
                        })(
                          <Select
                            allowClear
                            style={{ width: "50%" }}
                          >
                            {this.props.universal.periodYear.content && this.props.universal.periodYear.content.map((item) => {
                              return <Select.Option key={item.id}>{item.year}</Select.Option>;
                            })}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Вид заявки">
                        {getFieldDecorator("paymentRequestType.id", {
                          initialValue: getObjectData ? (getObjectData.paymentRequestType ? getObjectData.paymentRequestType.id : null) : null,
                          rules: [{ required: false, message: "не заполнено" }]
                        })(
                          <Select
                            allowClear
                            disabled={this.props.location.query.id}
                          >
                            {this.props.universal.paymentRequestType.content && this.props.universal.paymentRequestType.content.map((item) => {
                              return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                            })}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Номер">
                        {getFieldDecorator("number", {
                          initialValue: getObjectData ? getObjectData.number : null,
                          rules: [{ required: false, message: "не заполнено" }]
                        })(<Input/>)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Дата">
                        {getFieldDecorator("documentDate", {
                          initialValue: getObjectData ? (getObjectData.documentDate ? moment(getObjectData.documentDate, "DD.MM.YYYY") : null) : null,
                          rules: [{ required: false, message: "не заполнено" }]
                        })(
                          <DatePicker
                            format={"DD.MM.YYYY"}
                            style={{width: "195px"}}
                            placeholder="Выберите дату"/>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Комментарий">
                        {getFieldDecorator("descr", {
                          initialValue: getObjectData ? getObjectData.descr : null,
                          rules: [{ required: false, message: "не заполнено" }]
                        })(
                          <TextArea rows={4}/>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Подразделение">
                        {getFieldDecorator("division.id", {
                          initialValue: getObjectData ? (getObjectData.division ? getObjectData.division.id : null) : null,
                          rules: [{ required: false, message: "не заполнено" }]
                        })(
                          <Select
                            allowClear
                          >
                            {this.props.universal.divisions.content && this.props.universal.divisions.content.map((item) => {
                              return <Select.Option key={item.id}>{item.name}</Select.Option>;
                            })}
                          </Select>
                        )}
                      </Form.Item>
                    </div>
                  </Card>
                </TabPane>
                {/*{this.state.createMode === "act" &&

                }
                {this.state.createMode === "contract" &&

                }*/}
                {((this.props.universal.getObjectData.paymentRequestType ? this.props.universal.getObjectData.paymentRequestType.code : null) === "3" ||
                (this.props.universal.getObjectData.paymentRequestType ? this.props.universal.getObjectData.paymentRequestType.code : null) === "4" ) &&
                <TabPane tab="Акт выполненных работ"
                         key="acts"
                >
                  <Card style={{ marginLeft: "-10px" }}>

                    <SmartGridView
                      name={"paymentAct"}
                      scroll={{ x: "auto" }}
                      searchButton={false}
                      fixedBody={true}
                      rowKey={"id"}
                      loading={false}
                      fixedHeader={false}
                      hideRefreshBtn={true}
                      hideFilterBtn={true}
                      rowSelection={true}
                      showExportBtn={true}
                      showTotal={true}
                      hidePagination={true}
                      columns={this.state.actcolumns}
                      actionColumns={this.state.actfcolumns}
                      sorted={true}
                      showTotal={true}
                      addonButtons={[

                      ]}
                      dataSource={{
                        total: this.state.actData.length,
                        pageSize: this.state.actData.length,
                        page: 1,
                        data: this.state.actData
                      }}
                    />
                    {/*<Button
                      onClick={() => {
                        this.setState({
                          ActModal: true
                        });
                      }}
                      key={"select_button"}
                      style={{ margin: "0px 0px 10px 5px" }}>Выбрать</Button>*/}

                  </Card>
                </TabPane>}
                {(this.props.universal.getObjectData.paymentRequestType ? this.props.universal.getObjectData.paymentRequestType.code : null) === "1" &&
                <TabPane tab="Договоры"
                         key="contracts"
                >
                  <Card style={{ marginLeft: "-10px" }}>
                    <SmartGridView
                      name={"contractform"}
                      scroll={{ x: "auto" }}
                      searchButton={false}
                      fixedBody={true}
                      rowKey={"id"}
                      loading={false}
                      fixedHeader={false}
                      hideRefreshBtn={true}
                      hideFilterBtn={true}
                      rowSelection={true}
                      showExportBtn={true}
                      showTotal={true}
                      hidePagination={true}
                      columns={this.state.contractcolumns}
                      actionColumns={this.state.contractfcolumn}
                      showTotal={true}
                      addonButtons={[]}
                      dataSource={{
                        total: this.state.contractData.length,
                        pageSize: this.state.contractData.length,
                        page: 1,
                        data: this.state.contractData
                      }}
                    />
                    {/*<Button
                      onClick={() => {
                        this.setState({
                          ContractModal: true
                        });
                      }}
                      key={"select_button"}
                      style={{ margin: "0px 0px 10px 5px" }}>Выбрать</Button>*/}
                  </Card>
                </TabPane>
                }

                <TabPane tab="Спецификация"
                         key="specifications"
                >
                  <Card style={{ marginLeft: "-10px" }}>
                    <div className={TabPageStyle.SpesPage}>
                      <SmartGridView
                        name={"requestspecform"}
                        scroll={{ x: "auto" }}
                        searchButton={false}
                        fixedBody={true}
                        rowKey={"id"}
                        loading={false}
                        fixedHeader={false}
                        hideRefreshBtn={true}
                        hideFilterBtn={true}
                        rowSelection={true}
                        showExportBtn={true}
                        showTotal={true}
                        hidePagination={true}
                        columns={this.state.speccolumns}
                        actionColumns={this.state.specfcolumn}
                        sorted={true}
                        onSort={(column) => {
                        }}
                        showTotal={true}
                        addonButtons={[]}
                        dataSource={{
                          total: this.state.specdata.length,
                          pageSize: this.state.specdata.length,
                          page: 1,
                          data: this.state.specdata
                        }}
                      />
                    </div>
                  </Card>
                </TabPane>

                {/*<TabPane tab="Акт выполненных работ"
                         key="workacts"
                >
                  <Card style={{ marginLeft: "-10px" }}>
                    <div className={TabPageStyle.SpesPage}>
                      <SmartGridView
                        name={"workactform"}
                        scroll={{ x: "auto" }}
                        searchButton={false}
                        fixedBody={true}
                        rowKey={"id"}
                        loading={false}
                        fixedHeader={false}
                        hideRefreshBtn={true}
                        hideFilterBtn={true}
                        rowSelection={true}
                        showExportBtn={true}
                        showTotal={true}
                        hidePagination={true}
                        columns={this.state.workactcolumn}
                        actionColumns={this.state.workactfcolumn}
                        sorted={true}
                        onSort={(column) => {
                        }}
                        showTotal={true}
                        addonButtons={[]}
                        dataSource={{
                          total: [].length,
                          pageSize: [].length,
                          page: 1,
                          data: []
                        }}
                      />
                    </div>
                  </Card>
                </TabPane>*/}
                <TabPane tab="Проводки"
                         key="provods"
                >
                </TabPane>
              </Tabs>
            </Form>
          </Row>
        </Card>
      </ContentLayout>
    );
  }
}

export default connect(({ universal, universal2, loading }) => ({
  universal,
  universal2,
  loadingperiodYear: loading.effects["universal/getperiodYear"],
  loadingperiodSection: loading.effects["universal/getperiodSection"],
  loadingorganization: loading.effects["universal/getorganization"],
  loadingmedicalType: loading.effects["universal/getmedicalType"],
  loadingpaymentRequestType: loading.effects["universal/getpaymentRequestType"]
}))(ContractRequestsadd);


/*console.log(Object.keys(uniqueItemData).map((itemKey)=>(uniqueItemData[itemKey]))[0].activity);

     console.log(Object.keys(uniqueItemData).map((itemKey)=>(uniqueItemData[itemKey].activity)));*/
/**/

/*Object.keys(uniqueItemData).map((itemKey)=>(itemKey)).forEach((item)=> {
  console.log(item);
})*/
//console.log(Array.from(new Set(this.state.specdata.map(item => item.activity))));
/*let payload = {
  "entity": "paymentRequest",
  "data":
    {
      ...values,
      documentDate: values.documentDate.format("DD.MM.YYYY"),
      "documentSigneds": [],
      "documentAttacments": [],
      "paymentRequestItems": []
    }
};



dispatch({
  type: 'universal/saveobject',
  payload: payload,
}).then(()=>{

});*/
