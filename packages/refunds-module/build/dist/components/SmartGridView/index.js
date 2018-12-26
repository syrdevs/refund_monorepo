"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _index = _interopRequireDefault(require("./index.less"));

var _componentLocal = _interopRequireDefault(require("../../locales/components/componentLocal"));

var _ru_RU = _interopRequireDefault(require("antd/lib/locale-provider/ru_RU"));

var _this = void 0,
    _jsxFileName = "C:\\refund_tatar\\packages\\refunds-module\\src\\components\\SmartGridView\\index.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function formatMessage(langItem) {
  return langItem.id;
}

function getPropByName(obj, desc) {
  var arr = desc.split('.');

  while (arr.length && obj) {
    var comp = arr.shift();
    var match = new RegExp('(.+)\\[([0-9]*)\\]').exec(comp);

    if (match !== null && match.length == 3) {
      var arrayData = {
        arrName: match[1],
        arrIndex: match[2]
      };

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

var SmartColumnsSelect = function SmartColumnsSelect(props) {
  var menu = _react.default.createElement(_antd.Menu, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, _react.default.createElement(_antd.Menu.Item, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  }, _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: this
  }, formatMessage({
    id: 'app.table.column.select'
  }), ":")), props.value.map(function (column, index) {
    return _react.default.createElement(_antd.Menu.Item, {
      key: index.toString(),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: this
    }, _react.default.createElement(_antd.Checkbox, {
      onChange: function onChange() {
        props.onSelectColumn(column.dataIndex);
      },
      checked: column.isVisible,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 70
      },
      __self: this
    }, column.title));
  }, _this));

  return _react.default.createElement(_antd.Dropdown, {
    trigger: ['click'],
    onVisibleChange: function onVisibleChange(visible) {
      props.dropDownAction(visible);
    },
    visible: props.dropDownVisible,
    overlay: menu,
    placement: "bottomRight",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }, _react.default.createElement(_antd.Button, {
    style: {
      float: 'right'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: this
  }, "s"));
};

var SmartGridHeader = function SmartGridHeader(props) {
  var filterBtnShow = props.hideFilterBtn !== true;
  var refreshBtnShow = props.hideRefreshBtn !== true;
  return _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: this
  }, _react.default.createElement(_antd.Row, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    },
    __self: this
  }, _react.default.createElement(_antd.Col, {
    sm: 24,
    md: 24,
    xs: 24,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99
    },
    __self: this
  }, _react.default.createElement("div", {
    className: _index.default.headerButton,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100
    },
    __self: this
  }, filterBtnShow && _react.default.createElement(_antd.Button, {
    type: 'default',
    disabled: props.searchButton,
    onClick: props.onSearch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103
    },
    __self: this
  }, _react.default.createElement(_antd.Icon, {
    type: "search",
    theme: "outlined",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103
    },
    __self: this
  })), props.addonButtons, _react.default.createElement("div", {
    className: _index.default.smart_grid_controls_right,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109
    },
    __self: this
  }, _react.default.createElement(SmartColumnsSelect, _extends({}, props, {
    searchButton: props.searchButton,
    onSelectColumn: props.onSelectColumn,
    value: props.columns,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111
    },
    __self: this
  })), props.showExportBtn && _react.default.createElement(_antd.Button, {
    onClick: function onClick() {
      return props.actionExport();
    },
    style: {
      float: 'right'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114
    },
    __self: this
  }, _react.default.createElement(_antd.Icon, {
    type: "file-excel",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114
    },
    __self: this
  })), props.showTotal && _react.default.createElement("div", {
    className: _index.default.total_label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117
    },
    __self: this
  }, props.extraButtons !== undefined && props.extraButtons, " ", formatMessage({
    id: 'app.table.column.total'
  }), ": ", props.dataSource.total))))));
};

var BodyCell =
/*#__PURE__*/
function (_Component) {
  _inherits(BodyCell, _Component);

  function BodyCell() {
    _classCallCheck(this, BodyCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(BodyCell).apply(this, arguments));
  }

  _createClass(BodyCell, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("td", _extends({}, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }));
    }
  }]);

  return BodyCell;
}(_react.Component);

