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
  LocaleProvider,
  Divider
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard, faColumns } from "@fortawesome/free-solid-svg-icons/index";
// import {Resizable} from 'react-resizable';
//import {formatMessage, FormattedMessage, getLocale} from 'umi/locale';
import componentLocal from "../../locales/components/componentLocal";
import formatMessage from "../../utils/formatMessage";
import "./index.css";

import ru_RU from "antd/lib/locale-provider/ru_RU";

function getPropByName(obj, desc) {
  var arr = desc.split(".");

  while (arr.length && obj) {
    var comp = arr.shift();
    var match = new RegExp("(.+)\\[([0-9]*)\\]").exec(comp);
    if ((match !== null) && (match.length == 3)) {
      var arrayData = { arrName: match[1], arrIndex: match[2] };
      if (obj[arrayData.arrName] != undefined) {
        obj = obj[arrayData.arrName][arrayData.arrIndex];
      } else {
        obj = undefined;
      }
    } else {
      obj = obj[comp];
    }
  }

  return obj;
}

const SmartColumnsSelect = props => {
  const menu = (
    <Menu>
      <Menu.Item>
        <div>{formatMessage({ id: "app.table.column.select" })}:</div>
      </Menu.Item>
      {props.value.map(function(column, index) {
        return (
          <Menu.Item key={index.toString()}>
            <Checkbox
              onChange={() => {
                props.onSelectColumn(column.dataIndex, column);
              }}
              checked={column.isVisible}>
              {column.title}
            </Checkbox>
          </Menu.Item>
        );
      }, this)}
    </Menu>
  );

  return (
    <Dropdown overlayStyle={{ overflowY: "scroll", border: "1px solid #cdcdcd", maxHeight: "400px" }}
              trigger={["click"]}
              onVisibleChange={(visible) => {
                props.dropDownAction(visible);
              }} visible={props.dropDownVisible} overlay={menu} placement="bottomRight">
      <Button style={{ float: "right" }}><Icon><FontAwesomeIcon icon={faColumns}/></Icon>
      </Button>
    </Dropdown>);
};

const SmartGridHeader = props => {

  let filterBtnShow = props.hideFilterBtn !== true;
  let refreshBtnShow = props.hideRefreshBtn !== true;

  return (<div>
    <Row>
      <Col sm={24} md={24} xs={24}>
        <div className={"headerButton"}>

          {filterBtnShow &&
          <Button type={"default"} disabled={props.searchButton} onClick={props.onSearch}><Icon type="search"
                                                                                                theme="outlined"/></Button>}

          {refreshBtnShow && <Button onClick={props.onRefresh}><FontAwesomeIcon icon={faSyncAlt}/></Button>}
          {props.addonButtons}

          <div className={"smart_grid_controls_right"}>

            {<SmartColumnsSelect {...props} searchButton={props.searchButton} onSelectColumn={props.onSelectColumn}
                                 value={props.columns}/>}
            {props.showExportBtn &&
            <Button onClick={() => props.actionExport()} style={{ float: "right" }}><Icon type="file-excel"/></Button>}

            {props.showTotal &&
            <div
              className={"total_label"}>{props.extraButtons !== undefined && props.extraButtons} {formatMessage({ id: "app.table.column.total" })}: {props.dataSource.total}</div>}

          </div>
        </div>

      </Col>
    </Row>
  </div>);
};

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

class BodyCell extends Component {
  render() {
    return <td  {...this.props}/>;
  }
}

class SmartGridView extends Component {
  constructor(props) {
    super(props);

    this.table = null;

    this.state = {
      dropDownVisible: false,
      selectedRow: null,
      isColumnChanged: false
    };
  }

  componentDidMount() {

  }

  onSelectColumn = (columnIndex, column) => {

    const { onColumnsChange } = this.props;
    let payment = this.props;

    let local_helper = this.StorageHelper();
    let StorageColumns = local_helper.get(this.props.name);

    StorageColumns.forEach(function(item) {
      if (column.actionColumn) {
        if (item.title === column.title) {
          item.isVisible = !item.isVisible;
        }
      } else {
        if (item.dataIndex === columnIndex) {
          item.isVisible = !item.isVisible;
        }
      }

    });

    local_helper.set(this.props.name, StorageColumns, true);

    this.setState({
      isColumnChanged: !this.state.isColumnChanged
    });

    if (onColumnsChange && !column.actionColumn)
      onColumnsChange(!this.state.isColumnChanged, columnIndex);

  };


