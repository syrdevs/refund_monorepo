import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox,
  Row, Col, Input, DatePicker, Sea, Card, Collapse, Pagination
} from "antd";

const { Meta } = Card;
const Panel = Collapse.Panel;
const Search = Input.Search;

export default class PullFilter extends Component {
  state = {
    ImportModalGrid: {
      visible: true,
    },
  };

  componentWillUnmount = () => {

  };

  componentDidMount = () => {

  };

  handleSubmit = (e) => {

  }

  normFile = (e) => {

  }


  render = () => {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const pullStyle = { width: "95%", margin: '16px auto 0 auto', borderRadius:'5px' };

    return (
      <Row style={{textAlign:'center'}}>
        <div style={{display:'inline-block'}}>
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{float:'left', margin:'10px'}}>
            <Radio.Button value="a">Исполнено</Radio.Button>
            <Radio.Button value="b">Согласовано</Radio.Button>
            <Radio.Button value="c">Отклонено</Radio.Button>
          </Radio.Group>
        </div>
        <Search
          enterButton
          size="large"
          onSearch={value => console.log(value)}
          style={{width:'90%', marginBottom:'10px'}}
        />
        <Card  bodyStyle={{ overflowY: "auto" , height:'700px', padding: '5px', marginBottom:'5px'}} style={{width:'96%', margin:'0 2% 0 2%'}}>
          <Card style={pullStyle} bodyStyle={{textAlign:'left'}}>
            <Meta
              title="№8003, Одобренные."
              description="Количество возвратов: 302"
            />
            <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)'}}>06.01.2019</div>
          </Card>
          <Card bodyStyle={{textAlign:'left'}} style={{ width: "95%", margin: '16px auto 0 auto', borderRadius:'5px', backgroundColor:'rgb(181,46,53,0.2)' }}>
            <Meta
              title="№8003, Одобренные."
              description="Количество возвратов: 302"
            />
            <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)'}}>06.01.2019</div>
          </Card>
          <Card bodyStyle={{textAlign:'left'}} style={{ width: "95%", margin: '16px auto 0 auto', backgroundColor:'rgb(60,181,68,0.2)', borderRadius:'5px' }}>
            <Meta
              title="№8003, Одобренные."
              description="Количество возвратов: 302"
            />
            <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)'}}>06.01.2019</div>
          </Card>
        </Card>
        <Pagination simple defaultCurrent={2} total={50} style={{margin:'10px'}} />
      </Row>
    );
  };
}
