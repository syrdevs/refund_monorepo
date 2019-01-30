import React, { Component } from "react";
import { Modal, Input, Form, Icon, Button, Row, Select, Card } from "antd";
import formatMessage from "../../utils/formatMessage";
import connect from "../../Redux";
import request from "../../utils/request";

const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 14
  }
};


class SignModal extends Component {


  constructor(props) {
    super(props);
    this.state = {
      rw: null,
      xml: null,
      arrsignXML: [],
      infosignXML: {
        storageAlias: "",
        storagePath: "",
        alias: "",
        storagePassword: ""
      },
      callback: null,
      heartbeat_msg: "--heartbeat--",
      keytype: "SIGN",
      missed_heartbeats_limit_max: 50,
      missed_heartbeats_limit_min: 3,
      missed_heartbeats_limit: this.missed_heartbeats_limit_min,
      heartbeat_interval: null,
      missed_heartbeats: 0,
      webSocket: null,
      pagingConfig: {
        "start": 0,
        "length": 10,
        "src": {
          "searched": false,
          "data": {}
        },
        "sort": []
      },
      columns: [
        {
          dataIndex: "102",
          title: "МТ 102",
          width: 50,
          onCell: record => {
            return {
              onClick: () => {
                console.log(record);
              }
            };
          },
          render: () => (
            <Button key={"102"}>
              <Icon type="database" theme="outlined"/>
            </Button>
          )
        }, {
          dataIndex: "xml",
          title: "XML",
          width: 50,
          onCell: record => {
            return {
              onClick: () => {
                console.log(record);
              }
            };
          },
          render: () => (
            <Button key={"xml"}>
              <Icon type="database" theme="outlined"/>
            </Button>
          )
        }],
      showModal: true,
      keyList: ""


    };
  }


  componentDidMount() {

    const { dispatch } = this.props;
    this.loadXml();
    this.startLayer();

  }

  loadXml = () => {
    /* this.props.dispatch({
       type: 'universal/getXml',
       payload: {
         "entity": "contract",
         "id":  '25e78a7f-d4b0-4de4-a129-5b5954b35731'//this.props.location.query.id  // this.props.state.data.documentType.id
       },
     }).then(()=>{
       this.setState({
         xml: this.props.universal.getXml
       });
      console.log(this.props.universal.getXml)
     })*/

    request("/api/contract/documentAsXml?entity=" + this.props.type + "&id=" + this.props.id).then(data => {
      console.log(data);
      this.setState({
        xml:  data
      });

    });

    // fetch('/api/contract/documentAsXml?entity=contract&id=25e78a7f-d4b0-4de4-a129-5b5954b35731', {
    //   headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('token'),
    //   },
    //   method: 'get',
    // })
    //   .then(response => response.text())
    //   .then(data => {
    //     this.setState({
    //       xml: data
    //     })
    //   })

  };


  // var heartbeat_interval = null;
  // var missed_heartbeats = 0;

  setMissedHeartbeatsLimitToMax = () => {
    this.state.missed_heartbeats_limit = this.state.missed_heartbeats_limit_max;
  };

  setMissedHeartbeatsLimitToMin = () => {
    this.state.missed_heartbeats_limit = this.state.missed_heartbeats_limit_min;
  };


