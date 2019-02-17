import React, { Component } from "react";
import formatMessage from "../../utils/formatMessage";
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Modal, Spin } from "antd";
import {
  ContragentsPage,
  GraphicPage,
  SpecPage,
  InfoPage,
  DogovorPage,
  InfoPageFromCounter,
  ProductionBasePage
} from "./TabPages";
//import reduxRouter from 'umi/router';
import "./CounterAgent.css";
import moment from "moment";
import connect from "../../Redux";
import AttachmentPage from "./TabPages/AttachmentPage";
import Guid from "../../utils/Guid";
import ContentLayout from "../../layouts/ContentLayout";
import request from "../../utils/request";


///warning
// counteragent alu kerek
// dogovoror alu kerek

const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 14
  }
};

@Form.create()
class CounterAgentCreate extends Component {
  state = {

    createMode: null,


    //if mode is counterAgent
    counterAgentData: {
      counterAgent: {},
      contractItems: {}
    },

    dataStoreGuid: Guid.newGuid(),

    SpecData: {},
    SpecPageForceRendered: false,

    eventManager: {
      _events: {},
      handleEvent: (evName, params, cb) => {
        if (!this.state.eventManager._events[evName]) return [];//throw new Error('eventName not registered');

        return this.state.eventManager._events[evName](params, cb);
      },
      subscribe: (evName, fn) => {
        this.state.eventManager._events[evName] = fn;
      }
    },
    specifyData: []
  };

