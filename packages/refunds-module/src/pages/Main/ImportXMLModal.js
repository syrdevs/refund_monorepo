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
  Modal,
  Upload,
  Input,
  DatePicker,
  LocaleProvider,
  Select,
  Checkbox,
  Divider,
  Spin,
} from 'antd';
import formatMessage from '../../utils/formatMessage';
import ImportModalGrid from './ImportModalGrid';
import connect from '../../Redux';

class ImportXMLModal extends Component {
  state = {
    ImportModalGrid: {
      visible: true,
    },
  };

  componentWillUnmount = () => {

  };

  componentDidMount = () => {

  };

  render = () => {

    const { closeAction } = this.props;

    return (<div>
      {this.state.ImportModalGrid.visible && <ImportModalGrid
        closeAction={() => {
          this.setState({
            ImportModalGrid: {
              visible: false,
            },
          });

          closeAction();
        }}

        selectAction={(filters) => {
          this.setState({
            ImportModalGrid: {
              visible: false,
            },
          });
          console.log(filters);
          closeAction();
        }}
      />}
      {/*<Modal*/}
        {/*title="Импортировать выписку XML"*/}
        {/*visible={true}*/}
        {/*width={350}*/}
        {/*onCancel={() => closeAction()}*/}
        {/*onOk={() => {*/}
          {/*this.setState({*/}
            {/*ImportModalGrid: {*/}
              {/*visible: true,*/}
            {/*},*/}
          {/*});*/}
        {/*}}>*/}
        {/*<span>Выберите файл xml: </span>*/}

      {/*</Modal>*/}
    </div>);
  };
}
export default ImportXMLModal;