  startLayer = () => {
    console.log("test");
    this.state.webSocket = new WebSocket("wss://127.0.0.1:13579/");


    this.state.webSocket.onopen = (event) => {
      if (this.state.heartbeat_interval === null) {
        this.state.missed_heartbeats = 0;
        this.state.heartbeat_interval = setInterval(this.pingLayer, 2000);
      }
      console.log("Connection opened");
    };

    this.state.webSocket.onclose = (event) => {
      if (event.wasClean) {
        console.log("connection has been closed");
      } else {
        console.log("Connection error");
        var self = this;
        this.openDialog();
      }
    };

    this.state.webSocket.onmessage = (event) => {
      if (event.data === this.state.heartbeat_msg) {
        this.state.missed_heartbeats = 0;
        return;
      }

      let result = JSON.parse(event.data);

      this.state.rw = {
        result: result["result"],
        secondResult: result["secondResult"],
        errorCode: result["errorCode"],
        getResult: function() {
          return this.result;
        },
        getSecondResult: function() {
          return this.secondResult;
        },
        getErrorCode: function() {
          return this.errorCode;
        }
      };
      if (this.state.callback === "fNCAsetStoragePathBack") this.fNCAsetStoragePathBack(this.state.rw);
      if (this.state.callback === "fNCAgetKeyListBack") this.fNCAgetKeyListBack(this.state.rw);
      // if (this.state.callback==='fNCAgetKeyInfoBack') this.fNCAgetKeyInfoBack(this.state.rw);
      // if (this.state.callback==='getNotBeforeBack') this.getNotBeforeBack(this.state.rw);
      if (this.state.callback === "getNotAfterBack") this.getNotAfterBack(this.state.rw);
      if (this.state.callback === "fNCAsignXmlBack") this.fNCAsignXmlBack(this.state.rw);
      this.setMissedHeartbeatsLimitToMin();
    };
  };


  openDialog = () => {
    if (confirm("Ошибка при подключений к прослойке. Убедитесь что программа запущена и нажмите ОК") === true) {
      //location.reload();
      this.setState({
        showModal: false
      });
    }
  };


  stopLayer = () => {
    console.log("stopLayer");
    clearInterval(this.state.heartbeat_interval);
    //this.state.heartbeat_interval = null;
    this.setState({
      heartbeat_interval: null
    });
    this.state.webSocket.close();
    //this.state.webSocket = null;
    this.setState({
      webSocket: null
    }, () => {
      this.props.onCancel();
    });
  };

  pingLayer = () => {
    console.log("pinging...");
    try {
      this.state.missed_heartbeats++;
      if (this.state.missed_heartbeats >= this.state.missed_heartbeats_limit)
        throw new Error("Too many missed heartbeats.");
      this.state.webSocket.send(this.state.heartbeat_msg);
    } catch (e) {
      clearInterval(this.state.heartbeat_interval);
      this.setState({
        heartbeat_interval: null
      });
      //this.state.heartbeat_interval = null;
      console.warn("Closing connection. Reason: " + e.message);
      this.state.webSocket.close();
    }
  };

  browseKeyStore = (storageName, fileExtension, currentDirectory, callBack) => {
    let vbrowseKeyStore = {
      "method": "browseKeyStore",
      "args": [storageName, fileExtension, currentDirectory]
    };
    this.state.callback = callBack;
    //TODO: CHECK CONNECTION
    this.setMissedHeartbeatsLimitToMax();
    this.state.webSocket.send(JSON.stringify(vbrowseKeyStore));
  };


  getKeys = (storageName, storagePath, password, type, callBack) => {
    let vgetKeys = {
      "method": "getKeys",
      "args": [storageName, storagePath, password, type]
    };
    this.state.callback = callBack;
    this.setMissedHeartbeatsLimitToMax();
    this.state.webSocket.send(JSON.stringify(vgetKeys));
  };

  getNotAfter = (storageName, storagePath, alias, password, callBack) => {
    let vgetNotAfter = {
      "method": "getNotAfter",
      "args": [storageName, storagePath, alias, password]
    };
    this.state.callback = callBack;
    this.setMissedHeartbeatsLimitToMax();
    this.state.webSocket.send(JSON.stringify(vgetNotAfter));
  };

  getNotBefore = (storageName, storagePath, alias, password, callBack) => {
    var vgetNotBefore = {
      "method": "getNotBefore",
      "args": [storageName, storagePath, alias, password]
    };
    this.state.callback = callBack;
    this.setMissedHeartbeatsLimitToMax();
    this.state.webSocket.send(JSON.stringify(vgetNotBefore));
  };

  getSubjectDN = (storageName, storagePath, alias, password, callBack) => {
    let vgetSubjectDN = {
      "method": "getSubjectDN",
      "args": [storageName, storagePath, alias, password]
    };
    this.state.callback = callBack;
    this.setMissedHeartbeatsLimitToMax();
    this.state.webSocket.send(JSON.stringify(vgetSubjectDN));
  };


