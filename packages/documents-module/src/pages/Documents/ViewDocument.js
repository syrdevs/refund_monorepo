import React, { Component, lazy } from "react";
import {
  Card,
  Row,
  Tabs,
  Steps,
  Menu,
  Icon,
  Col,
  Layout,
  Progress,
  Button,
  Dropdown,
  Spin,
  Badge,
  Modal,
  Table
} from "antd";
import formatMessage from "../../utils/formatMessage";
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import connect from "../../Redux";
import SignModal from "../../components/SignModal";
// import ShowAct from "../Acts/ShowAct";
import RejectModal from "./RejectModal";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
//
import { CounterAgentView, ShowPayment, ShowAct } from "@vitacore/contract-module";
import { ShowPull } from "@vitacore/refunds-module";
// import CounterAgentView from "../CounterAgent/CounterAgentView";
// import ShowPayment from "../ContractRequests/ShowPayment";
import ContentLayout from "../../layouts/ContentLayout";
import request from "../../utils/request";
import DropDownAction from "../../components/DropDownAction";

import './ViewDocument.css';

const Step = Steps.Step;
const TabPane = Tabs.TabPane;

//const CounterAgentView = (<div>CounterAgent</div>);

let modules = [{
  module: null,
  loaded: false
}, {
  module: null,
  loaded: false
}, {
  module: null,
  loaded: false
}];

class ViewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {

      columns: [{
        title: "name",
        dataIndex: "name"
      }, {
        title: "value",
        dataIndex: "value"
      }],

      dataSource: [],

      pages: null,

      loadedIncludes: false,

