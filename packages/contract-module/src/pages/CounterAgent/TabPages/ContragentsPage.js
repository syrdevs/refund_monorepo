import React, { Component } from "react";
import formatMessage from "../../../utils/formatMessage";
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from "antd";
import SmartGridView from "../../../components/SmartGridView";
import ContragentsModal from "../Modals/ContragentsModal";
import connect from "../../../Redux";

class ContragentsPage extends Component {
  state = {
    isForm: false,
    ContragentsModal: {
      visible: false
    },

    columns: [{
      title: "Роль",
      dataIndex: "contractRole.name",
      isVisible: true
    }, {
      title: "БИН/ИИН",
      dataIndex: "bin",
      isVisible: true
    }, {
      title: "Контрагент",
      dataIndex: "organization.name",
      isVisible: true
    }, {
      title: "БИК",
      dataIndex: "bankAccount.bank.bikCode",
      isVisible: true
    }, {
      title: "Банк",
      dataIndex: "bankAccount.bank.name",
      isVisible: true
    }, {
      title: "Счет",
      dataIndex: "bankAccount.accountNumber",
      isVisible: true
    }],

    //   [
    //   {
    //     title: 'Код',
    //     dataIndex: 'code',
    //     isVisible: true,
    //   }, {
    //     title: 'Наименование/Имя',
    //     dataIndex: 'name',
    //     isVisible: true,
    //   }, {
    //     title: 'Идентификатор',
    //     dataIndex: 'idendifier.value',
    //     isVisible: true,
    //   }, {
    //     title: 'Адрес',
    //     dataIndex: 'address',
    //     isVisible: true,
    //   }, {
    //     title: 'Актуальные контакты',
    //     dataIndex: 'contact',
    //     isVisible: true,
    //   }, {
    //     title: 'Банковские реквизиты',
    //     dataIndex: 'bankAccount.bank',
    //     isVisible: true,
    //   }, {
    //     title: 'Ответственные лица',
    //     dataIndex: 'representative',
    //     isVisible: true,
    //   },
    // ],
    dataSource: this.props.selectedData ? [this.props.selectedData.data] : [],

    xsize: "auto",

    pagingConfig: {
      "start": 0,
      "length": 15,
      "src": {
        "searched": false,
        "data": {}
      }
    }
  };


  render = () => {
    let getObjectData = this.props.gridData.contractParties ? this.props.gridData.contractParties : [];


    /*
    *  <Button
        key={'select-record'}
        onClick={() => this.setState({ ContragentsModal: { visible: true } })}
      >
        Выбрать
      </Button>,
    * */

    const addonButtons = [
      <Button disabled={true} onClick={()=>{}}>Обновить</Button>,
      <Button disabled={true} onClick={()=>{}}>Выбрать</Button>,
      <Button disabled={true} onClick={()=>{}}>Указать другой счет</Button>,
    ];

    // if (this.state.dataSource.length > 0) {
    //   addonButtons.push(<Button
    //     onClick={() => {
    //       this.setState({ dataSource: [] });
    //     }}
    //     key={'clear-records'}>
    //     Очистить
    //   </Button>);
    // }



    return <Card style={{ marginLeft: "-10px" }} bodyStyle={{ padding: 5 }}>
      {this.state.ContragentsModal.visible &&
      <ContragentsModal
        onSelect={(selectedRows) => {

          this.setState({
            ContragentsModal: {
              visible: false
            },
            dataSource: selectedRows
          });
        }}
        hide={() => {
          this.setState({
            ContragentsModal: {
              ...this.state.ContragentsModal,
              visible: false
            }
          });
        }}/>}
      <SmartGridView
        hidePagination={true}
        name={"ContragentPageViewNew"}
        rowKey={"id"}
        showExportBtn={true}
        showTotal={true}
        hideFilterBtn={true}
        hideRefreshBtn={true}
        columns={this.state.columns}
        addonButtons={addonButtons}
        dataSource={{
          total: getObjectData.length,
          pageSize: this.state.pagingConfig.length,
          page: this.state.pagingConfig.start + 1,
          data: getObjectData
        }}
        actionExport={() => {
        }}
        onShowSizeChange={(pageNumber, pageSize) => {
          {/*<Button
                      disabled={hasRole(['ADMIN'])}
                      key='register_document'
                    >Зарегистрировать договор
                    </Button>,*/
          }
        }}
        onSelectCell={(cellIndex, cell) => {

        }}
        onSelectRow={() => {

        }}
        onFilter={(filters) => {

        }}
        onRefresh={() => {

        }}
        onSearch={() => {

        }}
      /></Card>;
  };
}

export default connect(({ universal, loading }) => ({
  universal
  // loadingData: loading.effects['universal/saveobject'],
}))(ContragentsPage);