  signXml = (storageName, storagePath, alias, password, xmlToSign, callBack) => {
    let vsignXml = {
      "method": "signXml",
      "args": [storageName, storagePath, alias, password, xmlToSign]
    };
    console.log(vsignXml);
    this.state.callback = callBack;
    this.setMissedHeartbeatsLimitToMax();
    this.state.webSocket.send(JSON.stringify(vsignXml));
  };


  getHash = (data, digestAlgName, callBack) => {
    let vgetHash = {
      "method": "getHash",
      "args": [data, digestAlgName]
    };
    this.state.callback = callBack;
    this.state.setMissedHeartbeatsLimitToMax();
    webSocket.send(JSON.stringify(vgetHash));
  };


  fNCAsignXmlCall = () => {
    let storageAlias = "PKCS12";
    let storagePath = document.getElementById("storagePath").value;
    let storagePassword = document.getElementById("storagePassword").value;

    let alias = this.state.keylist;//document.getElementById("keyList").value;
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
      if (storagePassword !== null && storagePassword !== "") {
        if (alias !== null && alias !== "") {
          this.state.infosignXML.storageAlias = storageAlias;
          this.state.infosignXML.storagePath = storagePath;
          this.state.infosignXML.alias = alias;
          this.state.infosignXML.storagePassword = storagePassword;
          this.state.arrsignXML.push({ signed: false, xml: this.state.xml, signXML: "" },{ signed: false, xml: this.state.xml, signXML: "" });
          this.fNCAsignXmlRec();
        } else {
          alert("Вы не выбрали ключ!");
        }
      } else {
        alert("Введите пароль к хранилищу");
      }
    } else {
      alert("Не выбран хранилище!");
    }
  };

  fNCAsignXmlRec = () => {
    let foundsignXML = this.state.arrsignXML.find(function(item) {
      return (!item.signed && item.xml !== "");
    });

    if (foundsignXML !== undefined) {
      let data = foundsignXML.xml;
      this.signXml(this.state.infosignXML.storageAlias, this.state.infosignXML.storagePath, this.state.infosignXML.alias, this.state.infosignXML.storagePassword, data, "fNCAsignXmlBack");
    } else {
      this.state.infosignXML = { storageAlias: "", storagePath: "", alias: "", storagePassword: "" };

        console.log(this.state.arrsignXML);
        this.stopLayer();
        this.setState({
          showModal: false
        });
        this.props.getKey(this.state.arrsignXML);


    }
  };

  fNCAsignXmlBack = (result) => {
    console.log(result);
    if (result["errorCode"] === "NONE") {
      let signedXML = result["result"];
      let foundsignXML = this.state.arrsignXML.find(function(item) {
        return (!item.signed && item.xml !== "");
      });
      if (foundsignXML !== undefined) {
        foundsignXML.signXML = signedXML;
        foundsignXML.signed = true;
      }
      this.fNCAsignXmlRec();
    } else {
      if (result["errorCode"] === "WRONG_PASSWORD" && result["result"] > -1) {
        alert("Неправильный пароль! Количество оставшихся попыток: " + result["result"]);

      } else if (result["errorCode"] === "WRONG_PASSWORD") {
        alert("Неправильный пароль!");
      } else {
        alert(result["errorCode"]);
      }
    }
  };

  fNCAsetStoragePath = (e) => {
    console.log(e);
    let storageAlias = e;

    let storagePath = window.localStorage.getItem("storagePath");
    console.log(storagePath);
    // $('#storagePath').val();
    if (storageAlias !== "NONE") {
      this.browseKeyStore(storageAlias, "P12", storagePath, "fNCAsetStoragePathBack");
    } else {
      this.fNCArefreshVals();
    }
  };

  fNCAsetStoragePathBack = (rw) => {
    let storagePath = document.getElementById("storagePath").value;
    if (this.state.rw.getErrorCode() === "NONE") {
      storagePath = rw.getResult();
      if (storagePath !== undefined && storagePath !== null && storagePath !== "") {
        document.getElementById("storagePath").setAttribute("value", storagePath);
        window.localStorage.setItem("storagePath", storagePath);
        // document.getElementById("btnGetKeyList").setAttribute("disabled",false);

      } else {
        this.fNCArefreshVals();
      }
    } else {
      this.fNCArefreshVals();
    }
  };

  fNCAgetKeyList = () => {
    let storageAlias = "PKCS12";
    let storagePath = document.getElementById("storagePath").value;
    let storagePassword = document.getElementById("storagePassword").value;
    let keyType = this.state.keytype;
    if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
      if (storagePassword !== null && storagePassword !== "") {
        this.getKeys(storageAlias, storagePath, storagePassword, keyType, "fNCAgetKeyListBack");
      } else {
        alert("Введите пароль к хранилищу");
      }
    } else {
      alert("Не выбран хранилище!");
    }
  };

  fNCAgetKeyListBack = (result) => {
    // $('#keyList').html('');
    if (result["errorCode"] === "NONE") {
      let list = result["result"];
      let slotListArr = list.split("\n");
      for (let i = 0; i < slotListArr.length; i++) {
        if (slotListArr[i] === null || slotListArr[i] === "") {
          continue;
        }
        let str = slotListArr[i];
        let alias = str.split("|")[3];
        this.setState({
          keylist: alias
        });
        //document.getElementById("keyList").setAttribute("value",alias);


        this.fNCAsignXmlCall();
        // $('#keyList').append($('<option>', {
        //   value: alias,
        //   text: str
        // }));
      }
      // document.getElementById('storagePassword').prop('readonly', true);
      // $('#storagePassword').prop('readonly', true);
      // $('#btnGetKeyList').prop('disabled', true);
      // $('#messagetext').text('Выберите ключ!');
      // this.fNCAgetKeyInfo();
    } else {
      if (result["errorCode"] === "WRONG_PASSWORD" && result["result"] > -1) {
        alert("Неправильный пароль! Количество оставшихся попыток: " + result["result"]);
      } else if (result["errorCode"] === "WRONG_PASSWORD") {
        alert("Неправильный пароль!");
      } else if (result["errorCode"] === "EMPTY_KEY_LIST") {
        alert("Хранилище не содержить ключей для подписи!");
      } else {
        alert(result["errorCode"]);
      }
    }
  };

  fNCArefreshVals = () => {
    document.getElementById("storageAlias").setAttribute("value", "NONE");
    document.getElementById("storagePath").setAttribute("value", "");
    document.getElementById("storagePassword").setAttribute("value", "");
    // document.getElementById("keyList").setAttribute("value","");
    this.setState({
      keylist: ""
    });
  };


  render() {


    return (<Modal
      title="Подписать документ"
      visible={this.props.visible}
      onOk={() => {
        this.fNCAgetKeyList();
      }}
      onCancel={() => {
        this.stopLayer();
      }}
    >
      <Form layout="horizontal" hideRequiredMark>
        <Card style={{ borderRadius: "5px", marginBottom: "10px" }} bodyStyle={{ padding: 0 }} bordered={true}>
          <Row>
            <Form.Item {...formItemLayout} label="Тип хранилища ключа:">
              <Select id="storageAlias" onChange={(e) => this.fNCAsetStoragePath(e)}>
                <Option value="NONE">-- Выберите тип --</Option>
                <Option value="PKCS12">Ваш Компьютер</Option>
                <Option value="AKKaztokenStore">Казтокен</Option>
                <Option value="AKKZIDCardStore">Личное Удостоверение</Option>
              </Select>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Путь хранилища ключа:">
              <Input id="storagePath" type="text" readOnly/>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Пароль для хранилища:">
              <Input id="storagePassword" type="password"/>
            </Form.Item>
          </Row>
        </Card>
      </Form>
    </Modal>);
  }
}

export default connect(({ universal }) => ({
  universal
}))(SignModal);