  onSelectChange = (selectedRowKeys) => {
    this.props.onSelectCheckboxChange(selectedRowKeys);
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };

  clearSort = () => {

  };

  StorageHelper() {
    return {
      clear: function(name) {
        localStorage.setItem(name, null);
      },
      set: function(name, value, isReplace = true) {

        if (isReplace) {
          localStorage.setItem(name, typeof value === "string" ? value : JSON.stringify(value));
        } else {
          if (!localStorage.getItem(name)) {
            localStorage.setItem(name, typeof value === "string" ? value : JSON.stringify(value));
          }
        }

      },
      get: function(name) {
        let result = localStorage.getItem(name);

        if (result) {
          return JSON.parse(result);
        }

        return false;
      }
    };
  }

  getColumnsProperty = () => {
    let columns = this.props.columns;

    if (this.props.actionColumns) {
      this.props.actionColumns.forEach((actionColumn, idx) => {

        let columnIndex = columns.findIndex(x => x.title === actionColumn.title);

        if (columnIndex === -1) {

          console.log(actionColumn);

          let extraProps = {};

          if (actionColumn.dataIndex) {
            extraProps.dataIndex = actionColumn.dataIndex;
          }

          columns.push({
            key: actionColumn.key,
            className: actionColumn.className,
            actionColumn: true,
            title: actionColumn.title,
            order: actionColumn.order,
            sorted: actionColumn.sorted,
            //dataIndex: actionColumn.title,
            isVisible: actionColumn.isVisible,
            ...extraProps
          });
        }


      });
    }

    return columns;
  };

