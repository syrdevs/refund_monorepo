import React, { Component, Provider } from "react";
import {
  Card,
  Button,
  Label,
  Row,
  Form,
  Tabs,
  Spin
} from "antd";
import formatMessage from "../../utils/formatMessage";
import { ContragentsPage, SpecPage, InfoPage, DogovorPage } from "./TabPagesView";
import "./CounterAgent.css";
import connect from "../../Redux";
import AttachmentPage from "./TabPagesView/AttachmentPage";
import ContentLayout from "../../layouts/ContentLayout";

const TabPane = Tabs.TabPane;
const dateFormat = "DD.MM.YYYY";
const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 14
  }
};

class CounterAgentView extends Component {
  state = {
    errorText: null,
    messageText: ""
  };

  getContractData = () => {
    const { dispatch } = this.props;

    if (this.props.contractId) {

      dispatch({
        type: "universal/getobject",
        payload: {
          "entity": "contract",
          "alias": null,
          "id": this.props.contractId
        }
      }).then(() => {

        let result = this.props.universal.getObjectData;
        if (result.Message) {
          this.setState({
            errorText: result.Message
          });
        }


      });

      return;
    }

    if (this.props.location.query && this.props.location.query.id) {
      dispatch({
        type: "universal/getobject",
        payload: {
          "entity": "contract",
          "alias": null,
          "id": this.props.location.query.id
        }
      }).then(() => {

        let result = this.props.universal.getObjectData;
        if (result.Message) {
          this.setState({
            errorText: result.Message
          });
        }


      });
    } else {
      //redirect to 404 page
    }
  };

  componentDidMount() {

    this.getContractData();
  };

  render = () => {
    const { location, children } = this.props;

    let contractName = "";
    if (this.props.universal.getObjectData && this.props.universal.getObjectData.contractType) {
      let contractType = this.props.universal.getObjectData.contractType ? this.props.universal.getObjectData.contractType.shortName : "";
      contractName = contractType + " №" + this.props.universal.getObjectData.number + " от " + this.props.universal.getObjectData.documentDate;
    }


    if (this.state.errorText !== null) {
      return (<Card
        headStyle={{ padding: 0 }}
        title={""}
        className={"headPanel"}
        bordered={false}
        bodyStyle={{ padding: 0 }}>
        <div>{this.state.errorText}</div>
      </Card>);
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
        path: "/contracts/v2/contracts/table",
        breadcrumbName: "Просмотр"
      }]}>
      <Card
        headStyle={{ padding: 0 }}
        title={""}
        className={"headPanel"}
        bordered={false}
        bodyStyle={{ padding: 0 }}>
        <Row style={{ marginTop: "5px" }}>
            <Form layout="horizontal" hideRequiredMark>
              <Tabs
                tabBarStyle={{ textAlign: "left" }}
                type={"card"}
                className={"stepFormText"}
                defaultActiveKey="main"
                tabPosition={"left"}>
                <TabPane tab="Титульная часть" key="main">
                  <InfoPage
                    formData={this.props.universal.getObjectData}
                    formItemLayout={formItemLayout}/>
                </TabPane>
                <TabPane tab="Спецификация" key="specification">
                  <SpecPage
                    formData={this.props.universal.getObjectData}
                  />
                </TabPane>
                <TabPane tab="Контрагенты" key="counteragents">
                  <ContragentsPage
                    gridData={this.props.universal.getObjectData}
                  />
                </TabPane>
                <TabPane tab="Приложения" key="attachments">
                  <AttachmentPage formData={this.props.universal.getObjectData}/>
                </TabPane>
              </Tabs>
            </Form>
        </Row>
      </Card>
    </ContentLayout>);
  };
}

export default connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects["universal/getobject"]
}))(CounterAgentView);