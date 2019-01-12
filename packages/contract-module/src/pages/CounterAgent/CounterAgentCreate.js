import React, { Component } from "react";
import formatMessage from "../../utils/formatMessage";
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Modal, Spin } from "antd";
import { ContragentsPage, GraphicPage, SpecPage, InfoPage, DogovorPage } from "./TabPages";
//import reduxRouter from 'umi/router';
import "./CounterAgent.css";
import moment from "moment";
import connect from "../../Redux";
import AttachmentPage from "./TabPages/AttachmentPage";
import Guid from "../../utils/Guid";
import ContentLayout from "../../layouts/ContentLayout";


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

    dataStoreGuid: Guid.newGuid(),

    SpecData: {},
    SpecPageForceRendered: false,

    eventManager: {
      _events: {},
      handleEvent: (evName) => {
        if (!this.state.eventManager._events[evName]) return [];//throw new Error('eventName not registered');

        return this.state.eventManager._events[evName]();
      },
      subscribe: (evName, fn) => {
        this.state.eventManager._events[evName] = fn;
      }
    },
    specifyData: []
  };

  findCounterAgentById = (id) => {
    this.props.dispatch({
      type: "universal2/getList",
      payload: {
        start: 0,
        length: 1,
        alias: "clinicList",
        entity: "clinic",
        filter: {
          id: id
        },
        sort: []
      }
    });
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

  getCounterAgentById = (id, year) => {
    const { dispatch } = this.props;

    dispatch({
      type: "universal/getCounterAgentData",
      payload: {
        "contragentId": id,
        "year": year
      }
    }).then(() => {
      this.props.form.resetFields();
      this.setState({
        dataStoreGuid: Guid.newGuid()
      });
    });

  };

  sendForm = (data) => {

    const { dispatch } = this.props;

    let SpecFormData = this.state.eventManager.handleEvent("onSpecFormSubmit");

    //todo check model
    let sendModel = {
      "entity": "contract",
      "alias": null,
      "data": {
        "contractParties": this.props.universal.counterAgentData.contractParties,
        "contractItems": SpecFormData
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

    if (data.parentContract.value) {
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
      sendModel.data.contractAlterationReasons = [
        {
          "dictionaryBase": {
            id: data.contractAlternation
          }
        }
      ];

    }

    dispatch({
      type: "universal/saveobject",
      payload: sendModel
    }).then((res) => {
      if (!this.props.universal.saveanswer.Message) {
        // Modal.info({
        //   title: 'Информация',
        //   content: 'Договор успешно создан',
        // });
        //reduxRouter.push('/contract/contracts/table');
      }
    });

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

    if (location.query.hasOwnProperty("counterAgentId")) {
      createMode = "counterAgent";
      this.findCounterAgentById(location.query.counterAgentId);
    }

    if (location.query.hasOwnProperty("contractId")) {
      createMode = "contract";
      this.findContractById(location.query.contractId);
    }

    if (createMode.length === 0) {
      this.props.history.push("/contracts2/contracts/table");
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

    if (this.props.universal2.references.hasOwnProperty("clinic") && this.props.universal2.references.clinic.hasOwnProperty("content") && this.props.universal2.references.clinic.content.length > 0) {

      formData = {
        ...this.props.universal.counterAgentData,
        _contragent: this.props.universal2.references.clinic.content[0]._organization
      };

    }

    if (this.props.universal2.references.hasOwnProperty("contract") && this.props.universal2.references.contract.hasOwnProperty("content") && this.props.universal2.references.contract.content.length > 0) {
      formData.parentContract = this.props.universal2.references.contract.content[0];
    }

    return (
      <ContentLayout
        contentName={"Новый договор"}
        breadcrumbRoutes={[{
          path: "/",
          breadcrumbName: "Главная"
        }, {
          path: "/contracts2/counteragent/table",
          breadcrumbName: "Договоры"
        }, {
          path: "/contracts2/counteragent/create",
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
                    this.props.history.push("/contracts2/contracts/table");
                  });
                }}>Закрыть</Button>,
              <Button
                key={"clear_btn"}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  this.props.form.resetFields();
                }}>Очистить</Button>]}
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
                  <InfoPage
                    getSubContractById={this.getSubContractById}
                    form={this.props.form}
                    formData={formData}
                    setSpecData={this.setSpecData}
                    formItemLayout={formItemLayout}
                    getCounterAgentById={this.getCounterAgentById}
                  />
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
                      gridData={this.props.universal.getObjectData}/>}
                </TabPane>
                <TabPane tab="Контрагенты" key="counteragents">
                  <ContragentsPage
                    gridData={this.props.universal.counterAgentData}
                    selectedData={this.props.location.state}/>
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