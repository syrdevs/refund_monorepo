import React, { Component } from 'react';
import { Card, Label, Row, Col, Input, Button, Table, Tabs, Spin } from 'antd';
import connect from "../../Redux";


function formatMessage(value) {
  return value.id;
}

const TabPane = Tabs.TabPane;

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      columns: [],
      data:[]
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/optionsData',
      payload: {},
    })
  }


  fieldOnChange = (value, index, childindex) => {
    const datasource = this.props.universal.options;
    datasource[index].groupOptionList[childindex].optionValue = value;
    const { dispatch } = this.props;
    this.setState({
      data: datasource
    })
  };
  saveChanges = () => {
    const { dispatch } = this.props;
    const values=[];
    this.state.data.map((group)=> {group.groupOptionList.map((item)=>{values.push(item)})})
    dispatch({
      type: 'universal/optionsDatachange',
      payload: values,
    }).then((item)=>{
      dispatch({
        type: 'universal/optionsData',
        payload: {},
      })
    })
    //payload: this.state.data.map((item)=> (item.groupOptionList)),
  };

  render() {
    const { datasource } = this.props.universal.options;
    return (
        <Card bodyStyle={{ padding: 5 }} style={{width: '100%'}}>
            <Row>
              <Button
                type="primary"
                style={{ margin: '5px 0px 0px 5px' }}
                onClick={() => {
                  this.saveChanges();
                }}>
                {formatMessage({ id: 'form.save' })}
              </Button>
            </Row>
            <Row>
              <Tabs defaultActiveKey="0">
                {this.props.universal.options.map((tabItem, index) => {
                  return (
                    <TabPane tab={tabItem.groupNameRu} key={index}>
                      {tabItem.groupOptionList
                        .map((inputs, childindex) => {
                          return (
                            <Row style={{ margin: '0px 10px 10px 10px' }} key={index + '' + childindex}>
                              <Col span={24} key={index + '' + childindex}>
                                <Input addonBefore={inputs.optionName} key={index + '' + childindex}
                                       defaultValue={inputs.optionValue} onChange={(e) => {
                                  this.fieldOnChange(e.target.value, index, childindex);
                                }}/>
                              </Col>
                            </Row>
                          );
                        })
                      }
                    </TabPane>);
                })}
              </Tabs>
            </Row>
          </Card>
    );
  }
}
/*export default connect(({ universal, universal2, references, loading }) => ({
  universal,
  universal2,
  references,
  loadingData: loading.effects["universal2/getList"],
  rpmuLoading: loading.effects["universal/rpmuTable"]
}))(MainView);*/

export default  connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/optionsData'],
}))(Options);
