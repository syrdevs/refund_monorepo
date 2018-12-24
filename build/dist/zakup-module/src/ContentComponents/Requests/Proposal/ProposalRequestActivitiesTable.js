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
import ProposalRequestActivitiesTableSubRow from './ProposalRequestActivitiesTableSubRow';
var Option = Select.Option;
var ProposalRequestActivitiesTable = /** @class */ (function (_super) {
    __extends(ProposalRequestActivitiesTable, _super);
    function ProposalRequestActivitiesTable(props) {
        var _this = _super.call(this, props) || this;
        _this.handleExpandedRowsChange = function (rowKeys) {
            _this.setState({
                expandedRowKeys: rowKeys,
            });
        };
        _this.onProposalItemValueChange = function (activityId, measureUnitId, newValue) {
            var originalProposalItem = _this.props.proposalItems.find(function (i) { return i.activity.id === activityId; });
            var proposalItemIdx = _this.props.proposalItems.indexOf(originalProposalItem);
            var originalItemValue = originalProposalItem.proposalItemValues.find(function (i) { return i.measureUnit.id === measureUnitId; });
            var proposalItemValueIdx = originalProposalItem.proposalItemValues.indexOf(originalItemValue);
            var updatedProposalItemValues = __spread(originalProposalItem.proposalItemValues);
            updatedProposalItemValues[proposalItemValueIdx] = __assign({}, updatedProposalItemValues[proposalItemValueIdx], { value: newValue });
            var updatedProposalItems = __spread(_this.props.proposalItems);
            updatedProposalItems[proposalItemIdx] = __assign({}, updatedProposalItems[proposalItemIdx], { proposalItemValues: updatedProposalItemValues });
            _this.props.onProposalItemValueChange(updatedProposalItems);
        };
        _this.onAdd = function () {
            var activitiesAvailableToAdd = _this.props.allActivities.filter(function (i) {
                return _this.props.proposalItems.every(function (x) { return x.activity.id !== i.id; });
            });
            if (activitiesAvailableToAdd.length === 0) {
                return;
            }
            var newProposalItem = {
                activity: __assign({}, activitiesAvailableToAdd[0]),
                proposalItemValues: activitiesAvailableToAdd[0].activityMeasureUnits.map(function (m) { return ({
                    measureUnit: m,
                    value: 0,
                }); }),
            };
            _this.setState({
                idInChange: _this.props.proposalItems.length,
                isNew: true,
            });
            _this.props.onProposalItemValueChange(__spread(_this.props.proposalItems, [newProposalItem]));
        };
        _this.onAcceptNew = function () {
            _this.setState({
                savedProposalItemActivityState: undefined,
                savedProposalItemValuesState: undefined,
                idInChange: undefined,
                isNew: false,
            });
        };
        _this.onCancel = function () {
            var newProposalItems = _this.props.proposalItems;
            if (_this.state.isNew) {
                newProposalItems = newProposalItems.slice(0, newProposalItems.length - 1);
            }
            else {
                newProposalItems[_this.state.idInChange] = __assign({}, newProposalItems[_this.state.idInChange], { activity: __assign({}, _this.state.savedProposalItemActivityState), proposalItemValues: __spread(_this.state.savedProposalItemValuesState) });
            }
            _this.setState({
                idInChange: undefined,
                isNew: false,
            });
            _this.props.onProposalItemValueChange(newProposalItems);
        };
        _this.setEditing = function (idx, originalActivity, itemValues) {
            _this.setState({
                savedProposalItemActivityState: originalActivity,
                savedProposalItemValuesState: __spread(itemValues).map(function (i) { return (__assign({}, i)); }),
                idInChange: idx,
                isNew: false,
            });
        };
        _this.onDelete = function (id) {
            _this.setState({
                isNew: false,
            });
            _this.props.onProposalItemValueChange(_this.props.proposalItems.filter(function (i) { return i.activity.id !== id; }));
        };
        _this.getColumns = function () {
            var _a = _this.state, idInChange = _a.idInChange, expandedRowKeys = _a.expandedRowKeys;
            var activitiesAvailableToAdd = _this.props.allActivities.filter(function (i) {
                return _this.props.proposalItems.every(function (x) { return x.activity.id !== i.id; }) ||
                    (typeof idInChange !== 'undefined' && _this.props.proposalItems[idInChange].activity.id === i.id);
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
                            React.createElement(Select, { value: _this.props.proposalItems[idInChange].activity.id, onChange: function (val) {
                                    var newProposalItems = __spread(_this.props.proposalItems);
                                    var newActivity = _this.props.allActivities.find(function (i) { return i.id === val; });
                                    newProposalItems[_this.state.idInChange] = __assign({}, newProposalItems[_this.state.idInChange], { activity: __assign({}, newActivity), proposalItemValues: newActivity.activityMeasureUnits.map(function (m) { return ({
                                            measureUnit: m,
                                            value: 0,
                                        }); }) });
                                    _this.props.onProposalItemValueChange(newProposalItems);
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
                        var isExpanded = expandedRowKeys.indexOf(originalRow.activity.id);
                        if (isExpanded) {
                            return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                                React.createElement(Icon, { style: { color: '#1890ff', cursor: 'pointer' }, type: "edit", onClick: function () { return _this.setEditing(index, originalRow.activity, originalRow.proposalItemValues); } }),
                                React.createElement(Icon, { style: { color: '#1890ff', marginLeft: '5px', cursor: 'pointer' }, type: "delete", onClick: function () { return _this.onDelete(originalRow.activity.id); } })));
                        }
                        return null;
                    },
                },
            ];
        };
        _this.state = {
            expandedRowKeys: [],
            savedProposalItemActivityState: undefined,
            savedProposalItemValuesState: undefined,
            idInChange: undefined,
            isNew: false,
        };
        return _this;
    }
    ProposalRequestActivitiesTable.prototype.render = function () {
        var _this = this;
        var isInChangeState = typeof this.state.idInChange !== 'undefined';
        var expandedObj = {};
        if (this.props.proposalItems.length) {
            expandedObj['expandedRowRender'] = function (r) {
                return (React.createElement(ProposalRequestActivitiesTableSubRow, { onProposalItemValueChange: _this.onProposalItemValueChange, proposalItem: r }));
            };
        }
        return (React.createElement("div", null,
            React.createElement(Table, __assign({ size: "small", indentSize: 4, showHeader: false, title: function () { return 'Виды деятельности'; }, columns: this.getColumns(), rowKey: function (r) { return r.activity.id.toString(); }, dataSource: this.props.proposalItems, pagination: false }, expandedObj, { onExpandedRowsChange: this.handleExpandedRowsChange, footer: function () { return (React.createElement(Button, { htmlType: "button", type: "primary", onClick: _this.onAdd, disabled: isInChangeState }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C")); } }))));
    };
    return ProposalRequestActivitiesTable;
}(React.Component));
export default ProposalRequestActivitiesTable;
//# sourceMappingURL=ProposalRequestActivitiesTable.js.map