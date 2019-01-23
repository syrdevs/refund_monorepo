import React, { Component } from "react";
import formatMessage from "../../utils/formatMessage";

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
  Collapse, Divider
} from "antd";
import connect from "../../Redux";
import style from "./Searcher.less";
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
      parameters: {
        start: 0,
        length: 15,
        entity: "person",
        filter: {},
        sort: []
      },
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
          name: "firstName",
          type: "text"
        }, {
          label: "Имя",
          name: "lastName",
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


  monthCellRender = (value) => {
    /*let isPayed  = false;
    this.state.payes.map((item) => {
      if(item.period===value.format('MMYYYY')) {
        isPayed=true
      }
    });
    if(isPayed){
      return (<div style={{backgroundColor: '#52c41a', opacity: '0.1',  height: '100%', width: '100%'}}></div>)
    }
    else {
      return (<div style={{backgroundColor:'red', opacity: '0.1', height: '100%', width: '100%'}}></div>)
    }
*/
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
    /*let isPayed  = false;
    this.state.payes.map((item) => {
      if(item.period===value.format('MMYYYY')) {
        isPayed=true
      }
    });
    if(isPayed){
      return (<div style={{backgroundColor: '#52c41a', opacity: '0.1',  height: '100%', width: '100%'}}></div>)
    }
    else {
      return (<div style={{backgroundColor:'red', opacity: '0.1', height: '100%', width: '100%'}}></div>)
    }
*/
    let result = (<div style={{ backgroundColor: "green", opacity: "0.1", height: "100%", width: "100%" }}></div>);
    if (this.state.payes !== undefined && this.state.payes.length > 0) {
      this.state.payes.forEach((item) => {
        if (item.period === value.format("MMYYYY")) {
          result = (
            <div
              style={{ backgroundColor: "red", height: "100%", width: "100%", padding: "10px" }}
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
    let sortField = this.state.sortedInfo;
    dispatch({
      type: "universal2/getList",
      payload: this.state.parameters
    }).then((response) => {
      if (response.size > 1) {
        this.setState({
          visible: true
        });
      }
      if (response.size == 1) {
        this.searchperson(response.content.iin);
      }
    });
  };

  applyFilter = () => {


      this.loadGridData();


  };

  clearFilter = (pageNumber) => {
    this.setState({
      parameters: {
        ...this.state.parameters,
        filter: {},
      }
    });
    console.log(this.state.parameters)
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

if(filterItem==="iin"){
  this.setState({
    parameters: {
      ...this.state.parameters,
      filter: { ...this.state.parameters.filter ,"iin": value},
    }
  });
}if(filterItem==="firstName"){
      this.setState({
        parameters: {
          ...this.state.parameters,
          filter: { ...this.state.parameters.filter ,"firstName": value},
        }
      });
    }
    if(filterItem==="lastName"){
      this.setState({
        parameters: {
          ...this.state.parameters,
          filter: { ...this.state.parameters.filter ,"lastName": value},
        }
      });
    }
    if(filterItem==="patronymic"){
      this.setState({
        parameters: {
          ...this.state.parameters,
          filter: { ...this.state.parameters.filter ,"patronymic": value},
        }
      });
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
  };

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  };


  render() {
    const CardHeight = { height: "auto", marginBottom: "10px" };
    const { person, personRPN, personMED } = this.state;
    const columns = [{
      title: "Наименование",
      dataIndex: "name",
      render: (text) => <div style={{ color: "black" }}>{text}</div>,
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
      value: person.dSexId.nameRu ? person.dSexId.nameRu.toUpperCase() : person.dSexId.nameRu
    }, {
      key: 7,
      name: "НАЦИОНАЛЬНОСТЬ",
      value: person.nationality.nameRu ? person.nationality.nameRu.toUpperCase() : person.nationality.nameRu
    }, {
      key: 8,
      name: "ГРАЖДАНСТВО",
      value: person.citizenship.nameRu ? person.citizenship.nameRu.toUpperCase() : person.citizenship.nameRu
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
          <div style={{ width: "80%", wordWrap: "break-word" }} color="blue">{category.name.toUpperCase()}</div>
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
      value: ""
    }
    ];


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
      value: personRPN.dSexId.nameRu ? person.dSexId.nameRu.toUpperCase() : person.dSexId.nameRu
    }, {
      key: 20,
      name: "НАЦИОНАЛЬНОСТЬ",
      value: personRPN.nationality.nameRu ? person.nationality.nameRu.toUpperCase() : person.nationality.nameRu
    }, {
      key: 21,
      name: "ГРАЖДАНСТВО",
      value: personRPN.citizenship.nameRu ? person.citizenship.nameRu.toUpperCase() : person.citizenship.nameRu
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
        "dataIndex": "firstName",
        "isVisible": "true"
      },
      {
        "title": "Имя",
        "dataIndex": "lastName",
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

    return (<div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width={750}
        >
          <Table onRowClick={(selectedRows) => {
            this.searchperson(selectedRows.iin);
          }} columns={columnsTable}
                 dataSource={this.props.universal2.references[this.state.parameters.entity] ? this.props.universal2.references[this.state.parameters.entity].content ? this.props.universal2.references[this.state.parameters.entity].content : [] : []}/>

        </Modal>
        <Spin tip="" spinning={this.state.loading && this.state.loading1 && this.state.loading2}>
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
                      <Input style={{ width: "100%" }} maxLength={12} onChange={(e) => {
                        this.fieldOnChange("iin",e.target.value);
                      }} /></div>
                    {this.state.visibleFilter &&
                    <div style={mBottom}>Фамилия:
                      <Input style={{ width: "100%" }}  onChange={(e) => {
                        this.fieldOnChange("firstName",e.target.value);
                      }}/></div>}
                    {this.state.visibleFilter && <div style={mBottom}>Имя:
                      <Input style={{ width: "100%" }} onChange={(e) => {
                        this.fieldOnChange("lastName",e.target.value);
                      }}/></div>}
                    {this.state.visibleFilter && <div style={mBottom}>Отчество:
                      <Input style={{ width: "100%" }} onChange={(e) => {
                        this.fieldOnChange("patronymic",e.target.value);
                      }}/></div>}
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
                      {this.state.visibleFilter &&  < Button style={{ margin: "10px 0 0 5px" }}
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
                    {this.state.person.iin && <Button
                      style={{ marginLeft: "10px" }}
                      size={"large"}
                      onClick={() => {
                        if (this.state.iin) {
                          this.props.searchbyiin(this.state.iin);
                        }
                      }}
                    >Просмотр платежей</Button>}
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
              >
                <Row gutter={12}>
                  <Col span={12}>
                    <Card
                      bodyStyle={{ height: "auto" }}
                      title={formatMessage({ id: "menu.payments.searcherRPM" })}
                      type="inner"
                    >
                      <Table
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
                        className={"customanttable"}
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
                        className={style.customCalendar}
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
              <TabPane tab={"История о задолженности"}
                       key="5"
              >
                <Row>
                  <Col span={24}>
                    <Card
                      style={{ height: "600", marginTop: "10px" }}
                      title={formatMessage({ id: "История о задолженности" })}
                      type="inner"
                    >
                      <Calendar
                        onPanelChange={this.onPanelChange}
                        mode='year'
                        className={style.customCalendar}
                        monthCellRender={this.monthCellRender2}
                        fullscreen
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
        </Spin>
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



