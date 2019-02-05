import React, { Component } from "react";
import {
  Card,
  Table,
  Icon,
  Menu,
  Dropdown,
  Button,
  Label,
  Pagination,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  LocaleProvider,
  Select,
  Checkbox,
  Divider,
  Spin
} from "antd";
import formatMessage from "../../utils/formatMessage";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";
import hasRole from "../../utils/hasRole";
import ContentLayout from "../../layouts/ContentLayout";
import { Animated } from "react-animated-css";

class CounterAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      isForm: false,
      columns: [
        // {
        //   title: 'Код',
        //   dataIndex: 'code',
        //   isVisible: true,
        // },
        {
          title: "БИН/ИИН",
          dataIndex: "idendifier.identifiervalue",
          isVisible: true
        },
        {
          title: "Наименование/Имя",
          dataIndex: "name",
          width: 360,
          isVisible: true
        }, {
          title: "Адрес",
          dataIndex: "address",
          isVisible: true
        }, {
          title: "Актуальные контакты",
          dataIndex: "contact",
          isVisible: true
        }, {
          title: "Банковские реквизиты",
          dataIndex: "bankAccount.bank",
          isVisible: true
        }, {
          title: "Ответственные лица",
          dataIndex: "representative",
          isVisible: true
        }
      ],
      selectedRecord: null,
      xsize: "auto",

      gridParameters: {
        start: 0,
        length: 10,
        alias: "clinicList",
        entity: "clinic",
        filter: {},
        sort: []
      }
    };
  }

  componentWillUnmount() {

  }

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    this.setState(prevState => ({
      gridParameters: {
        ...prevState.gridParameters,
        start: current,
        length: pageSize
      }
    }), () => dispatch({
      type: "universal2/getList",
      payload: {
        ...this.state.gridParameters,
        start: current,
        length: pageSize
      }
    }));
  };

  loadMainGridData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: this.state.gridParameters
    });
  };

  componentDidMount() {
    this.loadMainGridData();
  }

  toggleSearcher() {

  }

  toggleItems() {
  }

  goForm = () => {
    this.setState({
      isForm: !this.state.isForm
    });
  };


  render() {
    const { universal2 } = this.props;
    const counterData = universal2.references[this.state.gridParameters.entity];

    const addonButtons = [
      <Dropdown key={"dropdown"} trigger={["click"]} overlay={<Menu>
        {/*<Menu.Item*/}
        {/*disabled={hasRole(['ADMIN'])}*/}
        {/*onClick={() => this.goForm()}*/}
        {/*key='add'>*/}
        {/*Добавить*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item*/}
        {/*disabled={hasRole(['ADMIN']) || true}*/}
        {/*key='delete'>*/}
        {/*Удалить*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item*/}
        {/*disabled={hasRole(['ADMIN']) || true}*/}
        {/*key='update'>*/}
        {/*Открыть/изменить*/}
        {/*</Menu.Item>*/}
        <Menu.Item
          disabled={hasRole(["ADMIN"]) || this.state.selectedRecord === null}
          key='register_document'
          onClick={() => {
            this.props.history.push("/contracts/v2/contracts/create?counterAgentId=" + this.state.selectedRecord.id);
            // this.props.history.push({
            //   pathname: "/contracts2/contracts/create",
            //   state: {
            //     data: this.state.selectedRecord
            //     // data: counterData.content.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1),
            //   }
            // });
          }}>
          Создать договор
        </Menu.Item>
        <Menu.Item
          disabled={hasRole(["ADMIN"]) || this.state.selectedRecord === null}
          key='change'
          onClick={() => {
            this.props.history.push("/contracts/v2/counteragent/edit?id=" + this.state.selectedRecord.id);
          }}>
          Открыть
        </Menu.Item>
      </Menu>}>
        <Button
          key={"action"}>{formatMessage({ id: "menu.mainview.actionBtn" })} <Icon
          type="down"/></Button>
      </Dropdown>,
      <Button key={"create"}
              onClick={() => {
                this.props.history.push("/contracts/v2/counteragent/create");
              }}
      >Создать контрагент</Button>
    ];


    return (
      <ContentLayout
        contentName={"Субъекты здравоохранения"}
        breadcrumbRoutes={[{
          path: "/",
          breadcrumbName: "Главная"
        }, {
          path: "/contracts/v2/counteragent/main",
          breadcrumbName: "Субъекты здравоохранения"
        }]}>
        <Row>
          <Col sm={24} md={this.state.tablecont}>
            {!this.state.isForm &&

            <SmartGridView
              name='CounterAgentPageColumns'
              scroll={{ x: this.state.xsize }}
              fixedBody
              //selectedRowCheckBox
              searchButton={this.state.searchButton}
              // selectedRowKeys={this.state.selectedRowKeys}
              rowKey={"id"}
              fixedHeader
              //rowSelection
              showExportBtn={true}
              actionExport={() => {
              }}
              columns={this.state.columns}
              actionColumns={[
                 {
                  title: "СЗ районного значения и села",
                  key: "sz_region",
                  order: 10,
                  isVisible: true,
                  width: 200,
                  render: (item) => {
                    if (item.isRural) {
                      return <Icon type="check" />;
                    }
                  }
                }
                ]}
              sorted={true}
              showTotal={true}
              dataSource={{
                total: counterData ? counterData.totalElements : 0,
                pageSize: this.state.gridParameters.length,
                page: this.state.gridParameters.start + 1,
                data: counterData ? counterData.content : []
              }}
              addonButtons={addonButtons}

              onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
              onSelectCell={(cellIndex, cell) => {

              }}
              onSelectRow={(record) => {
                this.setState({
                  selectedRecord: record
                });
              }}
              onFilter={(filters) => {

              }}
              onRefresh={() => {
                this.loadMainGridData();
              }}
              onSearch={() => {

              }}
              onSelectCheckboxChange={(selectedRowKeys) => {
                // this.setState({
                //   selectedRowKeys: selectedRowKeys,
                // });
              }}
            />}
          </Col>

        </Row>
      </ContentLayout>
    );
  }
}

export default connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects["universal2/getList"]
}))(CounterAgent);