  render() {

    let local_helper = this.StorageHelper();
    let StorageColumns = local_helper.get(this.props.name);
    let _storeColumns = this.getColumnsProperty();

    if (_storeColumns && StorageColumns.length !== _storeColumns.length) {
      local_helper.set(this.props.name, _storeColumns, true);
    } else {
      local_helper.set(this.props.name, _storeColumns, StorageColumns.length === 0 && _storeColumns.length !== 0);
    }

    let _columns = local_helper.get(this.props.name);


    let tableOptions = {
      bordered: true,
      rowClassName: "smart_grid_view_container",
      size: "small",
      pagination: false,
      rowKey: this.props.rowKey || "id",
      columns: _columns.filter(column => column.isVisible),
      dataSource: this.props.dataSource.data,
      onChange: (pagination, filters, sorter) => {
        if (this.props.onSort)
          this.props.onSort(sorter);
      }
    };
    /* if (this.props.rowClassName){
       tableOptions.rowClassName = this.props.rowClassName;
     }*/


    if (this.props.fixedHeader) {
      // tableOptions.useFixedHeader = this.props.fixedHeader;
    }


    /* tableOptions.columns = tableOptions.columns.map((col, index) => ({
       ...col,
       onHeaderCell: column => ({
         width: column.width,
         onResize: this.handleResize(index),
       }),
     }));*/


    if (this.props.sorted) {

      tableOptions.columns.forEach((column) => {

        //column.width = 150;

        if (this.props.sortedInfo) {
          column.sortOrder = this.props.sortedInfo.columnKey === column.dataIndex && this.props.sortedInfo.order;
          column.sorter = column.hasOwnProperty("sorted") && column.sorted === false ? false : true;
        }

        //(a, b, sortOrder) => {
        //console.log(sortOrder);

        /*console.log(a);

        let _a = getPropByName(a, column.dataIndex);
        let _b = getPropByName(b, column.dataIndex);

        _a = _a ? _a : '';
        _b = _b ? _b : '';

        if (_a < _b) {
          return -1;
        }
        if (_a > _b) {
          return 1;
        }
        return 0;*/
        //};
      });
    }

    // to do order column with actionColumns
    if (this.props.actionColumns && this.props.actionColumns.length > 0) {
      tableOptions.columns.forEach((column) => {
        let actionColumn = this.props.actionColumns.find(x => x.title === column.title);

        if (actionColumn && actionColumn.onCell) {
          column.onCell = actionColumn.onCell;
        }

        if (actionColumn && actionColumn.render) {
          column.render = actionColumn.render;
        }
      });
      // tableOptions.columns.filter(x => x.isVisible).map((actcol) => {
      //   if (actcol.order != null) {
      //     tableOptions.columns.splice(actcol.order, 0, actcol);
      //   } else {
      //     tableOptions.columns.splice(1, 0, actcol);
      //   }
      // });
      //tableOptions.columns = this.props.actionColumns.filter(x => x.isVisible).concat(tableOptions.columns);
    }

    // let sortedColumns = tableOptions.columns;
    //
    // tableOptions.columns.filter(x => x.isVisible).forEach(column => {
    //   if (column.order != null) {
    //     sortedColumns.splice(column.order, 0, column);
    //   } else {
    //     sortedColumns.splice(1, 0, column);
    //   }
    // });
    //
    // tableOptions.columns = sortedColumns;

    let unOrderedIndexes = [];
    tableOptions.columns.filter(x => x.isVisible).forEach((column, idx) => {

      let uniqueSortIndexes = tableOptions.columns.filter(x => (x.order || x.order === 0)).map(x => x.order);

      if (unOrderedIndexes.length === 0)
        for (let i = 0; i <= tableOptions.columns.length; i++) {
          let findResultIdx = uniqueSortIndexes.findIndex(x => x === i);

          if (findResultIdx === -1) {
            unOrderedIndexes.push(i);
          }
        }

      if (!column.hasOwnProperty("order") && unOrderedIndexes.length > 0) {
        column.order = unOrderedIndexes[0];

        var index = unOrderedIndexes.indexOf(unOrderedIndexes[0]);
        if (index > -1) {
          unOrderedIndexes.splice(index, 1);
        }
      }
    });

    //todo

    tableOptions.columns = tableOptions.columns.sort((a, b) => {
      if (a.order < b.order)
        return -1;
      if (a.order > b.order)
        return 1;
      return 0;
    });


    if (this.props.rowSelection) {
      tableOptions.components = {
        /* header: {
           cell: ResizeableTitle,
         },*/
        body: {
          cell: BodyCell
        }
      };
    }

    if (this.props.selectedRowCheckBox) {
      tableOptions.rowSelection = {
        selectedRowKeys: this.props.selectedRowKeys,
        onChange: this.onSelectChange
      };
    }

    if (this.props.scroll) {
      tableOptions.scroll = {
        ...this.props.scroll
      };
    }
    if (!this.props.rowClassName) {
      tableOptions.rowClassName = (record, index) => {
        return this.state.selectedRow === index ? "active" : "";
      };
    } else {
      tableOptions.rowClassName = this.props.rowClassName;
    }


    tableOptions.onRow = (record, index) => ({
      onClick: () => {
        this.setState({
          selectedRow: index
        }, () => {
          if (this.props.onSelectRow)
            this.props.onSelectRow(record, index);
        });
      }
    });
    /*

     rowClassName={(record, index) => {
        return this.state.selectedRow === index ? 'active' : '';
      }}
    *  onRow={(record, index) => {
        return {
          onClick: () => {
            this.setState({
              selectedRow: index,
            });
          },
        };
      }}
    * */


    let paginationProp = {};


    // if (this.props.dataSource.page === 1) {
    //   paginationProp.defaultCurrent = 1;
    // } else {
    //
    // }
    paginationProp.current = this.props.dataSource.page;

    return (<div>
      <SmartGridHeader {...this.props}
                       searchButton={this.props.searchButton}
                       dropDownAction={(state) => {
                         this.setState({
                           dropDownVisible: state
                         });
                       }}
                       dropDownVisible={this.state.dropDownVisible}
                       onSelectColumn={this.onSelectColumn}
                       addonButtons={this.props.addonButtons}
                       columns={_columns}
                       onSearch={this.props.onSearch}/>
      <Table {...tableOptions}/>
      <br/>
      {!this.props.hidePagination &&
      <LocaleProvider locale={componentLocal}>
        <Pagination
          defaultPageSize={this.props.dataSource.pageSize}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          showSizeChanger
          pageSizeOptions={["15", "30", "40", "50", "100"]}
          onShowSizeChange={(page, pageSize) => {
            this.props.onShowSizeChange(page - 1, pageSize);
          }}
          onChange={(page, pageSize) => {
            this.props.onShowSizeChange(page - 1, pageSize);
          }}

          total={this.props.dataSource.total}
          {...paginationProp}
        />
      </LocaleProvider>}
    </div>);
  }

}

export default SmartGridView;