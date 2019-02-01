import React, { Component } from "react";
import formatMessage from "../../utils/formatMessage";
import componentLocal from "../../locales/components/componentLocal";
import "./HistoryCalendar.css";
import moment from "moment";
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Calendar,
  Spin,
  Form,
  Tag,
  Tabs,
  Modal,
  Collapse, Divider, LocaleProvider
} from "antd";
import connect from "../../Redux";
import style from "./Searcher.less";
import historystyle from "./HistoryCalendar.css";
import Employees from "../PaymentsPage/Employees";
import Appeals from "../PaymentsPage/Appeals";
import GridFilter from "../../components/GridFilter";
import Medicine from "../PaymentsPage/Medicine";

const dateFormat = "DD.MM.YYYY";
const FormItem = Form.Item;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

const formItemLayout = {
  labelCol: { md: 6, xs: 6, sm: 6 },
  wrapperCol: { md: 18, xs: 18, sm: 18 }
};

const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}


class Searcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearFilter: false,
      parameters: {
        start: 0,
        length: 1000,
        entity: "person",
        filter: {},
        alias: "search",
        sort: []
      },
      MonthHistory: [],
      visibleModal: false,
      visible: false,
      visibleFilter: false,
      filterForm: [

        {
          label: "ИИН",
          name: "iin",
          type: "text",
          withMax: 12
        }, {
          label: "Фамилия",
          name: " lastName",
          type: "text"
        }, {
          label: "Имя",
          name: "firstName",
          type: "text"
        }, {
          label: "Отчество",
          name: "patronymic",
          type: "text"
        }, {
          label: "Дата рождения",
          name: "birthdate",
          type: "date"
        }
      ],
      person: {
        "dSexId": {
          "nameKz": null,
          "id": null,
          "nameRu": null,
          "code": null
        },
        "iin": null,
        "firstname": null,
        "secondname": null,
        "birthdate": null,
        "lastname": null,
        "clinic": null,
        "citizenship": {
          "nameRu": null,
          "nameKz": null,
          "shortname": null,
          "code": null,
          "id": null
        },
        "clinic_date": null,
        "nationality": {
          "shortnameKz": null,
          "nameRu": null,
          "nameKz": null,
          "shortname": null,
          "code": null,
          "id": null
        },
        "categories": [],
        "status": false
      },
      personRPN: {
        "dSexId": {
          "nameKz": null,
          "id": null,
          "nameRu": null,
          "code": null
        },
        "iin": null,
        "firstname": null,
        "secondname": null,
        "birthdate": null,
        "lastname": null,
        "clinic": null,
        "citizenship": {
          "nameRu": null,
          "nameKz": null,
          "shortname": null,
          "code": null,
          "id": null
        },
        "clinic_date": null,
        "nationality": {
          "shortnameKz": null,
          "nameRu": null,
          "nameKz": null,
          "shortname": null,
          "code": null,
          "id": null
        },
        "categories": []
      },
      personMED: {
        "categories": null,
        "status": null,
        "clinic": "",
        "pref_categories": [],
        "clinic_date": ""
      },
      loading1: false,
      loading2: false,
      payes: [],
      loading: false
    };
  }


  componentDidMount() {

    this.props.eventManager.subscribe("onSelectFilterByIin", (params) => {
      if (Object.keys(params).length > 0) {

        this.setState(({ filterContainer }) => ({
          parameters: {
            ...this.state.parameters,
            //filter: { ...this.state.parameters.filter, params }
            filter: params
          }
        }), () => {
          this.applyFilter(params);
        });
      }
      else {

      }
    });


  }


  componentDidUpdate() {

    const { isClearFilter } = this.state;

    if (isClearFilter) {
      this.setState({
        isClearFilter: false
      });
    }
  }


  monthCellRender = (value) => {
    let result = (<div style={{ backgroundColor: "red", opacity: "0.1", height: "100%", width: "100%" }}></div>);
    if (this.state.payes !== undefined && this.state.payes.length > 0) {
      this.state.payes.forEach((item) => {
        if (item.period === value.format("MMYYYY")) {
          result = (
            <div
              style={{ backgroundColor: "#EEF9E9", height: "100%", width: "100%", padding: "10px" }}
              onClick={() => {
                this.ShowDetailofMonth(item.detailList, value);
              }}
            >
              <p>Сумма: {item.totalAmount}</p>
              <p>Кол-во: {item.totalElements}</p>
            </div>
          );
        }
      });
    }
    return result;
  };

  monthCellRender2 = (value) => {
    let result = (<div style={{ backgroundColor: "green", opacity: "0.1", height: "100%", width: "100%" }}></div>);
    if (this.state.MonthHistory !== undefined && this.state.MonthHistory.length > 0) {
      this.state.MonthHistory.forEach((item) => {
        if (item.isDebt && item.payPeriod === value.format("MMYYYY")) {
          result = (
            <div
              style={{ backgroundColor: "rgba(255, 71, 65, 0.2)", height: "100%", width: "100%", padding: "10px" }} //
            >
              {/* <p>Сумма: {item.totalAmount}</p>
              <p>Кол-во: {item.totalElements}</p>*/}
            </div>
          );
        }
      });
    }
    return result;
  };

  ShowDetailofMonth = (value, date) => {
    if (value.length) {
      Modal.info({
        title: "Платежи в разрезе КНП за " + date.format("MMMM"),
        content: (
          <div>
            {value.map(item => (<p>{item.knp}. Сумма: {item.amount}, кол-во: {item.count}</p>))}
          </div>
        ),
        onOk() {
        }
      });
    }
  };

  loadGridData = () => {
    const { dispatch } = this.props;
    if (this.state.parameters.filter.iin) {
      this.searchperson(this.state.parameters.filter.iin);
    } else {

      delete this.state.parameters.filter.iin;
      if (this.state.parameters.filter.firstName) {

        this.state.parameters.filter.firstName = this.state.parameters.filter.firstName.toUpperCase();
      }
      if (this.state.parameters.filter.lastName) {

        this.state.parameters.filter.lastName = this.state.parameters.filter.lastName.toUpperCase();
      }

      if (this.state.parameters.filter.patronymic) {

        this.state.parameters.filter.patronymic = this.state.parameters.filter.patronymic.toUpperCase();
      }
      dispatch({
        type: "universal2/getList",
        payload: this.state.parameters
      }).then((response) => {
        if (response.totalElements > 1) {
          this.setState({
            visible: true
          });
        }
        if (response.totalElements === 1) {
          this.searchperson(response.content[0].iin);
        }
        if (response.totalElements === 0) {
          Modal.info({
            title: formatMessage({ id: "system.error" }),
            content: (
              <div>
                "Информация о потребителе не найдена!"
              </div>
            ),
            onOk() {
            }
          });
        }
      });
    }

  };

  applyFilter = () => {

    if (this.state.parameters.filter.iin) {
      this.loadGridData();
      return
    }
    if (this.state.parameters.filter.lastName) {
      this.loadGridData();
      return
    }
    if (this.state.parameters.filter.firstName) {
      this.loadGridData();
      return
    }
    if (this.state.parameters.filter.patronymic) {
      this.loadGridData();
      return
    }
    if (this.state.parameters.filter.birthdate) {
      this.loadGridData();
      return
    }

  };

  clearFilter = (pageNumber) => {
    this.setState({
      isClearFilter: true
    });
    this.setState({
      parameters: {
        ...this.state.parameters,
        filter: {}
      }
    });

  };

  searchperson = (value) => {
    const { dispatch } = this.props;
    this.setState({
      loading: true,
      iin: value
    }, () => {
      dispatch({
        type: "universal/SearcherData",
        payload: {
          iin: this.state.iin
        }
      }).then(() => {
        if (JSON.stringify(this.props.universal.searcherdata) !== "{}" && this.props.universal.searcherdata) {
          this.setState({
            person: this.props.universal.searcherdata
          }, () => {
            this.getpersonRPN();
            this.getpersonMED();
            this.payesSearcher(moment(new Date()).year());
          });
        } else {
          Modal.info({
            title: formatMessage({ id: "system.error" }),
            content: (
              <div>
                Информация о потребителе не найдена!
              </div>
            ),
            onOk() {
            }
          });
          this.setState({
            person: {
              "dSexId": {
                "nameKz": null,
                "id": null,
                "nameRu": null,
                "code": null
              },
              "iin": null,
              "firstname": null,
              "secondname": null,
              "birthdate": null,
              "lastname": null,
              "clinic": null,
              "citizenship": {
                "nameRu": null,
                "nameKz": null,
                "shortname": null,
                "code": null,
                "id": null
              },
              "clinic_date": null,
              "nationality": {
                "shortnameKz": null,
                "nameRu": null,
                "nameKz": null,
                "shortname": null,
                "code": null,
                "id": null
              },
              "categories": []
            },
            personRPN: {
              "dSexId": {
                "nameKz": null,
                "id": null,
                "nameRu": null,
                "code": null
              },
              "iin": null,
              "firstname": null,
              "secondname": null,
              "birthdate": null,
              "lastname": null,
              "clinic": null,
              "citizenship": {
                "nameRu": null,
                "nameKz": null,
                "shortname": null,
                "code": null,
                "id": null
              },
              "clinic_date": null,
              "nationality": {
                "shortnameKz": null,
                "nameRu": null,
                "nameKz": null,
                "shortname": null,
                "code": null,
                "id": null
              },
              "categories": []
            },
            personMED: {
              "categories": null,
              "status": null,
              "clinic": "",
              "pref_categories": [],
              "clinic_date": ""
            },
            loading: false,
            payes: []
          });
        }
      });
    });
    this.setState({
      visible: false
    });
  };

  onPanelChange = (value, mode) => {
    this.payesSearcher(value.year());
  };

  getpersonRPN = () => {
    const { dispatch } = this.props;
    this.setState({
      loading1: true
    }, () => {
      dispatch({
        type: "universal/SearcherRPNData",
        payload: {
          iin: this.state.iin
        }
      }).then(() => {

        if (JSON.stringify(this.props.universal.searcherRPNdata) !== "{}" && this.props.universal.searcherRPNdata) {
          this.setState({
            loading1: false,
            personRPN: this.props.universal.searcherRPNdata
          });
        } else {
          this.setState({
            loading1: false
          });
        }
      });
    });
  };


  getpersonMED = () => {
    const { dispatch } = this.props;
    this.setState({
      loading2: true
    }, () => {
      dispatch({
        type: "universal/SearcherMEDData",
        payload: {
          iin: this.state.iin
        }
      }).then(() => {
        if (JSON.stringify(this.props.universal.searcherMEDdata) !== "{}" && this.props.universal.searcherMEDdata) {
          this.setState({
            loading2: false,
            personMED: this.props.universal.searcherMEDdata
          });
        } else {
          this.setState({
            loading2: false
          });
        }
      });
    });
  };

  fieldOnChange = (filterItem, value) => {

    if (filterItem === "iin") {
      this.setState({
        parameters: {
          ...this.state.parameters,
          filter: { ...this.state.parameters.filter, "iin": value }
        }
      });
    }
    if (filterItem === "firstName") {
      if (value === "") {
        this.setState({
          parameters: {
            ...this.state.parameters,
            filter: { ...this.state.parameters.filter, "firstName": undefined }
          }
        });
      } else {
        this.setState({
          parameters: {
            ...this.state.parameters,
            filter: { ...this.state.parameters.filter, "firstName": value }
          }
        });
      }


      //


    }
    if (filterItem === "lastName") {
      if (value === "") {
        this.setState({
          parameters: {
            ...this.state.parameters,
            filter: { ...this.state.parameters.filter, "lastName": undefined }
          }
        });
      } else {
        this.setState({
          parameters: {
            ...this.state.parameters,
            filter: { ...this.state.parameters.filter, "lastName": value }
          }
        });
      }

    }
    if (filterItem === "patronymic") {
      if (value === "") {
        this.setState({
          parameters: {
            ...this.state.parameters,
            filter: { ...this.state.parameters.filter, "patronymic": undefined }
          }
        });
      } else {
        this.setState({
          parameters: {
            ...this.state.parameters,
            filter: { ...this.state.parameters.filter, "patronymic": value }
          }
        });
      }
    }
    if (filterItem === "birthdate") {
      if (value === "") {
        this.setState({
          parameters: {
            ...this.state.parameters,
            filter: { ...this.state.parameters.filter, "birthdate": undefined }
          }
        });
      } else {
        this.setState({
          parameters: {
            ...this.state.parameters,
            filter: { ...this.state.parameters.filter, "birthdate": value }
          }
        });
      }
    }


  };

  payesSearcher = (year) => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal/SearcherCalendar",
      payload: {
        iin: this.state.iin,
        year: year
      }
    }).then(() => {
      this.setState({
        payes: this.props.universal.searchercalendar,
        loading: false
      });
    });
    this.history();
  };
  history = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getPayerList",
      payload: {
        "entity": "iinPayments",
        "filter": {
          "iin": this.state.iin
        },
        "group": [
          {
            "field": "payPeriod"
          },
          {
            "field": "isDebt"
          }
        ]
      }
    }).then((response) => {
      console.log(response);
      this.setState({
        MonthHistory: response
      });
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  };

  handleCancelModal = (e) => {
    this.setState({
      visibleModal: false
    });
  };


  render() {
    const { isClearFilter } = this.state;
    const CardHeight = { height: "auto", marginBottom: "10px" };
    const { person, personRPN, personMED } = this.state;
    const columns = [{
      title: "Наименование",
      dataIndex: "name",
      render: (text) => <div style={{ color: "black",background :"#efefef",  padding: "10px",textAlign: "right" }}>{text}</div>,
      width: 100

    }, {
      title: "Значения",
      dataIndex: "value",
      key: "value",
      width: 150
    }
    ];
    const data = [{
      key: 1,
      name: "ИИН",
      value: person.iin ? person.iin.toUpperCase() : person.iin
    }, {
      key: 2,
      name: "ФАМИЛИЯ",
      value: person.lastname ? person.lastname.toUpperCase() : person.lastname
    }, {
      key: 3,
      name: "ИМЯ",
      value: person.firstname ? person.firstname.toUpperCase() : person.firstname
    }, {
      key: 4,
      name: "ОТЧЕСТВО",
      value: person.secondname ? person.secondname.toUpperCase() : person.secondname
    }, {
      key: 5,
      name: "ДАТА РОЖДЕНИЯ",
      value: person.birthdate ? person.birthdate.toUpperCase() : person.birthdate
    }, {
      key: 6,
      name: "ПОЛ",
      value: person.dSexId ? (person.dSexId.nameRu ? person.dSexId.nameRu.toUpperCase() : " ") : ""
    }, {
      key: 7,
      name: "НАЦИОНАЛЬНОСТЬ",
      value: person.nationality ? (person.nationality.nameRu ? person.nationality.nameRu.toUpperCase() : " ") : ""
    }, {
      key: 8,
      name: "ГРАЖДАНСТВО",
      value: person.citizenship ? (person.citizenship.nameRu ? person.citizenship.nameRu.toUpperCase() : " ") : ""
    }, {
      key: 9,
      name: "РЕГИОН (ОБЛАСТЬ)",
      value: ""
    }, {
      key: 10,
      name: "МЕСТО ЖИТЕЛЬСТВА",
      value: ""
    }, {
      key: 11,
      name: "ТЕЛЕФОН",
      value: ""
    }
    ];

    const secondData = [{
      key: 9,
      name: "СТАТУС СТРАХОВАНИЯ",
      value: personMED.clinic ? (personMED.status ? formatMessage({ id: "report.param.medinsstattrue" }).toUpperCase() : formatMessage({ id: "report.param.medinsstatfalse" }).toUpperCase()) : ""
    }, {
      key: 10,
      name: "ЛЬГОТНАЯ КАТЕГОРИЯ",
      value: personMED.pref_categories !== undefined ? personMED.pref_categories.map((category) =>
        <div>
          <div style={{ width: "80%", wordWrap: "break-word" }}
               color="blue">{category.name ? category.name.toUpperCase() : ""}</div>
          <br></br>
        </div>) : ""
    }, {
      key: 11,
      name: "Медицинская организация".toUpperCase(),
      value: personMED.clinic ? personMED.clinic.toUpperCase() : personMED.clinic
    }, {
      key: 12,
      name: "Дата прикрепления".toUpperCase(),
      value: personMED.clinic_date ? personMED.clinic_date.toUpperCase() : personMED.clinic_date
    }, {
      key: 13,
      name: "Категория потребителя".toUpperCase(),
      value: personMED.categories ? personMED.categories.toUpperCase() : ""
    }, {
      key: 14,
      name: "ПАКЕТ СТРАХОВАНИЯ",
      value: personMED.insurancePackage && personMED.insurancePackage.nameRu ? personMED.insurancePackage.nameRu.toUpperCase() : ""
    }];


    /**/
    const dataRPM = [{
      key: 14,
      name: "ИИН",
      value: personRPN.iin ? person.iin.toUpperCase() : person.iin
    }, {
      key: 15,
      name: "ФАМИЛИЯ",
      value: personRPN.lastname ? person.lastname.toUpperCase() : person.lastname
    }, {
      key: 16,
      name: "ИМЯ",
      value: personRPN.firstname ? person.firstname.toUpperCase() : person.firstname
    }, {
      key: 17,
      name: "ОТЧЕСТВО",
      value: personRPN.secondname ? person.secondname.toUpperCase() : person.secondname
    }, {
      key: 18,
      name: "ДАТА РОЖДЕНИЯ",
      value: personRPN.birthdate ? person.birthdate.toUpperCase() : person.birthdate
    }, {
      key: 19,
      name: "ПОЛ",
      value: personRPN.dSexId ? (personRPN.dSexId.nameRu ? person.dSexId.nameRu.toUpperCase() : " ") : ""
    }, {
      key: 20,
      name: "НАЦИОНАЛЬНОСТЬ",
      value: personRPN.nationality ? (personRPN.nationality.nameRu ? person.nationality.nameRu.toUpperCase() : " ") : ""
    }, {
      key: 21,
      name: "ГРАЖДАНСТВО",
      value: personRPN.citizenship ? (personRPN.citizenship.nameRu ? person.citizenship.nameRu.toUpperCase() : "") : ""
    }
    ];
    const mBottom = { marginBottom: "5px" };
    const columnsTable = [
      {
        "title": "ИИН",
        "dataIndex": "iin",
        "isVisible": "true"
      },
      {
        "title": "Фамилия",
        "dataIndex": "lastName",
        "isVisible": "true"
      },
      {
        "title": "Имя",
        "dataIndex": "firstName",
        "isVisible": "true"
      },
      {
        "title": "Отчество",
        "dataIndex": "patronymic",
        "isVisible": "true"
      }, {
        "title": "Дата рождения",
        "dataIndex": "birthdate",
        "isVisible": "true"
      }

    ];

    let params = {
      style: {
        width: "40%"
      },
      format: dateFormat,
      onChange: (moment, dateString) => {
        this.fieldOnChange("birthdate", dateString);
      }
    };
    if (isClearFilter) {
      params.value = null;
    }
    return (<div>
        {/*<Modal*/}
        {/*title=""*/}
        {/*visible={this.state.visibleModal}*/}
        {/*// onCancel={this.handleCancelModal}*/}
        {/*onOk={this.handleCancelModal}*/}
        {/*>*/}
        {/*<p>Информация о потребителе не найдена</p>*/}
        {/*</Modal>*/}
        <Modal
          title=""
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width={750}
        >
          <Table onRowClick={(selectedRows) => {
            this.searchperson(selectedRows.iin);
          }} columns={columnsTable}
                 dataSource={this.props.universal2.references[this.state.parameters.entity] ? this.props.universal2.references[this.state.parameters.entity].content ? this.props.universal2.references[this.state.parameters.entity].content : [] : []}/>

        </Modal>
        {/*<Spin tip="" spinning={this.state.loading && this.state.loading1 && this.state.loading2}>*/}
        <Row style={{ marginBottom: "10px" }}>
          <Row>
            <div style={CardHeight}>


              <Card
                style={{ marginBottom: "10px" }}
                type="inner"
                bodyStyle={{ padding: 25 }}
                title={formatMessage({ id: "report.param.searcher" })}
              >

                <Col span={8}>
                  <div style={mBottom}>ИИН:
                    <div style={{ width: "100%" }}>
                      <Row>
                        <Col span={12}>
                          <Input style={{ width: "100%" }} value={this.state.parameters.filter.iin} maxLength={12}
                                 onChange={(e) => {
                                   this.fieldOnChange("iin", e.target.value);
                                 }}/>
                        </Col>
                        <Col span={8}>
                          {this.state.person.iin &&
                          <Button
                            style={{ marginLeft: "5px" }}
                            onClick={() => {
                              if (this.state.iin) {
                                //this.props.searchbyiin(this.state.iin);
                                this.props.onSelect(this.state.iin);
                              }
                            }}>
                            Просмотр платежей
                          </Button>
                          }
                        </Col>
                      </Row>
                    </div>
                  </div>
                  {this.state.visibleFilter &&
                  <div style={mBottom}>Фамилия:
                    <Input style={{ width: "100%" }}
                           value={this.state.parameters.filter.lastName ? this.state.parameters.filter.lastName.toUpperCase() : ""}
                           onChange={(e) => {
                             this.fieldOnChange("lastName", e.target.value);
                           }}/></div>}
                  {this.state.visibleFilter && <div style={mBottom}>Имя:
                    <Input style={{ width: "100%" }}
                           value={this.state.parameters.filter.firstName ? this.state.parameters.filter.firstName.toUpperCase() : ""}
                           onChange={(e) => {
                             this.fieldOnChange("firstName", e.target.value);
                           }}/></div>}
                  {this.state.visibleFilter && <div style={mBottom}>Отчество:
                    <Input style={{ width: "100%" }}
                           value={this.state.parameters.filter.patronymic ? this.state.parameters.filter.patronymic.toUpperCase() : ""}
                           onChange={(e) => {
                             this.fieldOnChange("patronymic", e.target.value);
                           }}/></div>}
                  {this.state.visibleFilter && <div style={mBottom}>День рождения: <div style={{ width: "100%" }}>
                    <DatePicker  {...params}
                                 format={"DD.MM.YYYY"}/></div></div>}
                  {/*<Spin tip="Загрузка..." spinning={count.length > 0 ? this.props.loadingData : false}>*/}
                  <Form layout={"vertical"}>

                    < Button style={{ margin: "10px 0 0 0px" }} type='primary'
                             onClick={this.applyFilter}>
                      {formatMessage({ id: "system.search" })}
                    </Button>
                    <Button style={{ margin: "10px 0 0 5px" }}
                            onClick={this.clearFilter}>{formatMessage({ id: "system.clear" })}</Button>
                    {!this.state.visibleFilter && < Button style={{ margin: "10px 0 0 5px" }}
                                                           onClick={() => {
                                                             this.setState({
                                                               visibleFilter: true
                                                             });
                                                           }}>
                      {"Расширенный поиск"}
                    </Button>}
                    {this.state.visibleFilter && < Button style={{ margin: "10px 0 0 5px" }}
                                                          onClick={() => {
                                                            this.setState({
                                                              visibleFilter: false
                                                            });
                                                          }}>
                      {"Свернуть"}
                    </Button>}

                  </Form>


                  {/*<Search*/}
                  {/*placeholder="Введите ИИН"*/}
                  {/*enterButton={formatMessage({ id: "system.search" })}*/}
                  {/*size="large"*/}
                  {/*maxLength={12}*/}
                  {/*style={{ width: 600 }}*/}
                  {/*onSearch={value => this.searchperson(value)}*/}

                  {/*/>*/}
                  {/*<GridFilter*/}
                  {/*// clearFilter={this.clearFilter(pageNumber)}*/}
                  {/*clearFilter={(pageNumber) => this.clearFilter(pageNumber)}*/}
                  {/*applyFilter={(filter) => this.applyFilter(filter)} key={"1"}*/}
                  {/*filterForm={this.state.filterForm}*/}
                  {/*dateFormat={dateFormat}/>*/}

                </Col>

              </Card>

            </div>
          </Row>


          <Tabs
            defaultActiveKey="1"
            tabPosition={"left"}
            style={{ height: "auto", marginTop: "20px" }}
          >
            <TabPane tab={formatMessage({ id: this.props.persontitle })}
                     key="1"
                     disabled={!personRPN.iin}
            >
              <Row gutter={12}>
                <Col span={12}>
                  <Card
                    bodyStyle={{ height: "auto" }}
                    title={formatMessage({ id: "menu.payments.searcherRPM" })}
                    type="inner"
                  >
                    <Table
                      className={"view_document_table"}
                      columns={columns}
                      dataSource={data}
                      pagination={{ pageSize: 50, position: "none" }}
                      showHeader={false}
                      size={"default"}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    bodyStyle={{ height: "auto" }}
                    title={formatMessage({ id: "menu.payments.searcherGBDFL" })}
                    type="inner"
                  >
                    <Table
                      className={"view_document_table"}
                      columns={columns}
                      dataSource={dataRPM}
                      pagination={{ pageSize: 50, position: "none" }}
                      showHeader={false}
                      size={"default"}
                    />
                  </Card>
                </Col>
                <Col span={24}>
                  <Card
                    style={{ marginTop: "10px" }}
                    bodyStyle={{ height: "auto" }}
                    type="inner"
                  >
                    <Table
                      columns={columns}
                      dataSource={secondData}
                      className={"view_document_table"}
                      pagination={{ pageSize: 50, position: "none" }}
                      showHeader={false}
                      size={"default"}
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={formatMessage({ id: "report.param.monthpay" })}
                     key="2"
                     disabled={!personRPN.iin}
            >
              <Row>
                <Col span={24}>
                  <Card
                    style={{ height: "600", marginTop: "10px" }}
                    title={formatMessage({ id: "report.param.monthpay" })}
                    type="inner"
                  >
                    <Calendar
                      onPanelChange={this.onPanelChange}
                      mode='year'
                      className={historystyle.customCalendar}
                      monthCellRender={this.monthCellRender}
                      fullscreen
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={formatMessage({ id: "menu.payments.medicalsearcher" })}
              key="3"
              disabled={!personRPN.iin}
            >
              <Medicine/>
            </TabPane>
            <TabPane
              tab={"Список плательщиков"}
              key="4"
              disabled={!personRPN.iin}
            >
              <Employees
                onSearch={this.state.iin}
              />
            </TabPane>
            <TabPane tab={"Информация о задолженности"}
                     key="5"
                     disabled={!personRPN.iin}
            >
              <Row>
                <Col span={24}>
                  <Card
                    style={{ height: "600", marginTop: "10px" }}
                    title={formatMessage({ id: "Информация о задолженности" })}
                    type="inner"
                  >
                    <Calendar
                      onPanelChange={this.onPanelChange}
                      mode='year'
                      className={historystyle}
                      monthCellRender={this.monthCellRender2}
                      fullscreen
                      defaultValue={moment("2018-02-27T10:00:00")}
                      validRange={[moment("2018-02-27T10:00:00"), moment("2018-02-27T10:00:00")]}
                    />
                    <Calendar
                      onPanelChange={this.onPanelChange}
                      mode='year'
                      className={historystyle}
                      monthCellRender={this.monthCellRender2}
                      fullscreen
                      defaultValue={moment("2019-02-27T10:00:00")}
                      validRange={[moment("2019-02-27T10:00:00"), moment("2019-02-27T10:00:00")]}
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={"Обращения"}
              key="6"
              disabled={!personRPN.iin}
            >
              <Appeals
                onSearch={this.state.iin}/>
            </TabPane>

          </Tabs>
        </Row>
      </div>
    );
  }
}

export default connect(({ universal, loading }) => {
  return {
    universal,
    loadingData: loading.effects["universal/SearcherData"]
  };
})(Searcher);


{/*<Input
                      value={iin}
                      name='iin'
                      onChange={(e) => {
                        this.formfield(e);
                    }}
                    />*/
}
{/*<Button
                    onClick={()=>{
                      this.setState({
                        person: {
                          "dSexId": {
                            "nameKz": null,
                            "id": null,
                            "nameRu": null,
                            "code": null
                          },
                          "iin": null,
                          "firstname": null,
                          "secondname": null,
                          "birthdate": null,
                          "lastname": null
                        }
                      })
                  }}
                  >
                    {formatMessage({ id: 'system.clear' })}
                  </Button>*/
}



