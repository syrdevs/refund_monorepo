var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
import React, { Component } from 'react';
import { Table, Icon, Menu, Dropdown, Button, Pagination, Row, Col, Checkbox, LocaleProvider, } from 'antd';
import styles from './index.less';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';
// import {faCreditCard, faColumns} from '@fortawesome/free-solid-svg-icons/index';
// import {Resizable} from 'react-resizable';
//import {formatMessage, FormattedMessage, getLocale} from 'umi/locale';
import componentLocal from '../../locales/components/componentLocal';
function formatMessage(langItem) {
    return langItem.id;
}
function getPropByName(obj, desc) {
    var arr = desc.split('.');
    while (arr.length && obj) {
        var comp = arr.shift();
        var match = new RegExp('(.+)\\[([0-9]*)\\]').exec(comp);
        if ((match !== null) && (match.length == 3)) {
            var arrayData = { arrName: match[1], arrIndex: match[2] };
            if (obj[arrayData.arrName] != undefined) {
                obj = obj[arrayData.arrName][arrayData.arrIndex];
            }
            else {
                obj = undefined;
            }
        }
        else {
            obj = obj[comp];
        }
    }
    return obj;
}
var SmartColumnsSelect = function (props) {
    var menu = (React.createElement(Menu, null,
        React.createElement(Menu.Item, null,
            React.createElement("div", null,
                formatMessage({ id: 'app.table.column.select' }),
                ":")),
        props.value.map(function (column, index) {
            return (React.createElement(Menu.Item, { key: index.toString() },
                React.createElement(Checkbox, { onChange: function () {
                        props.onSelectColumn(column.dataIndex);
                    }, checked: column.isVisible }, column.title)));
        }, _this)));
    return (React.createElement(Dropdown, { trigger: ['click'], onVisibleChange: function (visible) {
            props.dropDownAction(visible);
        }, visible: props.dropDownVisible, overlay: menu, placement: "bottomRight" },
        React.createElement(Button, { style: { float: 'right' } }, "s")));
};
var SmartGridHeader = function (props) {
    var filterBtnShow = props.hideFilterBtn !== true;
    var refreshBtnShow = props.hideRefreshBtn !== true;
    return (React.createElement("div", null,
        React.createElement(Row, null,
            React.createElement(Col, { sm: 24, md: 24, xs: 24 },
                React.createElement("div", { className: styles.headerButton },
                    filterBtnShow &&
                        React.createElement(Button, { type: 'default', disabled: props.searchButton, onClick: props.onSearch },
                            React.createElement(Icon, { type: "search", theme: "outlined" })),
                    refreshBtnShow && React.createElement(Button, { onClick: props.onRefresh },
                        React.createElement(FontAwesomeIcon, { icon: faSyncAlt })),
                    props.addonButtons,
                    React.createElement("div", { className: styles.smart_grid_controls_right },
                        React.createElement(SmartColumnsSelect, __assign({}, props, { searchButton: props.searchButton, onSelectColumn: props.onSelectColumn, value: props.columns })),
                        props.showExportBtn &&
                            React.createElement(Button, { onClick: function () { return props.actionExport(); }, style: { float: 'right' } },
                                React.createElement(Icon, { type: "file-excel" })),
                        props.showTotal &&
                            React.createElement("div", { className: styles.total_label },
                                props.extraButtons !== undefined && props.extraButtons,
                                " ",
                                formatMessage({ id: 'app.table.column.total' }),
                                ": ",
                                props.dataSource.total)))))));
};
var BodyCell = /** @class */ (function (_super) {
    __extends(BodyCell, _super);
    function BodyCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BodyCell.prototype.render = function () {
        return React.createElement("td", __assign({}, this.props));
    };
    return BodyCell;
}(Component));
var SmartGridView = /** @class */ (function (_super) {
    __extends(SmartGridView, _super);
    function SmartGridView(props) {
        var _this = _super.call(this, props) || this;
        _this.onSelectColumn = function (columnIndex) {
            var onColumnsChange = _this.props.onColumnsChange;
            var payment = _this.props;
            var local_helper = _this.StorageHelper();
            var StorageColumns = local_helper.get(_this.props.name);
            StorageColumns.forEach(function (item) {
                if (item.dataIndex === columnIndex) {
                    item.isVisible = !item.isVisible;
                }
            });
            local_helper.set(_this.props.name, StorageColumns, true);
            _this.setState({
                isColumnChanged: !_this.state.isColumnChanged,
            });
            if (onColumnsChange)
                onColumnsChange(!_this.state.isColumnChanged, columnIndex);
        };
        _this.onSelectChange = function (selectedRowKeys) {
            _this.props.onSelectCheckboxChange(selectedRowKeys);
        };
        _this.handleResize = function (index) { return function (e, _a) {
            var size = _a.size;
            _this.setState(function (_a) {
                var columns = _a.columns;
                var nextColumns = __spread(columns);
                nextColumns[index] = __assign({}, nextColumns[index], { width: size.width });
                return { columns: nextColumns };
            });
        }; };
        _this.clearSort = function () {
        };
        _this.table = null;
        _this.state = {
            dropDownVisible: false,
            selectedRow: null,
            isColumnChanged: false,
        };
        return _this;
    }
    SmartGridView.prototype.componentDidMount = function () {
    };
    SmartGridView.prototype.StorageHelper = function () {
        return {
            clear: function (name) {
                localStorage.setItem(name, null);
            },
            set: function (name, value, isReplace) {
                if (isReplace === void 0) { isReplace = true; }
                if (isReplace) {
                    localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
                }
                else {
                    if (!localStorage.getItem(name)) {
                        localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
                    }
                }
            },
            get: function (name) {
                var result = localStorage.getItem(name);
                if (result) {
                    return JSON.parse(result);
                }
                return false;
            },
        };
    };
    SmartGridView.prototype.render = function () {
        var _this = this;
        var local_helper = this.StorageHelper();
        var StorageColumns = local_helper.get(this.props.name);
        if (this.props.columns && StorageColumns.length !== this.props.columns.length) {
            local_helper.set(this.props.name, this.props.columns, true);
        }
        else {
            local_helper.set(this.props.name, this.props.columns, StorageColumns.length === 0 && this.props.columns.length !== 0);
        }
        var _columns = local_helper.get(this.props.name);
        var tableOptions = {
            bordered: true,
            rowClassName: styles.smart_grid_view_container,
            size: 'small',
            pagination: false,
            rowKey: this.props.rowKey || 'id',
            columns: _columns.filter(function (column) { return column.isVisible; }),
            dataSource: this.props.dataSource.data,
            onChange: function (pagination, filters, sorter) {
                if (_this.props.onSort)
                    _this.props.onSort(sorter);
            },
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
            tableOptions.columns.forEach(function (column) {
                //column.width = 150;
                if (_this.props.sortedInfo) {
                    column.sortOrder = _this.props.sortedInfo.columnKey === column.dataIndex && _this.props.sortedInfo.order;
                    column.sorter = true;
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
            this.props.actionColumns.filter(function (x) { return x.isVisible; }).map(function (actcol) {
                if (actcol.order != null) {
                    tableOptions.columns.splice(actcol.order, 0, actcol);
                }
                else {
                    tableOptions.columns.splice(1, 0, actcol);
                }
            });
            //tableOptions.columns = this.props.actionColumns.filter(x => x.isVisible).concat(tableOptions.columns);
        }
        if (this.props.rowSelection) {
            tableOptions.components = {
                /* header: {
                   cell: ResizeableTitle,
                 },*/
                body: {
                    cell: BodyCell,
                },
            };
        }
        if (this.props.selectedRowCheckBox) {
            tableOptions.rowSelection = {
                selectedRowKeys: this.props.selectedRowKeys,
                onChange: this.onSelectChange,
            };
        }
        if (this.props.scroll) {
            tableOptions.scroll = __assign({}, this.props.scroll);
        }
        if (!this.props.rowClassName) {
            tableOptions.rowClassName = function (record, index) {
                return _this.state.selectedRow === index ? 'active' : '';
            };
        }
        else {
            tableOptions.rowClassName = this.props.rowClassName;
        }
        tableOptions.onRow = function (record, index) { return ({
            onClick: function () {
                _this.setState({
                    selectedRow: index,
                }, function () {
                    if (_this.props.onSelectRow)
                        _this.props.onSelectRow(record, index);
                });
            },
        }); };
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
        return (React.createElement("div", null,
            React.createElement(SmartGridHeader, __assign({}, this.props, { searchButton: this.props.searchButton, dropDownAction: function (state) {
                    _this.setState({
                        dropDownVisible: state,
                    });
                }, dropDownVisible: this.state.dropDownVisible, onSelectColumn: this.onSelectColumn, addonButtons: this.props.addonButtons, columns: _columns, onSearch: this.props.onSearch })),
            React.createElement(Table, __assign({}, tableOptions)),
            React.createElement("br", null),
            !this.props.hidePagination &&
                React.createElement(LocaleProvider, { locale: componentLocal },
                    React.createElement(Pagination, { defaultPageSize: this.props.dataSource.pageSize, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, showSizeChanger: true, pageSizeOptions: ['15', '30', '40', '50', '100'], onShowSizeChange: function (page, pageSize) {
                            _this.props.onShowSizeChange(page - 1, pageSize);
                        }, onChange: function (page, pageSize) {
                            _this.props.onShowSizeChange(page - 1, pageSize);
                        }, defaultCurrent: this.props.dataSource.page, total: this.props.dataSource.total }))));
    };
    return SmartGridView;
}(Component));
export default SmartGridView;
//# sourceMappingURL=index.js.map