import React, { Component } from "react";
import formatMessage from "../../utils/formatMessage";
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
  Icon,
  Tabs,
  Badge,
  Card,
  Menu,
  Dropdown,
  Modal,
  Spin
} from "antd";
import {
  ContragentsPage,
  GraphicPage,
  SpecPage,
  InfoPage,
  DogovorPage,
  AttachmentPage,
  ProductionBasePage
} from "./TabPages";

import request from "../../utils/request";
import ContentLayout from "../../layouts/ContentLayout";
import styles from "./CounterAgent.css";
import moment from "moment";
import connect from "../../Redux";
import DropDownAction from "../../components/DropDownAction/";
import Guid from "../../utils/Guid";


const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 14
  }
};

/*
* <Button
                key={'clear_btn'}
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  // const { dispatch } = this.props;
                  // dispatch({
                  //   type: 'universal/clearData',
                  //   payload: {
                  //     typeName: 'getObjectData',
                  //     value: {},
                  //   },
                  // }).then(() => {
                  //
                  // });
                  //this.props.form.resetFields();

                }}>Очистить</Button>,
*
* */


@Form.create()
class CounterAgentEdit extends Component {
  state = {

    dataStoreGuid: Guid.newGuid(),

    tabRecordsCount: {
      specCount: 0,
      counterAgentsCount: 0,
      documentsCount: 0
    },

    SpecData: {},
    SpecPageForceRendered: false,
    publish: true,
    eventManager: {
      _events: {},
      handleEvent: (evName) => {
        if (!this.state.eventManager._events[evName]) return [];//throw new Error('eventName not registered');

        return this.state.eventManager._events[evName]();
      },
      subscribe: (evName, fn) => {
        this.state.eventManager._events[evName] = fn;
      }
    }
  };
  getContractData = () => {
    const { dispatch } = this.props;


    if (this.props.location.query.id) {
      dispatch({
        type: "universal/getobject",
        payload: {
          "entity": "contract",
          "alias": null,
          //todo get object
          "id": this.props.location.query.id
        }
      }).then(() => {
        this.setState({
          dataStoreGuid: Guid.newGuid()
        });
      });
    } else {
      this.props.history.push("table");
    }
  };

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: "universal/clearData",
      payload: {
        typeName: "getObjectData",
        value: {}
      }
    });

    dispatch({
      type: "universal/clearData",
      payload: {
        typeName: "counterAgentData",
        value: {}
      }
    });
  }

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

  componentDidMount() {
    const { dispatch } = this.props;

    if (!this.props.location.query.hasOwnProperty("id")) {
      this.props.history.push("table");
    }

    dispatch({
      type: "universal/clearData",
      payload: {
        typeName: "getObjectData",
        value: {}
      }
    });

    dispatch({
      type: "universal/clearData",
      payload: {
        typeName: "getCounterAgentData",
        value: {}
      }
    });

    this.getContractData();

    this.setState({
      dataStoreGuid: Guid.newGuid()
    });


    // if (this.props.location.state) {
    //
    // } else {
    //   reduxRouter.push('main');
    // }
  };

  sendForm = (data) => {
    const { dispatch } = this.props;

    let SpecFormData = this.state.eventManager.handleEvent("onSpecFormSubmit");

    //todo check model
    let sendModel = {
      "entity": "contract",
      "alias": null,
      "data": {}
    };

    if (SpecFormData.length > 0) {
      sendModel.data.contractItems = SpecFormData;
    }

    SpecFormData.forEach((item, index) => {
      if (this.props.universal.getObjectData.contractItems) {
        this.props.universal.getObjectData.contractItems.forEach((olditem)=>{
          if (item.id === olditem.id){
            SpecFormData[index].contractItemValues[0] ={
              ...SpecFormData[index].contractItemValues[0],
              "id": olditem.contractItemValues[0].id
            }
          }
        })
      }
    })

    if (this.props.universal.getObjectData && this.props.universal.getObjectData.contractParties) {

      sendModel.data.contractParties =
        this.props.universal.getObjectData.contractParties.map((contractParty) => {
          return {
            bankAccount: contractParty.bankAccount,
            contractRole: {
              id: contractParty.contractRole.id
            },
            organization: {
              id: contractParty.organization.id
            },
            id: contractParty.id
          };
        });

    }

    if (Object.keys(this.props.universal.counterAgentData).length > 0 && this.props.universal.counterAgentData.hasOwnProperty("contractParties")) {

      sendModel.data.contractParties =
        this.props.universal.counterAgentData.contractParties.map((contractParty) => {
          return {
            bankAccount: contractParty.bankAccount,
            contractRole: {
              id: contractParty.contractRole.id
            },
            organization: {
              id: contractParty.organization.id
            }
          };
        });

    }


    if (data.period !== null && data.period.length > 0) {
      sendModel.data.dateBegin = moment(data.period[0]).format("DD.MM.YYYY");

      if (data.period[1])
        sendModel.data.dateEnd = moment(data.period[1]).format("DD.MM.YYYY");
    }

    if (this.props.location.query.id) {
      sendModel.data.id = this.props.location.query.id;
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

    if (data.descr) {
      sendModel.data.descr = data.descr;
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
    //     Modal.info({
    //       title: "Информация",
    //       content: "Сведения сохранены"
    //     });
    //     // reduxRouter.push('/contract/contracts/table');
    //   }
    // });
  };

  getCounterAgentById = (id, year) => {
    const { dispatch } = this.props;

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

  deleteContract = () => {
    request("/api/uicommand/deleteObject",
      {
        method: "POST",
        body: {
          "entity": "contract",
          "alias": null,
          "id": this.props.location.query.id
        },
        getResponse: (response) => {
          if (response.status === 200) {
            Modal.info({
              title: "Информация",
              content: "Объект успешно удален"
            });
          } else if (response.status === 400) {
            Modal.error({
              title: "Ошибка",
              content: response.data && response.data.Message
            });
          }
        }
      }
    );
  };

  setSpecData = (data) => {
    this.setState({
      dataStoreGuid: Guid.newGuid(),
      SpecPageForceRendered: true,
      SpecData: data
    });
  };

  setTabCount = (count, tabKey) => {
    if (tabKey === "spes" && this.state.tabRecordsCount.specCount !== count) {
      this.setState(prevState => ({
        tabRecordsCount: {
          ...prevState.tabRecordsCount,
          specCount: count
        }
      }));
    }
  };

  render = () => {

    const { dispatch } = this.props;
    const documentStatus = this.props.universal.getObjectData ? this.props.universal.getObjectData._documentStatus : undefined;

    let contractName = "";
    if (this.props.universal.getObjectData && this.props.universal.getObjectData.contractType) {
      let contractType = this.props.universal.getObjectData.contractType ? this.props.universal.getObjectData.contractType.shortName : "";
      contractName = contractType + " №" + this.props.universal.getObjectData.number + " от " + this.props.universal.getObjectData.documentDate;
    }


    return (<ContentLayout
        contentName={contractName}
        breadcrumbRoutes={[{
          path: "/",
          breadcrumbName: "Главная"
        }, {
          path: "/contracts/v2/contracts/table",
          breadcrumbName: "Договоры"
        }, {
          path: "/contracts/v2/contracts/create",
          breadcrumbName: "Редактирование"
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
            key={"edit_card"}
            className={"headPanel"}
            extra={[
              <Button
                key={"save_btn"}
                htmlType="submit">Сохранить</Button>,
              <span key={"document_span"}>
                {(documentStatus === null || documentStatus === 2) &&
                <span key={"documentStatus_span"}>
                    {this.state.publish &&
                    <Button
                      key={"publish"}
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        dispatch({
                          type: "universal2/getPublish",
                          payload: {
                            "id": this.props.location.query.id
                          }
                        }).then(() => {

                          if (!this.props.universal2.publish.Message) {
                            this.setState({
                              publish: false
                            }, () => {
                              Modal.info({
                                title: "Информация",
                                content: "Документ опубликован!"
                              });
                            });
                          }

                        });
                      }}
                    >Опубликовать</Button>
                    }
                  </span>
                }
              </span>,
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
                  });
                  dispatch({
                    type: "universal/clearData",
                    payload: {
                      typeName: "counterAgentData",
                      value: {}
                    }
                  });
                  this.props.history.push("/contracts/v2/contracts/table");
                }}>Закрыть</Button>,
              <Dropdown
                key={"dropdown_action_menu"}
                trigger={["click"]}
                overlay={<Menu>
                  <Menu.Item
                    onClick={() => {
                      this.props.history.go(0);
                      //this.props.history.push("/contracts/v2/contracts/edit" + this.props.location.search);
                    }}
                    key='1'>
                    Обновить
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      Modal.confirm({
                        title: "Подтверждение",
                        cancelText: "Нет",
                        okText: "Да",
                        content: "Вы действительно хотите удалить объект?",
                        onOk: () => {
                          this.deleteContract();
                        },
                        onCancel: () => {

                        }
                      });
                    }}
                    key="2">
                    Удалить
                  </Menu.Item>
                </Menu>}>
                <Button
                  style={{ marginLeft: "5px" }}
                  key={"action"}>{formatMessage({ id: "menu.mainview.actionBtn" })} <Icon
                  type="down"/></Button>
              </Dropdown>,
              <DropDownAction
                key={"dropdown_action_btn"}
                contractId={this.props.location.query.id}
                entity={"contract"}
                type={2}/>
            ]}
            bordered={false}
            bodyStyle={{ padding: 0 }}>
            <Row style={{ marginTop: "5px" }}>
              <Tabs
                tabBarStyle={{ textAlign: "left" }}
                type={"card"}
                className={"stepFormText"}
                defaultActiveKey="main"
                tabPosition={"left"}>
                <TabPane tab={"Титульная часть"} key="main">
                  <InfoPage
                    getSubContractById={this.getSubContractById}
                    setSpecData={this.setSpecData}
                    form={this.props.form}
                    formData={this.props.universal.getObjectData}
                    formItemLayout={formItemLayout}
                    getCounterAgentById={this.getCounterAgentById}
                  />
                </TabPane>
                {/*<TabPane tab="Род-кий договор" key="rod_dogovor">*/}
                {/*<DogovorPage/>*/}
                {/*</TabPane>*/}
                <TabPane forceRender={true} tab={<Badge count={this.state.tabRecordsCount.specCount}
                                                        style={{ backgroundColor: "#1990FF" }}>
                  <div key={"badge_value"}><span style={{ paddingRight: "15px" }}> Спецификация</span></div>
                </Badge>}
                         key="specification">
                  {Object.keys(this.state.SpecData).length > 0 ?
                    <SpecPage
                      setTabCount={this.setTabCount}
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
                      setTabCount={this.setTabCount}
                      dataGuid={this.state.dataStoreGuid}
                      setForceRender={() => {
                        this.setState({
                          SpecPageForceRendered: false,
                          SpecData: []
                        });
                      }}
                      eventManager={this.state.eventManager}
                      form={this.props.form}
                      gridData={this.props.universal.getObjectData}
                    />}


                </TabPane>
                <TabPane tab={<Badge count={this.state.tabRecordsCount.counterAgentsCount}
                                     style={{ backgroundColor: "#1990FF" }}>
                  <div><span style={{ paddingRight: "15px" }}> Контрагенты</span></div>
                </Badge>} key="counteragents">
                  <ContragentsPage
                    gridData={Object.keys(this.props.universal.counterAgentData).length > 0 ? this.props.universal.counterAgentData : this.props.universal.getObjectData}
                    selectedData={this.props.location.state}/>
                </TabPane>
                <TabPane tab={"Производственная база"} key={"production_base"}>
                  <ProductionBasePage
                    dataSource={this.props.universal.getObjectData}
                  />
                </TabPane>
                <TabPane
                  tab={<Badge count={this.state.tabRecordsCount.documentsCount}
                              style={{ backgroundColor: "#1990FF" }}>
                    <div><span style={{ paddingRight: "15px" }}> Приложения</span></div>
                  </Badge>} key="attachments">
                  <AttachmentPage
                    getContractData={this.getContractData}
                    filesData={this.props.universal.getObjectData}
                    contractId={this.props.location.query.id}
                    formItemLayout={formItemLayout}
                  />
                </TabPane>
              </Tabs>
            </Row>
          </Card>
        </Form>
      </ContentLayout>
    );
  };
}

export default connect(({ universal, universal2, loading }) => ({
  universal,
  universal2,
  saveLoadingData: loading.effects["universal/saveobject"],
  getLoadingData: loading.effects["universal/getobject"]
}))(CounterAgentEdit);