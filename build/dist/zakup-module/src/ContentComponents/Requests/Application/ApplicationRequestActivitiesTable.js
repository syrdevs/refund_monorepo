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
import { Button, Icon, Select, Table } from 'antd';
import React from 'react';
var Option = Select.Option;
var ApplicationRequestActivitiesTable = /** @class */ (function (_super) {
    __extends(ApplicationRequestActivitiesTable, _super);
    function ApplicationRequestActivitiesTable(props) {
        var _this = _super.call(this, props) || this;
        _this.onAdd = function () {
            var activitiesAvailableToAdd = _this.props.allActivities.filter(function (i) {
                return _this.props.applicationItems.every(function (x) { return x.activity.id !== i.id; });
            });
            if (activitiesAvailableToAdd.length === 0) {
                return;
            }
            _this.setState({
                idInChange: _this.props.applicationItems.length,
                isNew: true,
            });
            _this.props.onApplicationItemsChange(__spread(_this.props.applicationItems, [
                { activity: __assign({}, activitiesAvailableToAdd[0]) },
            ]));
        };
        _this.onAcceptNew = function () {
            _this.setState({
                savedApplicationItemState: undefined,
                idInChange: undefined,
                isNew: false,
            });
        };
        _this.onCancel = function () {
            var newApplicationItems = _this.props.applicationItems;
            if (_this.state.isNew) {
                newApplicationItems = newApplicationItems.slice(0, newApplicationItems.length - 1);
            }
            else {
                newApplicationItems[_this.state.idInChange] = __assign({}, _this.state.savedApplicationItemState);
            }
            _this.setState({
                savedApplicationItemState: undefined,
                idInChange: undefined,
                isNew: false,
            });
            _this.props.onApplicationItemsChange(newApplicationItems);
        };
        _this.setEditing = function (idx, original) {
            _this.setState({
                savedApplicationItemState: __assign({}, original),
                idInChange: idx,
                isNew: false,
            });
        };
        _this.onDelete = function (id) {
            _this.setState({
                isNew: false,
            });
            _this.props.onApplicationItemsChange(_this.props.applicationItems.filter(function (i) { return i.activity.id !== id; }));
        };
        _this.getColumns = function () {
            var idInChange = _this.state.idInChange;
            var activitiesAvailableToAdd = _this.props.allActivities.filter(function (i) {
                return _this.props.applicationItems.every(function (x) { return x.activity.id !== i.id; }) ||
                    (typeof idInChange !== 'undefined' && _this.props.applicationItems[idInChange].activity.id === i.id);
            });
            return [
                {
                    title: 'Вид деятельности',
                    dataIndex: 'activity.name',
                    render: function (data, originalRow, index) {
                        if (index !== idInChange) {
                            return data;
                        }
                        return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                            React.createElement(Select, { value: _this.props.applicationItems[idInChange].activity.id, onChange: function (val) {
                                    var newApplicationItems = __spread(_this.props.applicationItems);
                                    var newActivity = _this.props.allActivities.find(function (i) { return i.id === val; });
                                    newApplicationItems[_this.state.idInChange] = __assign({}, newApplicationItems[_this.state.idInChange], { activity: {
                                            id: newActivity.id,
                                            name: newActivity.name,
                                        } });
                                    _this.props.onApplicationItemsChange(newApplicationItems);
                                } }, activitiesAvailableToAdd.map(function (option) {
                                return React.createElement(Option, { key: option.id }, option.name);
                            })),
                            React.createElement("div", { style: { display: 'flex', alignItems: 'center', marginLeft: '20px' } },
                                React.createElement(Icon, { style: { color: '#1890ff', cursor: 'pointer' }, type: "check", onClick: _this.onAcceptNew }),
                                React.createElement(Icon, { style: { color: '#1890ff', cursor: 'pointer', marginLeft: '5px' }, type: "close", onClick: _this.onCancel }))));
                    },
                },
                {
                    title: '',
                    width: '60px',
                    dataIndex: 'id',
                    align: 'center',
                    render: function (id, originalRow, index) {
                        if (typeof idInChange !== 'undefined') {
                            return null;
                        }
                        return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                            React.createElement(Icon, { style: { color: '#1890ff', cursor: 'pointer' }, type: "edit", onClick: function () { return _this.setEditing(index, originalRow); } }),
                            React.createElement(Icon, { style: { color: '#1890ff', marginLeft: '5px', cursor: 'pointer' }, type: "delete", onClick: function () { return _this.onDelete(originalRow.activity.id); } })));
                    },
                },
            ];
        };
        _this.state = {
            savedApplicationItemState: undefined,
            idInChange: undefined,
            isNew: false,
        };
        return _this;
    }
    ApplicationRequestActivitiesTable.prototype.render = function () {
        var _this = this;
        var isInChangeState = typeof this.state.idInChange !== 'undefined';
        return (React.createElement("div", null,
            React.createElement(Table, { columns: this.getColumns(), rowKey: function (r) { return r.activity.id.toString(); }, dataSource: this.props.applicationItems, pagination: false, footer: function () { return (React.createElement(Button, { htmlType: "button", type: "primary", onClick: _this.onAdd, disabled: isInChangeState }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C")); } })));
    };
    return ApplicationRequestActivitiesTable;
}(React.Component));
export default ApplicationRequestActivitiesTable;
//# sourceMappingURL=ApplicationRequestActivitiesTable.js.map