var SmartGridView =
/*#__PURE__*/
function (_Component2) {
  _inherits(SmartGridView, _Component2);

  function SmartGridView(props) {
    var _this2;

    _classCallCheck(this, SmartGridView);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SmartGridView).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onSelectColumn", function (columnIndex) {
      var onColumnsChange = _this2.props.onColumnsChange;
      var payment = _this2.props;

      var local_helper = _this2.StorageHelper();

      var StorageColumns = local_helper.get(_this2.props.name);
      StorageColumns.forEach(function (item) {
        if (item.dataIndex === columnIndex) {
          item.isVisible = !item.isVisible;
        }
      });
      local_helper.set(_this2.props.name, StorageColumns, true);

      _this2.setState({
        isColumnChanged: !_this2.state.isColumnChanged
      });

      if (onColumnsChange) onColumnsChange(!_this2.state.isColumnChanged, columnIndex);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onSelectChange", function (selectedRowKeys) {
      _this2.props.onSelectCheckboxChange(selectedRowKeys);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "handleResize", function (index) {
      return function (e, _ref) {
        var size = _ref.size;

        _this2.setState(function (_ref2) {
          var columns = _ref2.columns;

          var nextColumns = _toConsumableArray(columns);

          nextColumns[index] = _objectSpread({}, nextColumns[index], {
            width: size.width
          });
          return {
            columns: nextColumns
          };
        });
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "clearSort", function () {});

    _this2.table = null;
    _this2.state = {
      dropDownVisible: false,
      selectedRow: null,
      isColumnChanged: false
    };
    return _this2;
  }

  _createClass(SmartGridView, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "StorageHelper",
    value: function StorageHelper() {
      return {
        clear: function clear(name) {
          localStorage.setItem(name, null);
        },
        set: function set(name, value) {
          var isReplace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

          if (isReplace) {
            localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
          } else {
            if (!localStorage.getItem(name)) {
              localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
            }
          }
        },
        get: function get(name) {
          var result = localStorage.getItem(name);

          if (result) {
            return JSON.parse(result);
          }

          return false;
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var local_helper = this.StorageHelper();
      var StorageColumns = local_helper.get(this.props.name);

      if (this.props.columns && StorageColumns.length !== this.props.columns.length) {
        local_helper.set(this.props.name, this.props.columns, true);
      } else {
        local_helper.set(this.props.name, this.props.columns, StorageColumns.length === 0 && this.props.columns.length !== 0);
      }

      var _columns = local_helper.get(this.props.name);

      var tableOptions = {
        bordered: true,
        rowClassName: _index.default.smart_grid_view_container,
        size: 'small',
        pagination: false,
        rowKey: this.props.rowKey || 'id',
        columns: _columns.filter(function (column) {
          return column.isVisible;
        }),
        dataSource: this.props.dataSource.data,
        onChange: function onChange(pagination, filters, sorter) {
          if (_this3.props.onSort) _this3.props.onSort(sorter);
        }
      };
      /* if (this.props.rowClassName){
         tableOptions.rowClassName = this.props.rowClassName;
       }*/

      if (this.props.fixedHeader) {} // tableOptions.useFixedHeader = this.props.fixedHeader;

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
          if (_this3.props.sortedInfo) {
            column.sortOrder = _this3.props.sortedInfo.columnKey === column.dataIndex && _this3.props.sortedInfo.order;
            column.sorter = true;
          } //(a, b, sortOrder) => {
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
      } // to do order column with actionColumns


      if (this.props.actionColumns && this.props.actionColumns.length > 0) {
        this.props.actionColumns.filter(function (x) {
          return x.isVisible;
        }).map(function (actcol) {
          if (actcol.order != null) {
            tableOptions.columns.splice(actcol.order, 0, actcol);
          } else {
            tableOptions.columns.splice(1, 0, actcol);
          }
        }); //tableOptions.columns = this.props.actionColumns.filter(x => x.isVisible).concat(tableOptions.columns);
      }

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
        tableOptions.scroll = _objectSpread({}, this.props.scroll);
      }

      if (!this.props.rowClassName) {
        tableOptions.rowClassName = function (record, index) {
          return _this3.state.selectedRow === index ? 'active' : '';
        };
      } else {
        tableOptions.rowClassName = this.props.rowClassName;
      }

      tableOptions.onRow = function (record, index) {
        return {
          onClick: function onClick() {
            _this3.setState({
              selectedRow: index
            }, function () {
              if (_this3.props.onSelectRow) _this3.props.onSelectRow(record, index);
            });
          }
        };
      };
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


      return _react.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 377
        },
        __self: this
      }, _react.default.createElement(SmartGridHeader, _extends({}, this.props, {
        searchButton: this.props.searchButton,
        dropDownAction: function dropDownAction(state) {
          _this3.setState({
            dropDownVisible: state
          });
        },
        dropDownVisible: this.state.dropDownVisible,
        onSelectColumn: this.onSelectColumn,
        addonButtons: this.props.addonButtons,
        columns: _columns,
        onSearch: this.props.onSearch,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 378
        },
        __self: this
      })), _react.default.createElement(_antd.Table, _extends({}, tableOptions, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 390
        },
        __self: this
      })), _react.default.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 391
        },
        __self: this
      }), !this.props.hidePagination && _react.default.createElement(_antd.LocaleProvider, {
        locale: _componentLocal.default,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 393
        },
        __self: this
      }, _react.default.createElement(_antd.Pagination, {
        defaultPageSize: this.props.dataSource.pageSize,
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        showSizeChanger: true,
        pageSizeOptions: ['15', '30', '40', '50', '100'],
        onShowSizeChange: function onShowSizeChange(page, pageSize) {
          _this3.props.onShowSizeChange(page - 1, pageSize);
        },
        onChange: function onChange(page, pageSize) {
          _this3.props.onShowSizeChange(page - 1, pageSize);
        },
        defaultCurrent: this.props.dataSource.page,
        total: this.props.dataSource.total,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 394
        },
        __self: this
      })));
    }
  }]);

  return SmartGridView;
}(_react.Component);

exports.default = SmartGridView;
//# sourceMappingURL=index.js.map