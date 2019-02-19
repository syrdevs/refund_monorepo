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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import GridFilter from "../../components/GridFilter";
import request from "../../utils/request";
import saveAs from "file-saver";
import Guid from "@vitacore/refunds-module/src/utils/Guid";

const dateFormat = "YYYY/MM/DD";
const SubMenu = Menu.SubMenu;

class CounterAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuChild: [],
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
      filterContainer: 0,
      gridParameters: {
        start: 0,
        length: 10,
        alias: "clinicList",
        entity: "clinic",
        filter: {},
        sort: []
      },
      filterForm: [
        {
          name: "freeSearch",
          label: "БИН/ИИН",
          type: "text"
        },
        {
          name: "nameSearch",
          label: "Наименование",
          type: "text"
        },
        {
          name: "addressSearch",
          label: "Адрес",
          type: "text"
        },
        {
          label: "Дата регистрации",
          name: "registrationDate",
          type: "listbetweenDate"
        },
        {
          label: "Дата включения в БДСЗ",
          name: "clinicRegisters.dateBegin",
          type: "listbetweenDate"
        },
        {
          label: "Дата исключения из БДСЗ",
          name: "clinicRegisters.dateEnd",
          type: "listbetweenDate"
        },
        {
          label: "Наличие договора",
          name: "periodYear",
          filterName: "_contractYears.year",
          sort: "desc",
          displayField: "year",
          valueField: "year",
          type: "combobox"
        },
        {
          label: "СЗ районного значения и села",
          name: "isRural",
          type: "checkbox"
        },
        {
          label: "Частная организация",
          name: "_organization.legalForm.isPrivate",
          type: "checkbox"
        },
        {
          label: "Роль СЗ (Поставщик)",
          name: "postavwik_1",
          type: "checkbox"
        },
        {
          label: "Роль СЗ (Соисполнитель)",
          name: "postavwik_2",
          type: "checkbox"
        }
      ]
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

  componentDidMount() {
    this.loadMainGridData();
    this.getMenuActions();
  }

  toggleItems() {
  }

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer === 6 ? 0 : 6
    }));
  };

  clearFilter = (pageNumber) => {
    this.setState({
      sortedInfo: {},
      gridParameters: {
        start: 0,
        length: 10,
        alias: "clinicList",
        entity: "clinic",
        filter: {},
        sort: []
      }
    }, () => {
      this.loadMainGridData();
    });
  };
//test
  applyFilter = (filter) => {

    if (filter.postavwik_1) {
      filter["clinicRegister.clinicRoleBitWiseOR"] = 1;
    }

    if (filter.postavwik_2) {
      filter["clinicRegister.clinicRoleBitWiseOR"] = 2;
    }

    if (filter.postavwik_1 && filter.postavwik_2)
      filter["clinicRegister.clinicRoleBitWiseOR"] = 3;

    delete filter["postavwik_1"];
    delete filter["postavwik_2"];

    this.setState({
      sortedInfo: {},
      gridParameters: {
        start: 0,
        length: 10,
        alias: "clinicList",
        entity: "clinic",
        filter: { ...filter },
        sort: []
      }
    }, () => {

      const { dispatch } = this.props;
      dispatch({
        type: "universal2/getList",
        payload: this.state.gridParameters
      });
    });
  };

  exportToExcel = () => {

    let authToken = localStorage.getItem("AUTH_TOKEN");
    let columns = JSON.parse(localStorage.getItem("RefundsPageColumns"));

    request("/api/refund/exportToExcel", {
      method: "POST",
      responseType: "blob",
      body: {
        "entityClass": "clinic",
        "alias": "clinicList",
        "fileName": "Субьект_здравохранение",
        "filter": this.state.gridParameters.filter,
        "columns": [].concat(columns.filter(column => column.isVisible))
      },
      getResponse: (response) => {
        if (response.status === 200) {
          if (response.data && response.data.type)
            saveAs(new Blob([response.data], { type: response.data.type }), Guid.newGuid());
        }
      }
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
        {/*<Menu.Item
          disabled={hasRole(["ADMIN"]) || this.state.selectedRecord === null}
          key='change'
          onClick={() => {
            this.props.history.push("/contracts/v2/counteragent/edit?id=" + this.state.selectedRecord.id);
          }}>
          Открыть
        </Menu.Item>*/}
        <SubMenu
          disabled={hasRole(["ADMIN"]) || this.state.selectedRecord === null}
          key="register_document"
          title="Создать договор">
          {this.state.subMenuChild && this.state.subMenuChild
            .map((menuItem) => (<Menu.Item
              onClick={() => {
                this.props.history.push("/contracts/v2/contracts/create?counterAgentId=" + this.state.selectedRecord.id + "&contractTypeId=" + menuItem.id);
              }}
              key={menuItem.id}>{menuItem.shortName}</Menu.Item>))}
        </SubMenu>
        <SubMenu
          disabled={hasRole(["ADMIN"]) || this.state.selectedRecord === null}
          key="register_document_1"
          title="Создать договор без проведения закупа ">
          {this.state.subMenuChild && this.state.subMenuChild
            .map((menuItem) => (<Menu.Item
              onClick={() => {
                this.props.history.push("/contracts/v2/contracts/create?counterAgentId=" + this.state.selectedRecord.id + "&contractTypeId=" + menuItem.id + "&manual=true");
              }}
              key={menuItem.id}>{menuItem.shortName}</Menu.Item>))}
        </SubMenu>
      </Menu>}>
        <Button
          key={"action"}>{formatMessage({ id: "menu.mainview.actionBtn" })} <Icon
          type="down"/></Button>
      </Dropdown>,
      <Button key={"create"}
              onClick={() => {
                this.props.history.push("/contracts/v2/counteragent/create");
              }}
      >Создать субъект здравоохранения</Button>
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
          <Col sm={24} md={this.state.filterContainer}>
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
              <Card
                headStyle={{
                  padding: "0 14px"
                }}
                style={{ margin: "0px 5px 10px 0px", borderRadius: "5px" }}
                type="inner"
                title={formatMessage({ id: "system.filter" })}
                extra={<Icon style={{ "cursor": "pointer" }} onClick={this.filterPanelState}><FontAwesomeIcon
                  icon={faTimes}/></Icon>}>
                <GridFilter
                  // clearFilter={this.clearFilter(pageNumber)}
                  clearFilter={(pageNumber) => this.clearFilter(pageNumber)}
                  applyFilter={(filter) => this.applyFilter(filter)} key={"1"}
                  filterForm={this.state.filterForm}
                  dateFormat={dateFormat}/>
              </Card>
            </Animated>

          </Col>
          <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>
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
              actionExport={() => this.exportToExcel()}
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
                      return <Icon type="check"/>;
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
                },()=>{
                  this.props.history.push("/contracts/v2/counteragent/edit?id=" + this.state.selectedRecord.id);
                });
              }}
              onFilter={(filters) => {

              }}
              onRefresh={() => {
                this.loadMainGridData();
              }}
              onSearch={() => {
                this.filterPanelState();
              }}
              onSelectCheckboxChange={(selectedRowKeys) => {
                // this.setState({
                //   selectedRowKeys: selectedRowKeys,
                // });
              }}
            />
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
