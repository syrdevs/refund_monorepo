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
import { Animated } from "react-animated-css";
import { Route } from "react-router-dom";
import Home from "../../pages/Home/Home";

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
        length: 15,
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
    console.log(this.props);
    return (
      <div>CounterAgent</div>
    );
  }
}

export default connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects["universal2/getList"]
}))(CounterAgent);
