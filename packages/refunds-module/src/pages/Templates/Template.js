import React, { Component } from 'react';
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
  notification,
  Select,
  Checkbox,
  Divider,
  Upload,
} from 'antd';

import formatMessage from "../../utils/formatMessage";




export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      dataSource: [],
      staticData:[{
        "id": "D532F7EDEE6C4B78A37913653C78854D",
        "descriptionRu": "Письмо об отказе",
        "descriptionKz": "Письмо об отказе",
        "ord": 1,
        "fileExt": "docx"
      }],
      staticColumn:[
        {
          "title": "№",
          "dataIndex": "ord"
        },{
          "title": "Описание шаблона",
          "dataIndex": "descriptionRu"
        }
      ]
    };
  }

  downloadFile = async (param) => {
    var link = document.createElement('a');
    link.href = 'https://www.7-zip.org/a/7z1805.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  componentDidMount() {

    /*const { dispatch } = this.props;
    dispatch({
      type: 'universal2/columns',
      payload: {
        table: 'templates',
      },
    });
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'templates',
      },
    });*/

    this.setState({
      columns: [{
        title: 'Шаблон',
        width: 50,
        onCell: record => {
          return {
            onClick: () => {
              this.downloadFile();
            },
          };
        },
        render: () => (
          <Button key={'download'}>
            {formatMessage({ id: 'menu.refunds.templates_view.upload' })}
          </Button>
        ),
      }, {
        title: 'Загрузка шаблона',
        width: 50,
        /*onCell: record => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        },*/
        render: () => (
          <Upload key={'uploadForm'} onChange={(info) => {
            if (info.file.status === 'done') {
              notification.open({
                message: formatMessage({ id: 'system.information' }),
                description: formatMessage({ id: 'system.download.completed' }),
                icon: <Icon type="check" style={{ color: 'green' }}/>,
              });
            }
          }} showUploadList={false} size={'small'} name="upload" action="#">
            <Button key={'upload'}>
              {formatMessage({ id: 'menu.refunds.templates_view.download' })}
            </Button>
          </Upload>
        ),
      }],
    });
  }

  render() {
    /*const { dataStore, columns } = this.props.universal2;*/
    const dataStore = this.state.staticData;
    const columns  = this.state.staticColumn;

    return (
        <Card bordered={false} bodyStyle={{ padding: 5 }}>
          <Table size={'small'} bordered={true} rowKey={'id'}
                 columns={columns.length > 0 ? columns.concat(this.state.columns) : []}
                 dataSource={dataStore}/>
        </Card>
    );
  }
}
