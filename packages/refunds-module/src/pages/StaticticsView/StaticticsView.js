import React, { Component } from 'react';
import { Card, Label,Tooltip,Row,Col,DatePicker,Button } from 'antd';
import connect from "../../Redux";
import moment from "moment";
// import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import numeral from "numeral";
import {ChartCard,Field } from "../../components/Charts";
import formatMessage from "../../utils/formatMessage";


const {RangePicker} = DatePicker;
const dt = moment(new Date()).format('DD.MM.YYYY');
class StaticticsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginDate:dt,
      filters: {
        dateValues: [dt, dt],
      },
      gridData: {
        columns: [
          {
            isVisible: true,
            dataIndex: 'appcount',
            title: 'Количество заявок на возврат',
          },
          {
            dataIndex: 'otcount',
            isVisible: true,
            title: 'Количество отчислений на возврат',
          },
          {
            dataIndex: 'vzcount',
            isVisible: true,
            title: 'Количество взносов на возврат',
          },
          {
            dataIndex: 'penotcount',
            isVisible: true,
            title: 'Количество пени за отчисления',
          },
          {
            dataIndex: 'penvzcount',
            isVisible: true,
            title: 'Количество пени за взносы',
          },
          {
            dataIndex: 'otsum',
            isVisible: true,
            title: 'Сумма отчислений на возврат',
          },
          {
            dataIndex: 'vzsum',
            isVisible: true,
            title: 'Сумма взносов на возврат',
          },
          {
            dataIndex: 'penotsum',
            isVisible: true,
            title: 'Сумма пени за отчисления на возврат',
          },
          {
            dataIndex: 'penvzsum',
            isVisible: true,
            title: 'Сумма пени за взносы на возврат',
          },
        ],
      },
      salesType: 'all',
      currentTabKey: '',
      loading: false,
    };
  }



  componentDidMount() {
    this.loadMainGridData();
  }


  loadMainGridData = () => {
    const {dispatch} = this.props;
    //dateStart=01.11.2010&dateEnd=16.11.2018
    dispatch({
      type: 'universal2/statisticsData',
      payload: this.state.filters.dateValues !== null ? {
        dateStart: this.state.filters.dateValues[0],
        dateEnd: this.state.filters.dateValues[1],
      } : {
        dateStart: null,
        dateEnd: null,
      },
    });
  };
  render() {
   const dt = moment(new Date()).format('DD.MM.YYYY');
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: {marginBottom: 24},
    };


    return (
      <div style={{backgroundColor: '#f1f3f5'}}>
        <Row style={{margin: '50px'}}>
          <Card bodyStyle={{padding: 5}} style={{marginTop: '40px',}}>
            <Row type="flex" justify="center">
              <Col>
                <Card bodyStyle={{padding: 5}}>
                  <RangePicker
                    defaultValue={[moment(dt, 'DD.MM.YYYY'), moment(dt, 'DD.MM.YYYY')]}
                    placeholder={[formatMessage({id: 'datepicker.start.label'}), formatMessage({id: 'datepicker.end.label'})]}
                    format={'DD.MM.YYYY'}
                    style={{ width: "230px" }}
                    onChange={(date, dateString) => {
                      this.setState((prevState) => ({
                        filters: {
                          ...prevState.filters,
                          dateValues: dateString,
                        },
                      }));
                    }}/>
                  <Button style={{margin: '10px'}} onClick={() => {
                    this.loadMainGridData();
                  }
                  }>{formatMessage({id: 'button.apply'})}</Button>
                </Card>
              </Col>
            </Row>
          </Card>
          <Row style={{margin: '50px'}} gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество заявок на возврат '
                action={
                  <Tooltip
                    title={formatMessage({id:'app.analysis.introduce'})
                    }
                  >


                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.appcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество заявок на возврат '
                    }
                    value={numeral(this.props.universal2.dataStore.appcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >


              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество отчислений на возврат '
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={formatMessage({id:'app.analysis.introduce'})}
                  >


                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.otcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество отчислений на возврат '
                    }
                    value={numeral(this.props.universal2.dataStore.otcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество взносов на возврат '
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={formatMessage({id:'app.analysis.introduce'})}
                  >


                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.vzcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество взносов на возврат '
                    }
                    value={numeral(this.props.universal2.dataStore.vzcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество пени за отчисления '
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={formatMessage({id:'app.analysis.introduce'})}
                  >


                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.penotcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество пени за отчисления '
                    }
                    value={numeral(this.props.universal2.dataStore.penotcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество пени за взносы '
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={formatMessage({id:'app.analysis.introduce'})}
                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.penvzcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество пени за взносы '
                    }
                    value={numeral(this.props.universal2.dataStore.penvzcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Сумма отчислений на возврат '
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={formatMessage({id:'app.analysis.introduce'})}

                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.otsum).format('0,0')}
                footer={
                  <Field
                    label={
                      'Сумма отчислений на возврат '
                    }
                    value={numeral(this.props.universal2.dataStore.otsum).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Сумма взносов на возврат '
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={formatMessage({id:'app.analysis.introduce'})}
                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.vzsum).format('0,0')}
                footer={
                  <Field
                    label={
                      'Сумма взносов на возврат '
                    }
                    value={numeral(this.props.universal2.dataStore.vzsum).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Сумма пени за отчисления на возврат '
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={formatMessage({id:'app.analysis.introduce'})}
                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.penotsum).format('0,0')}
                footer={
                  <Field
                    label={
                      'Сумма пени за отчисления на возврат '
                    }
                    value={numeral(this.props.universal2.dataStore.penotsum).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Сумма пени за взносы на возврат '
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={formatMessage({id:'app.analysis.introduce'})}
                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.penvzsum).format('0,0')}
                footer={
                  <Field
                    label={
                      'Сумма пени за взносы на возврат '
                    }
                    value={numeral(this.props.universal2.dataStore.penvzsum).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
          </Row>
        </Row>
      </div>


    );
  }
}

export default  connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/statisticsData'],
}))(StaticticsView);