      buttonShow: true,
      ShowSign: false,
      rejectModal: {
        visible: false
      },
      data: {},
      dataRoutePath: []
    };
  }

  // loadActData = (id) => {
  //   this.props.dispatch({
  //     type: "universal/getObjectByEntity",
  //     payload: {
  //       "entity": "documentToSign",
  //       "alias": "routes",
  //       "id": id //'this.props.location.query.id'
  //     }
  //   }).then(() => {
  //     this.setState({
  //       data: this.props.universal.getObjectEntities["documentToSign"]
  //     });
  //   });
  // };


  componentDidMount() {

    const { dispatch } = this.props;
    this.loadDataById(this.props.location.query.id);
    this.loadDocRoutePath();
  }

  getIconStep = (value, index) => {
    if (index === 0) {
      return <Icon><FontAwesomeIcon icon={faEnvelope}/></Icon>;
    }
    if (value === 0) {
      return <Icon type="clock-circle"/>;
    }
    if (value === 2) {
      return <Icon type="exclamation-circle"/>;
    }

    return <Icon><FontAwesomeIcon icon={faCheck}/></Icon>;

  };

  stepDescr = (value, index) => {
    if (index === 0) {
      return "Опубликовал документ";
    }
    switch (index) {
      case 0:
        return "Опубликовал документ";
    }
    switch (value) {
      case 0:
        return "На рассмотрении";
      case 1:
        return "Подписал";
      case 2:
        return "Отклонил";
    }
  };

  viewKeyModal = () => {
    this.setState({
        ShowSign: true
      }
    );
  };

  loadDataById = (id) => {

    request("/api/uicommand/getObject", {
      method: "POST",
      body: {
        "entity": "correspondence",
        "alias": "routes",
        "id": id
      }
    }).then(data => {
      this.setState({
          data: data
        }
      );
    });

    // fetch("/api/uicommand/getObject", {
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //     Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN")
    //   },
    //   method: "post",
    //   body: JSON.stringify({
    //     "entity": "correspondence",
    //     "alias": "routes",
    //     "id": id
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //         data: data
    //       }
    //     );
    //   });
  };

  loadDocRoutePath = () => {

    request("/api/contract/getDocumentRoutePath", {
      method: "POST",
      body: {
        "entity": this.props.location.query.type,
        "id": this.props.location.query.id
      }
    }).then(data => {
      this.setState({
          dataRoutePath: data
        }
      );
    });

    // fetch("/api/contract/getDocumentRoutePath", {
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //     Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN")
    //   },
    //   method: "post",
    //   body: JSON.stringify({
    //     "entity": "contract",
    //     "id": this.props.location.query.id
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //         dataRoutePath: data
    //       }
    //     );
    //   });
  };


  viewRejectModal = () => {
    this.setState({
      rejectModal: {
        visible: true
      }
    });

  };

  addDataSource = (data) => {
    this.setState({ dataSource: data });
  };

  callback = (key) => {
  };


  render() {


    /*
    *   <p style={{ marginTop: "10px" }}><h3>{this.state.data ? this.state.data.descr : ""}</h3></p>
                  <p>Опубликовал: {this.state.data ? this.state.data.initiatorUser ? this.state.data.initiatorUser.userName : "" : ""}</p>
                  <p>Тип
                    документа: {this.state.data ? this.state.data.documentType ? this.state.data.documentType.entDesc : "" : ""}</p>
                  <p>{this.state.data ? this.state.data.statusDate ? this.state.data.status.statusDate : "" : ""}</p>
                  <p>Дата публикации: {this.state.data && this.state.data.entryDateTime ? this.state.data.entryDateTime : ""}</p>
                  <p>Статус документа: {this.state.data && this.state.data.documentSigned ? "Подписан" : "Ожидает подписания"}</p>
                  {(this.state.data && this.state.data.documentSigned) &&
                  <p>Дата подписания: {this.state.data.signDateTime}</p>}
                  <p>Статус: {this.state.data && this.state.data.status ? this.state.data.status.statusName : ""}</p>
    *
    * */


    // console.log(this.props.location.state ? this.props.location.state.data : null);
    const smart_grid_controls_right = {
      display: "inline-block",
      float: "right"
    };

    const CardHeight = { height: "auto", marginBottom: "10px" };
    return (<ContentLayout
      contentName={formatMessage({ id: "app.module.documents.title.view" })}
      breadcrumbRoutes={[{
        path: "/documents/main",
        breadcrumbName: "Корреспонденция"
      }, {
        path: "/",
        breadcrumbName: formatMessage({ id: "app.module.documents.title.view" })
      }]}>
      {this.state.rejectModal.visible && <RejectModal
        rejectid={this.props.location.query.id}
        hide={() => {
          this.setState({
            rejectModal: { visible: false }
          });
        }}
        onOk={() => {

        }}
        onCancel={() => {
          this.setState({
            rejectModal: { visible: false }
          });
        }}
      />}

      {this.state.ShowSign &&
      <SignModal
        onCancel={() => {
          this.setState({
            ShowSign: false
          });
        }}
        visible={this.state.ShowSign}
        type={this.props.location.query.type}
        id={this.props.location.query.id}
        getKey={(e) => {

          request("/api/contract/uploadSignedDocument", {
            method: "POST",
            body: {
              "entity": this.props.location.query.type,
              "alias": null,
              "id": this.props.location.query.id,
              "xml": e[0].xml
            },
            getResponse: (data) => {
              if (data.status >= 400) {
                Modal.error({
                  content: data.data.Message
                });
              }
              else {
                this.setState({
                  ShowSign: false,
                  buttonShow: false
                }, () => {
                  // router.push('/documents');
                  Modal.info({
                    content: "Документ подписан"
                  });
                  this.loadDataById(this.props.location.query.id);
                  this.loadDocRoutePath();
                });
              }
            }
          }).then(data => {
          })
            .catch((e) => {
            });
        }}
      />}
      <Card style={{ borderRadius: "5px", marginBottom: "10px" }} bodyStyle={{ padding: 0 }} bordered={true}>
        <Row>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Документ" key="1">
              {this.state.pages}
              <div style={CardHeight}>
                {/*<Card*/}
                {/*style={{margin:'10px'}}*/}
                {/*type="inner"*/}
                {/*bodyStyle={{padding: 25}}*/}
                {/*// title={<div>Информация о документе</div>}*/}
                {/*>*/}
                {this.state.buttonShow &&
                <Button type="primary" disabled={this.state.data ? this.state.data.documentSigned === true : false}
                        style={{ marginLeft: "10px" }} onClick={() => {
                  this.viewKeyModal();
                }}>Подписать
                </Button>}
                {this.state.buttonShow &&
                <Button type="danger" disabled={this.state.data ? this.state.data.documentSigned === true : false}
                        style={{ marginLeft: "5px" }} onClick={() => {
                  this.viewRejectModal();
                }}>Отклонить
                </Button>
                }
                {this.state.data.documentType &&
                <DropDownAction
                  key={"dropdown_btn"}
                  disabled={false}
                  contractId={this.props.location.query && this.props.location.query.id ? this.props.location.query.id : null}
                  entity={this.state.data.documentType ? this.state.data.documentType.entName : null}
                  type={2}
                />
                }

                <Card
                  style={{ margin: "10px" }}
                  type="inner"
                  bodyStyle={{ padding: 25 }}
                  title={<div>Информация о документе</div>}
                >
                  <Row>
                    <Col md={24}>
                      <Table
                        rowKey={"key"}
                        className={"view_document_table"}
                        columns={this.state.columns}
                        dataSource={[
                          {
                            key: 1,
                            name: "ОПУБЛИКОВАЛ",
                            value: this.state.data ? this.state.data.initiatorUser ? this.state.data.initiatorUser.userName : "" : ""
                          },
                          {
                            key: 2,
                            name: "ТИП ДОКУМЕНТА",
                            value: this.state.data ? this.state.data.documentType ? this.state.data.documentType.entDesc : "" : ""
                          },
                          {
                            key: 3,
                            name: "ДАТА ПУБЛИКАЦИИ",
                            value: this.state.data && this.state.data.entryDateTime ? this.state.data.entryDateTime : ""
                          },
                          {
                            key: 4,
                            name: "СТАТУС ДОКУМЕНТА",
                            value: this.state.data && this.state.data.documentSigned ? "Подписан" : "Ожидает подписания"
                          },
                          {
                            key: 5,
                            name: "ДАТА ПОДПИСАНИЯ",
                            value: this.state.data && this.state.data.signDateTime ? this.state.data.signDateTime : ""
                          }, {
                            key: 6,
                            name: "СТАТУС",
                            value: this.state.data && this.state.data.status && this.state.data.status.statusName ? this.state.data.status.statusName : ""
                          }
                        ]}
                        pagination={false}
                        showHeader={false}
                        size={"default"}
                      />
                    </Col>
                  </Row>

                  {/*if (documentSigned) {*/}
                  {/*Дата подписания: signDateTime*/}
                </Card>
                <Card
                  style={{ margin: "10px" }}
                  type="inner"
                  bodyStyle={{ padding: 25 }}
                  title={<div>Документ
                    № {this.state.data ? this.state.data.number : ""} от {this.state.data ? this.state.data.documentDate : ""}</div>}
                >
                  {this.props.location.query.type === "act" && <ShowAct actid={this.props.location.query.id}/>}
                  {this.props.location.query.type === "contract" &&
                  <CounterAgentView contractId={this.props.location.query.id}/>}
                  {this.props.location.query.type === "payment" && <ShowPayment id={this.props.location.query.id}/>}
                  {this.props.location.query.type === "refundPack" && <ShowPull id={this.props.location.query.id}/>}
                </Card>
                {/*</Card>*/}
              </div>
            </TabPane>
            {<TabPane tab="Ход исполнения" key="2">
              <div style={CardHeight}>
                <Card
                  style={{ margin: "10px" }}
                  type="inner"
                  bodyStyle={{ padding: 25 }}
                  title={"Ход работы"}
                >
                  {/*current={this.state.dataRoutePath}*/}
                  <Steps direction="vertical">
                    {this.state.dataRoutePath.length && this.state.dataRoutePath.map((item, index) => <Step
                      key={item.stepName}
                      title={item.stepName}
                      description={this.stepDescr(item.stepStatus, index)}
                      status="finish"
                      icon={this.getIconStep(item.stepStatus, index)}/>)}
                  </Steps>
                  {/*<Steps direction="vertical">
                    <p>Сегодня</p>
                    <Step status="finish" title={<Row>
                      <Col sm={24} md={24} xs={24}>
                        <div>
                          Султанов Усен Ибраевич
                        </div>
                      </Col></Row>} description="Отправил документ на подписание 16.12.2018 10:26"
                          icon={<Icon type="mail"/>}/>
                    <Step status="finish" title="Дайрабаев Сакен Сейдуллаевич"
                          description="Подписал документ 16.12.2018 12:15"/>
                    <Step status="finish" title="Куаныш Айдын" description="Подписал документ 16.12.2018 14:26"/>
                    <Step status="finish" title="Ахметов Нурбек Саматович"
                          description="Подписал документ 16.12.2018 16:48"/>
                  </Steps>*/}
                </Card>
              </div>
            </TabPane>}

          </Tabs>

        </Row>
      </Card>
    </ContentLayout>);


  }


}

export default connect(({ universal, act, loading }) => ({
  universal,
  act,
  // loadinggetattachmentType: loading.effects['universal/getattachmentType'] && loading.effects['universal/getmedicalType'] && loading.effects['universal/getorganization'] & loading.effects['universal/getperiodSection'] && loading.effects['universal/getperiodYear']),
  loadingdeleteObject: loading.effects["universal/deleteObject"],
  loadingcreateActForContract: loading.effects["universal/createActForContract"],
  loadinggetobject: loading.effects["universal/getobject"],
  loadingsave: loading.effects["universal/saveobject"]
}))(ViewDocument);

