import React, { Component } from "react";
import {
  Card,
  Tabs,
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
  Spin,
  Divider
} from "antd";
import GridFilter from "../../../components/GridFilter";
import SmartGridView from "../../../components/SmartGridView";
import connect from "../../../Redux";

class ProductionBasePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          title: "Адрес",
          dataIndex: "location.address.addressText",
          isVisible: true
        }, {
          title: "Дата начала",
          dataIndex: "location.dateBegin",
          isVisible: true
        }, {
          title: "Дата окончания",
          dataIndex: "location.dateEnd",
          isVisible: true
        }, {
          title: "Вид адреса",
          dataIndex: "location.address.addressType.nameRu",
          isVisible: true
        }
      ],
      dataSources: []
    };
  }


  render = () => {


    const dataSource = this.props.dataSource.contractLocations ? this.props.dataSource.contractLocations : [];

    return (<Card style={{ marginLeft: "-10px" }} bodyStyle={{ padding: 5 }}>
      <SmartGridView
        hidePagination={true}
        name={"ProductionBasePage"}
        rowKey={"id"}
        showExportBtn={true}
        showTotal={true}
        hideFilterBtn={true}
        hideRefreshBtn={true}
        columns={this.state.columns}
        addonButtons={[]}
        dataSource={{
          data: dataSource,
          pageSize: dataSource.length,
          page: 1,
          total: dataSource.length
        }}
        actionExport={() => {
        }}
        onShowSizeChange={(pageNumber, pageSize) => {

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
      /></Card>);
  };

}

export default ProductionBasePage;