  findCounterAgentById = (id) => {

    request("/api/uicommand/getObject", {
      method: "POST",
      body: {
        "entity": "clinic",
        "alias": null,
        id: id
      },
      getResponse: (response) => {
        if (response.status === 200) {
          this.setState({
            counterAgentData: {
              counterAgent: response.data
            }
          });
        }
      }
    });

    // this.props.dispatch({
    //   type: "universal2/getList",
    //   payload: {
    //     start: 0,
    //     length: 1,
    //     alias: "clinicList",
    //     entity: "clinic",
    //     filter: {
    //       id: id
    //     },
    //     sort: []
    //   }
    // });
  };
  findContractById = (id) => {
    this.props.dispatch({
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

  getSubContractById = (contractId, contractTypeId) => {
    const { dispatch } = this.props;

    dispatch({
      type: "universal/getSubContract",
      payload: {
        "contractId": contractId,
        "contractTypeId": contractTypeId
      }
    }).then(() => {
      this.props.form.resetFields();
    });
  };

  getCounterAgentById = ({ id, contractTypeId, documentDate, yearId }) => {
    /*if (this.state.createMode !== "counterAgent") return;*/

    request("/api/uicommand/createObject", {
      method: "POST",
      body: {
        "entity": "contract",
        "alias": null,
        "dataAlias": "initialize",
        "data": {
          "documentDate": documentDate,
          "periodYear": {
            "search": [
              "year"
            ],
            "year": yearId
          },
          "contractType": {
            "id": contractTypeId
          },
          "contractPartys": [
            {
              "organization": {
                "id": id
              },
              "contractRole": {
                "search": [
                  "code"
                ],
                "code": 2
              }
            }
          ]
        },
        "parameters": {}
      },
      getResponse: (response) => {

        if (response.status === 200) {
          this.setState(prevState => ({
            counterAgentData: {
              ...prevState.counterAgentData,
              ...response.data
            }
          }), () => {
            this.state.eventManager.handleEvent("SpecPageRefreshState");
          });
        } else if (response.status === 400) {
          Modal.error({
            title: "Ошибка",
            content: response.data && response.data.Message
          });
        }
      }
    });

    // dispatch({
    //   type: "universal/getCounterAgentData",
    //   payload: {
    //     "contragentId": id,
    //     "year": year
    //   }
    // }).then(() => {
    //   this.props.form.resetFields();
    //   this.setState({
    //     dataStoreGuid: Guid.newGuid()
    //   });
    // });

  };

  sendForm = (data) => {

    const { dispatch } = this.props;

    let SpecFormData = this.state.eventManager.handleEvent("onSpecFormSubmit");

    //todo check model
    let sendModel = {
      "entity": "contract",
      "alias": null,
      "data": {
        "documentSources": this.state.createMode === "counterAgent" && this.state.counterAgentData.documentSources ? this.state.counterAgentData.documentSources : null,
        "contractLocations": this.state.createMode === "counterAgent" && this.state.counterAgentData.contractLocations ? this.state.counterAgentData.contractLocations : [],
        "contractParties": this.state.createMode === "counterAgent" && this.state.counterAgentData.contractParties ? this.state.counterAgentData.contractParties : [],
        "contractItems": SpecFormData.length === 0 ? (this.state.createMode === "counterAgent" && this.state.counterAgentData.contractItems ? this.state.counterAgentData.contractItems : SpecFormData) : SpecFormData
      }
    };

    if (data.period !== null && data.period.length > 0) {
      sendModel.data.dateBegin = moment(data.period[0]).format("DD.MM.YYYY");

      if (data.period[1])
        sendModel.data.dateEnd = moment(data.period[1]).format("DD.MM.YYYY");
    }


    /*
    *  'number': data.number,
        'parentContract': {
          'id': data.parentContract.value.id,
        },
        'division': {
          'id': data.divisions,
        },
        'periodYear': {
          'id': data.periodYear,
        },
        'contractType': {
          'id': data.contractType,
        },
    * */

    if (data.number) {
      sendModel.data.number = data.number;
    }

    if (data.parentContract && data.parentContract.value) {
      sendModel.data.parentContract = {
        id: data.parentContract.value.id
      };
    }

    if (data.divisions) {
      sendModel.data.division = {
        id: data.divisions
      };
    }

    if (data.periodYear) {
      sendModel.data.periodYear = {
        "id": data.periodYear
      };
    }

    if (data.contractType) {
      sendModel.data.contractType = {
        "id": data.contractType
      };
    }

    if (data.descr) {
      sendModel.data.descr = data.descr;
    }

    if (data.documentDate)
      sendModel.data.documentDate = moment(data.documentDate).format("DD.MM.YYYY");

    if (data.contractAlternation) {
      sendModel.data.contractAlterationReasons = data.contractAlternation.map(x => ({
        "dictionaryBase": {
          id: x
        }
      }));

    }


    request("/api/uicommand/saveObject", {
      method: "POST",
      body: sendModel,
      getResponse: (response) => {
        if (response.status === 200) {
          Modal.info({
            title: "Информация",
            content: "Сведения сохранены"
          });
          this.props.history.push("/contracts/v2/contracts/edit?id=" + response.data.id);
        } else if (response.status === 400) {
          Modal.error({
            title: "Ошибка",
            content: response.data && response.data.Message
          });
        }
      }
    });

    // dispatch({
    //   type: "universal/saveobject",
    //   payload: sendModel
    // }).then((res) => {
    //   if (!this.props.universal.saveanswer.Message) {
    //     // Modal.info({
    //     //   title: 'Информация',
    //     //   content: 'Договор успешно создан',
    //     // });
    //     this.props.history.push("/contracts/v2/contracts/table");
    //   }
    // });

  };

  setSpecData = (data) => {
    this.setState({
      dataStoreGuid: Guid.newGuid(),
      SpecPageForceRendered: true,
      SpecData: data
    });
  };

  componentDidMount() {

    const { dispatch, location, history } = this.props;
    let createMode = "";

    if (location.query.hasOwnProperty("counterAgentId") && location.query.hasOwnProperty("contractTypeId")) {
      createMode = "counterAgent";
      this.findCounterAgentById(location.query.counterAgentId);
    }

    if (location.query.hasOwnProperty("contractId")) {
      createMode = "contract";
      this.findContractById(location.query.contractId);
    }

    if (createMode.length === 0) {
      this.props.history.push("/contracts/v2/contracts/table");
    }

    this.setState({
      createMode: createMode,
      dataStoreGuid: Guid.newGuid()
    });
  };

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: "universal/clearData",
      payload: {
        typeName: "counterAgentData",
        value: {}
      }
    });
  }

