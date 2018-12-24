"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var styled_components_1 = __importDefault(require("styled-components"));
var YesNoModalInfo_1 = __importDefault(require("../../Components/Modals/YesNoModalInfo"));
var businessDataStateActions_1 = require("../../Redux/Actions/businessDataStateActions");
var infrastructureStateActions_1 = require("../../Redux/Actions/infrastructureStateActions");
var utils_1 = require("../../utils");
var ProtocolActivitiesTableSubRow_1 = __importDefault(require("./ProtocolActivitiesTableSubRow"));
var ProtocolItemsTable = styled_components_1.default(antd_1.Table)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .ant-table td {\n    white-space: nowrap;\n  }\n"], ["\n  .ant-table td {\n    white-space: nowrap;\n  }\n"])));
var ProtocolActivitiesTable = /** @class */ (function (_super) {
    __extends(ProtocolActivitiesTable, _super);
    function ProtocolActivitiesTable(props) {
        var _this = _super.call(this, props) || this;
        _this.fetchProtocolActivityGroupInfos = function (id) {
            utils_1.createApiClient()
                .fetchProtocolActivityGroupInfos(id)
                .then(function (resp) {
                var protocolActivityGroupInfos = resp.data.content.map(function (i) { return ({
                    measureUnitValues: [],
                    initialCellValues: [],
                    activity: __assign({}, i.activity),
                }); });
                _this.setState({
                    protocolActivityGroupInfos: protocolActivityGroupInfos,
                }, function () {
                    protocolActivityGroupInfos.forEach(function (i) {
                        _this.fetchProtocolActivityMeasureUnits(id, i.activity.id);
                    });
                });
            })
                .catch(function (error) { return antd_1.message.error(error.message); });
        };
        _this.fetchProtocolActivityMeasureUnits = function (id, activityId) {
            utils_1.createApiClient()
                .fetchProtocolActivityMeasureUnits(id, activityId)
                .then(function (resp) {
                _this.setState(function (state) {
                    var clonedGroups = __spread(state.protocolActivityGroupInfos);
                    var idx = clonedGroups.findIndex(function (i) { return i.activity.id === activityId; });
                    clonedGroups[idx] = __assign({}, clonedGroups[idx], { measureUnitValues: resp.data.content.map(function (k) { return (__assign({}, k, { value: k.value || 0, planItemValue: k.planItemValue || 0, initialValue: k.value || 0 })); }) });
                    return {
                        protocolActivityGroupInfos: clonedGroups,
                        fetched: clonedGroups.filter(function (i) { return i.measureUnitValues.length > 0; }).length ===
                            state.protocolActivityGroupInfos.length,
                    };
                });
            })
                .catch(function (error) { return antd_1.message.error(error.message); });
        };
        _this.handleExpandedRowsChange = function (rowKeys) {
            _this.setState({
                expandedRowKeys: rowKeys,
            });
        };
        _this.onProtocolItemValueChange = function (activityId, clinicId, measureUnitId, value) {
            var _a = _this.state, protocolItemsByActivity = _a.protocolItemsByActivity, protocolActivityGroupInfos = _a.protocolActivityGroupInfos;
            var updatedProtocolItemsByActivity = __spread(protocolItemsByActivity);
            var protocolItemsIdx = updatedProtocolItemsByActivity.findIndex(function (i) { return i.activityId === activityId; });
            var updatedProtocolItems = __spread(updatedProtocolItemsByActivity[protocolItemsIdx].protocolItemsInfo.items);
            var protocolItemIdx = updatedProtocolItems.findIndex(function (i) { return i.clinic.id === clinicId; });
            var updatedPlanProtocolItemValues = __spread(updatedProtocolItems[protocolItemIdx].planProtocolItemValues);
            var protocolItemValuesIdx = updatedPlanProtocolItemValues.findIndex(function (i) { return i.measureUnit.id === measureUnitId; });
            var valueDelta = value - updatedPlanProtocolItemValues[protocolItemValuesIdx].value;
            updatedPlanProtocolItemValues[protocolItemValuesIdx] = __assign({}, updatedPlanProtocolItemValues[protocolItemValuesIdx], { value: value });
            updatedProtocolItems[protocolItemIdx] = __assign({}, updatedProtocolItems[protocolItemIdx], { planProtocolItemValues: updatedPlanProtocolItemValues });
            updatedProtocolItemsByActivity[protocolItemsIdx] = __assign({}, updatedProtocolItemsByActivity[protocolItemsIdx], { protocolItemsInfo: __assign({}, updatedProtocolItemsByActivity[protocolItemsIdx].protocolItemsInfo, { items: updatedProtocolItems }) });
            var updatedProtocolActivityGroupInfos = __spread(protocolActivityGroupInfos);
            var procotolActivityGroupIdx = updatedProtocolActivityGroupInfos.findIndex(function (i) { return i.activity.id === activityId; });
            var updatedInitialCellValues = __spread(updatedProtocolActivityGroupInfos[procotolActivityGroupIdx].initialCellValues);
            var initialValue = updatedInitialCellValues.find(function (i) { return i.clinicId === clinicId && i.measureUnitId === measureUnitId; });
            initialValue.dirty = value !== initialValue.value;
            var updatedMeasureUnitValues = __spread(updatedProtocolActivityGroupInfos[procotolActivityGroupIdx].measureUnitValues);
            var idx = updatedMeasureUnitValues.findIndex(function (i) { return i.measureUnit.id === measureUnitId; });
            updatedMeasureUnitValues[idx] = __assign({}, updatedMeasureUnitValues[idx], { value: updatedMeasureUnitValues[idx].value + valueDelta });
            updatedProtocolActivityGroupInfos[procotolActivityGroupIdx] = __assign({}, updatedProtocolActivityGroupInfos[procotolActivityGroupIdx], { initialCellValues: updatedInitialCellValues, measureUnitValues: updatedMeasureUnitValues });
            _this.setState({
                protocolItemsByActivity: updatedProtocolItemsByActivity,
                protocolActivityGroupInfos: updatedProtocolActivityGroupInfos,
            });
        };
        _this.onGroupExpanding = function (activityId) {
            var protocolItemsByActivity = _this.state.protocolItemsByActivity;
            var protocolItemInfo = protocolItemsByActivity.find(function (i) { return i.activityId === activityId; });
            if (protocolItemInfo) {
                return;
            }
            var defaultPage = 1;
            var defaultPageSize = 10;
            _this.fetchProtocolItems(activityId, defaultPage - 1, defaultPageSize).then(function (resp) {
                var updatedProtocolItemsByActivity = __spread(_this.state.protocolItemsByActivity, [
                    {
                        activityId: activityId,
                        protocolItemsInfo: {
                            page: defaultPage,
                            pageSize: defaultPageSize,
                            totalElements: resp.totalElements,
                            items: resp.content,
                        },
                    },
                ]);
                _this.setState({
                    protocolItemsByActivity: updatedProtocolItemsByActivity,
                    protocolActivityGroupInfos: _this.setInitialCellValues(activityId, resp.content),
                });
            });
        };
        _this.setInitialCellValues = function (activityId, protocolItems) {
            var protocolActivityGroupInfos = _this.state.protocolActivityGroupInfos;
            var idx = protocolActivityGroupInfos.findIndex(function (i) { return i.activity.id === activityId; });
            var groupInfos = __spread(protocolActivityGroupInfos);
            var initialValues = [];
            protocolItems.forEach(function (pi) {
                groupInfos[idx].measureUnitValues.forEach(function (muv) {
                    initialValues.push({
                        clinicId: pi.clinic.id,
                        measureUnitId: muv.measureUnit.id,
                        value: muv.value,
                        dirty: false,
                    });
                });
            });
            groupInfos[idx] = __assign({}, groupInfos[idx], { initialCellValues: initialValues });
            return groupInfos;
        };
        _this.checkForLosingChangedCellValues = function (activityId) {
            var groupInfo = _this.state.protocolActivityGroupInfos.find(function (i) { return i.activity.id === activityId; });
            return groupInfo.measureUnitValues.every(function (i) {
                return i.value === i.initialValue;
            });
        };
        _this.fetchProtocolItems = function (activityId, page, pageSize) {
            return utils_1.createApiClient()
                .fetchProtocolItems(_this.props.planProtocolId, activityId, page, pageSize)
                .then(function (resp) { return resp.data; })
                .catch(function (error) { return antd_1.message.error(error.response && error.response.statusText); });
        };
        _this.saveDataRow = function (activityId, clinidId) {
            var protocolItemsByActivity = _this.state.protocolItemsByActivity;
            var data = _this.preparePlanProtocolItemForSave(protocolItemsByActivity
                .find(function (i) { return i.activityId === activityId; })
                .protocolItemsInfo.items.find(function (i) { return i.clinic.id === clinidId; }));
            return utils_1.createApiClient().savePlanProtocolItem(data);
        };
        _this.saveDataPage = function (activityId) {
            var protocolItemsByActivity = _this.state.protocolItemsByActivity;
            var pageData = protocolItemsByActivity
                .find(function (i) { return i.activityId === activityId; })
                .protocolItemsInfo.items.map(function (i) { return _this.preparePlanProtocolItemForSave(i); });
            return Promise.all(pageData.map(function (i) { return utils_1.createApiClient().savePlanProtocolItem(i); }));
        };
        _this.preparePlanProtocolItemForSave = function (item) {
            return {
                id: item.id,
                planProtocolItemValues: item.planProtocolItemValues.map(function (i) { return ({
                    id: i.id,
                    value: i.value,
                }); }),
            };
        };
        _this.onDataOnPageSave = function (activityId) {
            _this.saveDataPage(activityId)
                .then(function () {
                var _a = _this.state, protocolActivityGroupInfos = _a.protocolActivityGroupInfos, protocolItemsByActivity = _a.protocolItemsByActivity;
                var protocolItemsByActivityItem = protocolItemsByActivity.find(function (i) { return i.activityId === activityId; });
                var groupInfoIdx = protocolActivityGroupInfos.findIndex(function (i) { return i.activity.id === activityId; });
                var updatedGroupInfos = __spread(protocolActivityGroupInfos);
                var updatedMeasureUnitValues = updatedGroupInfos[groupInfoIdx].measureUnitValues.map(function (i) { return (__assign({}, i, { initialValue: i.value })); });
                var updatedInitialCellValues = updatedGroupInfos[groupInfoIdx].initialCellValues.map(function (i) { return (__assign({}, i, { dirty: false, value: protocolItemsByActivityItem.protocolItemsInfo.items
                        .find(function (x) { return x.clinic.id === i.clinicId; })
                        .planProtocolItemValues.find(function (y) { return y.measureUnit.id === i.measureUnitId; }).value })); });
                updatedGroupInfos[groupInfoIdx] = __assign({}, updatedGroupInfos[groupInfoIdx], { measureUnitValues: updatedMeasureUnitValues, initialCellValues: updatedInitialCellValues });
                _this.setState({
                    protocolActivityGroupInfos: updatedGroupInfos,
                }, function () {
                    antd_1.message.success('Страница протокола сохранена');
                });
            })
                .catch(function (error) { return antd_1.message.error('Ошибка при сохранении страницы протокола'); });
        };
        _this.onDataOnRowSave = function (activityId, clinicId) {
            _this.saveDataRow(activityId, clinicId)
                .then(function () {
                var _a = _this.state, protocolActivityGroupInfos = _a.protocolActivityGroupInfos, protocolItemsByActivity = _a.protocolItemsByActivity;
                var protocolItem = protocolItemsByActivity
                    .find(function (i) { return i.activityId === activityId; })
                    .protocolItemsInfo.items.find(function (i) { return i.clinic.id === clinicId; });
                var groupInfoIdx = protocolActivityGroupInfos.findIndex(function (i) { return i.activity.id === activityId; });
                var updatedGroupInfos = __spread(protocolActivityGroupInfos);
                var groupInfo = updatedGroupInfos[groupInfoIdx];
                var initialValues = groupInfo.initialCellValues.filter(function (i) { return i.clinicId === clinicId; });
                var updatedMeasureUnitValues = groupInfo.measureUnitValues.map(function (i) {
                    var newValue = protocolItem.planProtocolItemValues.find(function (k) { return k.measureUnit.id === i.measureUnit.id; }).value;
                    return __assign({}, i, { value: newValue, initialValue: newValue });
                });
                var updatedInitialCellValues = groupInfo.initialCellValues
                    .filter(function (i) { return i.clinicId !== clinicId; })
                    .concat(initialValues.map(function (i) { return (__assign({}, i, { dirty: false, value: protocolItem.planProtocolItemValues.find(function (x) { return x.measureUnit.id === i.measureUnitId; }).value })); }));
                groupInfo.initialCellValues = updatedInitialCellValues;
                groupInfo.measureUnitValues = updatedMeasureUnitValues;
                updatedGroupInfos[groupInfoIdx] = __assign({}, groupInfo);
                _this.setState({
                    protocolActivityGroupInfos: updatedGroupInfos,
                }, function () {
                    antd_1.message.success('Строка протокола сохранена');
                });
            })
                .catch(function (error) { return antd_1.message.error('Ошибка при сохранении строки протокола'); });
        };
        _this.onGroupPageChanged = function (activityId, page) {
            var protocolItemsByActivity = _this.state.protocolItemsByActivity;
            var protocolItemInfoIdx = protocolItemsByActivity.findIndex(function (i) { return i.activityId === activityId; });
            var protocolItemInfo = protocolItemsByActivity[protocolItemInfoIdx];
            if (protocolItemInfo.protocolItemsInfo.page === page) {
                return;
            }
            var postAction = function () {
                return _this.fetchProtocolItems(activityId, page - 1, protocolItemInfo.protocolItemsInfo.pageSize).then(function (resp) {
                    var updatedProtocolItemsByActivity = __spread(_this.state.protocolItemsByActivity);
                    updatedProtocolItemsByActivity[protocolItemInfoIdx] = __assign({}, updatedProtocolItemsByActivity[protocolItemInfoIdx], { protocolItemsInfo: __assign({}, updatedProtocolItemsByActivity[protocolItemInfoIdx].protocolItemsInfo, { page: page, totalElements: resp.totalElements, items: resp.content }) });
                    _this.setState({
                        protocolItemsByActivity: updatedProtocolItemsByActivity,
                        protocolActivityGroupInfos: _this.setInitialCellValues(activityId, resp.content),
                    });
                });
            };
            _this.doPostAction(activityId, postAction);
        };
        _this.doPostAction = function (activityId, postAction) {
            if (!_this.checkForLosingChangedCellValues(activityId)) {
                var modalInfo = YesNoModalInfo_1.default('Предупреждение', 'У вас есть несохраненные данные. Вы действительно хотите продолжить?', function () {
                    postAction();
                    _this.props.closeRecentModal();
                }, undefined, function () {
                    _this.props.closeRecentModal();
                    _this.forceUpdate();
                }, undefined, false);
                _this.props.addNewModal(modalInfo);
                return;
            }
            postAction();
        };
        _this.onGroupPageSizeChanged = function (activityId, pageSize) {
            var protocolItemsByActivity = _this.state.protocolItemsByActivity;
            var protocolItemInfoIdx = protocolItemsByActivity.findIndex(function (i) { return i.activityId === activityId; });
            var protocolItemInfo = protocolItemsByActivity[protocolItemInfoIdx];
            if (protocolItemInfo.protocolItemsInfo.pageSize === pageSize) {
                return;
            }
            var postAction = function () {
                return _this.fetchProtocolItems(activityId, protocolItemInfo.protocolItemsInfo.page - 1, pageSize).then(function (resp) {
                    var updatedProtocolItemsByActivity = __spread(_this.state.protocolItemsByActivity);
                    updatedProtocolItemsByActivity[protocolItemInfoIdx] = __assign({}, updatedProtocolItemsByActivity[protocolItemInfoIdx], { protocolItemsInfo: __assign({}, updatedProtocolItemsByActivity[protocolItemInfoIdx].protocolItemsInfo, { pageSize: pageSize, totalElements: resp.totalElements, items: resp.content }) });
                    _this.setState({
                        protocolItemsByActivity: updatedProtocolItemsByActivity,
                        protocolActivityGroupInfos: _this.setInitialCellValues(activityId, resp.content),
                    });
                });
            };
            _this.doPostAction(activityId, postAction);
        };
        _this.getColumns = function () {
            return [
                {
                    title: 'Код',
                    width: '120px',
                    dataIndex: 'activity.code',
                },
                {
                    title: 'Вид деятельности',
                    dataIndex: 'activity.name',
                },
                {
                    title: '',
                    dataIndex: 'id',
                    render: function (id, originalRow) {
                        return (originalRow.initialCellValues.some(function (i) { return i.dirty; }) && (react_1.default.createElement(antd_1.Icon, { type: "check", style: { color: '#1890ff', cursor: 'pointer' }, onClick: function () { return _this.onDataOnPageSave(originalRow.activity.id); } })));
                    },
                },
            ];
        };
        _this.state = {
            expandedRowKeys: [],
            protocolActivityGroupInfos: [],
            protocolItemsByActivity: [],
            fetched: false,
        };
        return _this;
    }
    ProtocolActivitiesTable.prototype.componentDidMount = function () {
        this.fetchProtocolActivityGroupInfos(this.props.planProtocolId);
        this.props.fetchCustomDict(['measureUnit']);
    };
    ProtocolActivitiesTable.prototype.render = function () {
        var _this = this;
        if (!this.state.fetched || !this.props.measureUnitsDict.length) {
            return null;
        }
        var expandedObj = {};
        if (this.state.protocolActivityGroupInfos.length) {
            expandedObj['expandedRowRender'] = function (r) {
                var protocolItemInfo = _this.state.protocolItemsByActivity.find(function (i) { return i.activityId === r.activity.id; });
                if (!protocolItemInfo) {
                    return null;
                }
                return (react_1.default.createElement(ProtocolActivitiesTableSubRow_1.default, { onProtocolItemValueChange: _this.onProtocolItemValueChange, onGroupPageChanged: _this.onGroupPageChanged, onGroupPageSizeChanged: _this.onGroupPageSizeChanged, groupInfo: r, protocolItemInfo: protocolItemInfo, measureUnits: _this.props.measureUnitsDict, onDataOnPageSave: _this.onDataOnPageSave, onDataOnRowSave: _this.onDataOnRowSave }));
            };
        }
        console.log(this.state.protocolActivityGroupInfos);
        return (react_1.default.createElement(ProtocolItemsTable, __assign({ size: "small", indentSize: 4, 
            // title={() => 'Виды деятельности'}
            columns: this.getColumns(), rowKey: function (r) { return r.activity.id.toString(); }, dataSource: this.state.protocolActivityGroupInfos, pagination: false }, expandedObj, { onExpandedRowsChange: this.handleExpandedRowsChange, onExpand: function (expanded, r) { return _this.onGroupExpanding(r.activity.id); } })));
    };
    return ProtocolActivitiesTable;
}(react_1.default.Component));
var mapStateToProps = function (state) {
    return {
        measureUnitsDict: state.dictionariesDataState.measureUnit,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchCustomDict: function (dictNames) { return dispatch(businessDataStateActions_1.fetchCustomDict(dictNames)); },
        addNewModal: function (modalInfo) { return dispatch(infrastructureStateActions_1.addNewModal(modalInfo)); },
        closeRecentModal: function (numberToClose) { return dispatch(infrastructureStateActions_1.closeRecentModal(numberToClose)); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ProtocolActivitiesTable);
var templateObject_1;
//# sourceMappingURL=ProtocolActivitiesTable.js.map