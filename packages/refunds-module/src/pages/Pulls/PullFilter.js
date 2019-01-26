import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox,
  Row, Col, Input, DatePicker, Sea, Card, Collapse, Pagination, Menu, Dropdown, Modal
} from "antd";
import './PullFilter.css';
import connect from "../../Redux";

const { Meta } = Card;
const Panel = Collapse.Panel;
const Search = Input.Search;
const { TextArea } = Input;

const RejectModalContent = (prop) => {
  return (<div>
    Причина отмены:
    <TextArea
      onChange={(e) => {
        prop.setReject(e.target.value);
      }}
      style={{ marginTop: "5px" }}
      rows={2}/>
  </div>);
};

class PullFilter extends Component {
  state = {
    ImportModalGrid: {
      visible: true,
    },
    pullpagingConfig: {
      "start": 0,
      "length": 10,
      "entity": "refundPack",
      "alias": null,
      sort: [{field: "number", desc: true}]
    },
  };

  componentWillUnmount = () => {

  };

  componentDidMount = () => {
   //this.loadpullcard();
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: this.state.pullpagingConfig
    }).then((response)=>{

      /*let elements = document.getElementsByClassName('.cardbtn');
      let requiredElement = elements[0];
      console.log(requiredElement);
      console.log("requiredElement");*/
    })

    /*var elements = document.getElementsByClassName('className');
    var requiredElement = elements[0];*/

  };

  loadpullcard = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: this.state.pullpagingConfig
    })
      .then(()=>{
      })
  }

  searchpullcard = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: {
        ...this.state.pullpagingConfig,
        filter:{
          number:id
        }
      }
    })
      .then(()=>{
      })
  }

  handleSubmit = (e) => {

  }

  normFile = (e) => {

  }

  cardClick = (e, item) => {
    if (e.target.className !== "dropmenu") {
      document.getElementById("clickedcard") && document.getElementById("clickedcard").removeAttribute("id")
      e.target.closest('.cardbtn').id = 'clickedcard';
      this.props.loadPull(item.id);
      console.log(item);
      //
      this.props.statuss(!item.documentStatuss)
    }
  }

  onShowSizeChange = (current) =>  {
    this.setState({
      pullpagingConfig: {
        ...this.state.pullpagingConfig,
        start: current*10
      }
    }, () => {
      this.loadpullcard();
      this.props.clearPull;
    })
  }


  deleteObject = (item) => {
    Modal.confirm({
      title: 'Удалить  пул номер'+item.number+'?',
      okText: "Подтвердить",
      cancelText: "Отмена",
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: "universal/deleteObject",
          payload: {
            "entity":"refundPack",
            "alias":null,
            "id": item.id
          }
        }).then(() => {
          this.loadpullcard();
        })
        .catch((e)=>{
          Modal.error({
            content: e.getResponseValue().data.Message ? (e.getResponseValue().data.Message) : "Ошибка на стороне сервера!"
          });
        })
      },
      onCancel: () => {

      },
    });
  }

  rejectDocument = (item) => {
    let rejectText = "";
    let modal = null;
    modal = Modal.confirm({
      title: 'Отклонить пул номер'+item.number+'?',
      okText: "Подтвердить",
      cancelText: "Отмена",
      okButtonProps: {
        disabled: true
      },
      content: <RejectModalContent setReject={(text) => {
        rejectText = text;

        if (rejectText.length > 0) {
          modal.update({
            okButtonProps: {
              disabled: false
            }
          });
        }
        if (rejectText.length === 0) {
          modal.update({
            okButtonProps: {
              disabled: true
            }
          });
        }
      }}/>,
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: "universal/rejectDocument",
          payload: {
            "entity": "refundPack",
            "id": item.id,
            "comment": rejectText
          }
        }).then(() => {
          this.loadpullcard();
        })
          .catch((e)=>{
            Modal.error({
              content: e.getResponseValue().data.Message ? (e.getResponseValue().data.Message) : "Ошибка на стороне сервера!"
            });
          })
      },
      onCancel: () => {
        modal.update({
          okButtonProps: {
            disabled: true
          }
        });
      }
    });
  }


  render = () => {

    const universal = {
      table: this.props.universal2.references[this.state.pullpagingConfig.entity] ? this.props.universal2.references[this.state.pullpagingConfig.entity] : {}
    };
    const menu = (e) => (
      <Menu>
        <Menu.Item>
          <p className={'dropmenu'} onClick={()=>{this.deleteObject(e)}}>Удалить</p>
        </Menu.Item>
        <Menu.Item>
          <p  className={'dropmenu'} onClick={()=>{this.rejectDocument(e)}}>Отменить</p>
        </Menu.Item>
      </Menu>
    );

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
          onSearch={value => this.searchpullcard(value)}
          style={{width:'90%', marginBottom:'10px', marginTop:'10px'}}
        />
        <Card  bodyStyle={{ overflowY: "auto" , height:'700px', padding: '5px', marginBottom:'5px'}} style={{width:'96%', margin:'0 2% 0 2%'}}>
          {
            universal.table.content && universal.table.content.map((item) => {
            return <Card
              style={pullStyle}
              className={'cardbtn'}
              bodyStyle={{textAlign:'left'}}
              key={item.id}
              onClick={(e)=>this.cardClick(e, item)}
            >
              <Meta
                title={"Номер: "+item.number+""}
                description={"Инициатор: "+item.users.userName}
              />
              <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)', marginTop:'5px'}}>
                {item.documentDate}
                <Dropdown  overlay={menu(item)}>
                 <Icon style={{marginLeft:'5px'}} type="down" />
                </Dropdown>
              </div>
            </Card>
          })
            }


        </Card>
        <Pagination simple onChange={(a)=>this.onShowSizeChange(a)} defaultCurrent={1} total={universal.table.content ? universal.table.content.length : 0} style={{margin:'10px'}} />
      </Row>
    );
  };
}
export default connect(({ universal, universal2, references, loading }) => ({
  universal,
  universal2,
  references,
  loadingData: loading.effects["universal2/getList"],
}))(PullFilter);



{/*<Card
            style={pullStyle}
            className={'cardbtn'}
            bodyStyle={{textAlign:'left'}}
            onClick={this.cardClick}
          >
            <Meta
              title="№8003, Одобренные."
              description="Количество возвратов: 302"
            />
            <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)'}}>06.01.2019</div>
          </Card>
          <Card
            bodyStyle={{textAlign:'left'}}
            className={'cardbtn'}
            style={{ width: "95%", margin: '16px auto 0 auto', borderRadius:'5px', backgroundColor:'rgb(181,46,53,0.2)' }}
            onClick={this.cardClick}>
            <Meta
              title="№8003, Одобренные."
              description="Количество возвратов: 302"
            />
            <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)'}}>06.01.2019</div>
          </Card>
          <Card
            bodyStyle={{textAlign:'left'}}
            className={'cardbtn'}
            style={{ width: "95%", margin: '16px auto 0 auto', backgroundColor:'rgb(60,181,68,0.2)', borderRadius:'5px' }}
            onClick={this.cardClick}
          >
            <Meta
              title="№8003, Одобренные."
              description="Количество возвратов: 302"
            />
            <div style={{float:'right', color:'rgba(0, 0, 0, 0.45)'}}>06.01.2019</div>
          </Card>*/}