  render = () => {

    let formData = {};

    // if (this.props.universal2.references.hasOwnProperty("clinic") && this.props.universal2.references.clinic.hasOwnProperty("content") && this.props.universal2.references.clinic.content.length > 0) {
    //
    //   formData = {
    //     ...this.props.universal.counterAgentData,
    //     _contragent: this.props.universal2.references.clinic.content[0]
    //   };
    //
    // }

    if (this.props.universal2.references.hasOwnProperty("contract") && this.props.universal2.references.contract.hasOwnProperty("content") && this.props.universal2.references.contract.content.length > 0) {
      formData.parentContract = this.props.universal2.references.contract.content[0];
    }


    return (
      <ContentLayout
        contentName={"Новый документ"}
        breadcrumbRoutes={[{
          path: "/",
          breadcrumbName: "Главная"
        }, {
          path: "/contracts/v2/contracts/table",
          breadcrumbName: "Договоры"
        }, {
          path: "/contracts/v2/contracts/table",
          breadcrumbName: "Новый договор"
        }]}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            this.props.form.validateFields((err, fieldsValue) => {
              if (err) {
                return;
              }

              this.sendForm(fieldsValue);
            });

          }}
          layout="horizontal" hideRequiredMark>
          <Card
            headStyle={{ padding: 0 }}
            title={""}
            className={"headPanel"}
            extra={[<Button
              key={"save_btn"}
              htmlType="submit">Сохранить</Button>,

              <Button
                key={"delete_btn"}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  const { dispatch } = this.props;

                  dispatch({
                    type: "universal/clearData",
                    payload: {
                      typeName: "getObjectData",
                      value: {}
                    }
                  }).then(() => {
                    this.props.history.push("/contracts/v2/contracts/table");
                  });
                }}>Закрыть</Button>,
              <Button
                key={"clear_btn"}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  this.props.form.resetFields();
                }}>Очистить</Button>,
               <Button
                key={"loader_btn"}
                type="primary"
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  if (this.state.createMode === "counterAgent") {
                    let infoPageValues = this.state.eventManager.handleEvent("GetInfoPageValues");
                    if (!Object.values(infoPageValues).filter(x => (x === null)).length > 0) {
                      this.getCounterAgentById({
                        id: infoPageValues.counterAgentId,
                        contractTypeId: infoPageValues.contractTypeId,
                        documentDate: infoPageValues.documentDateId,
                        yearId: infoPageValues.yearSectionId
                      });
                    }
                  }
                  else if (this.props.location.query.hasOwnProperty("contractId")) {
                        //console.log(this.props.location.query.contractId);

                        if (this.props.universal2.references.contract) {
                          this.getCounterAgentById({
                            id: this.props.universal2.references.contract.content[0].id,
                            contractTypeId: this.props.universal2.references.contract.content[0].contractType ? this.props.universal2.references.contract.content[0].contractType.id : undefined,
                            documentDate: this.props.universal2.references.contract.content[0].documentDate ? this.props.universal2.references.contract.content[0].documentDate : undefined,
                            yearId: this.props.universal2.references.contract.content[0].periodYear ?  this.props.universal2.references.contract.content[0].periodYear.year : undefined,
                          });
                        }
                  }
                }
                }>Сформировать</Button>]}
            //this.state.createMode === "counterAgent" &&
            bordered={false}
            bodyStyle={{ padding: 0 }}>
            <Row style={{ marginTop: "5px" }}>
              <Tabs
                tabBarStyle={{ textAlign: "left" }}
                type={"card"}
                className={"stepFormText"}
                defaultActiveKey="main"
                tabPosition={"left"}>
                <TabPane tab="Титульная часть" key="main">

                  {this.state.createMode === "counterAgent" && <InfoPageFromCounter
                    form={this.props.form}
                    formData={this.state.counterAgentData}
                    formItemLayout={formItemLayout}
                    eventManager={this.state.eventManager}
                  />}

                  {this.state.createMode === "contract" && <InfoPage
                    getSubContractById={this.getSubContractById}
                    form={this.props.form}
                    formData={formData}
                    setSpecData={this.setSpecData}
                    eventManager={this.state.eventManager}
                    formItemLayout={formItemLayout}
                    getCounterAgentById={this.getCounterAgentById}
                  />}


                </TabPane>
                <TabPane tab="Спецификация" key="specification">
                  {Object.keys(this.state.SpecData).length > 0 ?
                    <SpecPage
                      dataGuid={this.state.dataStoreGuid}
                      setForceRender={() => {
                        this.setState({
                          SpecPageForceRendered: false,
                          SpecData: []
                        });
                      }}
                      forceRender={this.state.SpecPageForceRendered}
                      eventManager={this.state.eventManager}
                      form={this.props.form}
                      gridData={this.state.SpecData}/>
                    : <SpecPage
                      setForceRender={() => {
                        this.setState({
                          SpecPageForceRendered: false,
                          SpecData: []
                        });
                      }}
                      dataGuid={this.state.dataStoreGuid}
                      eventManager={this.state.eventManager}
                      form={this.props.form}
                      gridData={this.state.createMode === "counterAgent" ? this.state.counterAgentData : this.props.universal.getObjectData}/>}
                </TabPane>
                <TabPane tab="Контрагенты" key="counteragents">
                  <ContragentsPage
                    gridData={this.state.createMode === "counterAgent" ? this.state.counterAgentData : this.props.universal.counterAgentData}
                    selectedData={this.props.location.state}/>
                </TabPane>
                <TabPane tab={"Производственная база"} key={"production_base"}>
                  <ProductionBasePage
                    dataSource={this.state.counterAgentData}
                  />
                </TabPane>
              </Tabs>
            </Row>
          </Card>
        </Form>
      </ContentLayout>);
  };
}

export default connect(({ universal, universal2, loading }) => ({
  universal,
  universal2,
  loadingData: loading.effects["universal/getCounterAgentData"]
}))(CounterAgentCreate);