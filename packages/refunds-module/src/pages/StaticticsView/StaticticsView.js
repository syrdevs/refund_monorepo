import React, {Component} from 'react';
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
  Select,
  Checkbox,
  Divider,
  Spin, Tooltip,
} from 'antd';




export default class StaticticsView extends Component {

  state = {

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

    pagingConfig: {
      'start': 0,
      'length': 15,
      'src': {
        'searched': false,
        'data': {},
      },
    },
  };

  componentWillUnmount() {
    /*const { dispatch } = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {},
    });*/
  }


  render() {
    return (
      <div>
        StaticView page
      </div>);
  }

}
