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
import { Icon, InputNumber, Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
var InputWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  & > div {\n    max-width: 100%;\n  }\n"], ["\n  & > div {\n    max-width: 100%;\n  }\n"])));
var ProtocolActivitiesTableSubRow = /** @class */ (function (_super) {
    __extends(ProtocolActivitiesTableSubRow, _super);
    function ProtocolActivitiesTableSubRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getColumns = function () {
            var columns = [
                {
                    title: 'Мед. организация',
                    dataIndex: 'clinic.shortName',
                    render: function (text, record, index) {
                        var rowInfo = _this.props.groupInfo.initialCellValues.filter(function (i) { return i.clinicId === record.clinic.id; });
                        if (!rowInfo.some(function (i) { return i.dirty; })) {
                            return text;
                        }
                        return (React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                            React.createElement("p", null, text),
                            React.createElement(Icon, { style: { marginLeft: '6px', color: '#1890ff', cursor: 'pointer' }, type: "check", onClick: function () { return _this.props.onDataOnRowSave(record.activity.id, record.clinic.id); } })));
                    },
                },
            ];
            var valueColumnProps = _this.props.groupInfo.measureUnitValues.map(function (mu) {
                var cProps = {
                    title: mu.measureUnit.shortname || mu.measureUnit.nameRu,
                    width: 200,
                    children: [
                        {
                            title: 'Заявлено',
                            dataIndex: 'id',
                            width: 107,
                            key: mu.measureUnit.code + "_planValue",
                            render: function (text, record, index) {
                                var protocolItemValue = record.planProtocolItemValues.find(function (i) { return i.measureUnit.id === mu.measureUnit.id; });
                                return React.createElement(InputNumber, { disabled: true, value: protocolItemValue.proposalItemValue.value || 0 });
                            },
                        },
                        {
                            title: 'Принято',
                            dataIndex: 'id',
                            width: 107,
                            key: mu.measureUnit.code + "_actualValue",
                            render: function (text, record, index) {
                                var protocolItemValue = record.planProtocolItemValues.find(function (i) { return i.measureUnit.id === mu.measureUnit.id; });
                                return (React.createElement(InputNumber, { value: protocolItemValue.value, min: 0, onChange: function (value) {
                                        return _this.onValueChange(record.activity.id, record.clinic.id, mu.measureUnit.id, value);
                                    } }));
                            },
                        },
                    ],
                };
                return cProps;
            });
            return columns.concat(valueColumnProps);
        };
        _this.onValueChange = function (activityId, clinicId, measureUnitId, newValue) {
            var val = newValue || 0;
            if (typeof newValue !== 'number') {
                val = parseInt(newValue, 10) || 0;
            }
            _this.props.onProtocolItemValueChange(activityId, clinicId, measureUnitId, val);
        };
        return _this;
    }
    ProtocolActivitiesTableSubRow.prototype.render = function () {
        var _this = this;
        var _a = this.props, protocolItemInfo = _a.protocolItemInfo, groupInfo = _a.groupInfo;
        return (React.createElement(Table, { columns: this.getColumns(), bordered: true, dataSource: protocolItemInfo.protocolItemsInfo.items, rowKey: function (r) { return r.id.toString(); }, style: { margin: '4px 0' }, size: "small", pagination: {
                position: 'bottom',
                pageSize: protocolItemInfo.protocolItemsInfo.pageSize,
                current: protocolItemInfo.protocolItemsInfo.page,
                showSizeChanger: true,
                showTotal: function (total, range) { return range[0] + "-" + range[1] + " \u0438\u0437 " + total + " \u0437\u0430\u043F\u0438\u0441\u0435\u0439"; },
                pageSizeOptions: ['1', '10', '25', '50', '100'],
                total: protocolItemInfo.protocolItemsInfo.totalElements,
                onChange: function (page, pageSize) {
                    _this.props.onGroupPageChanged(protocolItemInfo.activityId, page);
                },
                onShowSizeChange: function (current, size) {
                    _this.props.onGroupPageSizeChanged(protocolItemInfo.activityId, size);
                },
            }, footer: function () {
                return (React.createElement("div", { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' } },
                    React.createElement("div", { style: { display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'flex-end' } },
                        React.createElement("p", { style: { textAlign: 'right', paddingRight: '3px', lineHeight: '36px' } }, "\u0418\u0442\u043E\u0433\u043E: "),
                        React.createElement("p", { style: { textAlign: 'right', paddingRight: '3px', lineHeight: '36px' } }, "\u041F\u043B\u0430\u043D: ")),
                    React.createElement("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flexShrink: 0,
                            width: 214 * (groupInfo.measureUnitValues.length - 1) + 205 + "px",
                        } }, groupInfo.measureUnitValues.map(function (i, idx) {
                        var isLast = idx === groupInfo.measureUnitValues.length - 1;
                        return (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', width: isLast ? '204px' : '214px' }, key: i.measureUnit.id },
                            React.createElement("div", { style: { display: 'flex' } },
                                React.createElement(InputWrapper, { style: { padding: '2px 8px', width: '107px', minWidth: '107px' } },
                                    React.createElement(InputNumber, { disabled: true, value: i.proposalValue })),
                                React.createElement(InputWrapper, { style: { padding: '2px 8px', width: '107px', minWidth: '107px' } },
                                    React.createElement(InputNumber, { disabled: true, value: i.value, style: { maxWidth: '100%' } }))),
                            React.createElement("div", { style: { display: 'flex' } },
                                React.createElement("div", { style: { padding: '2px 8px', width: '107px', minWidth: '107px', flexShrink: 0 } }),
                                React.createElement(InputWrapper, { style: { padding: '2px 8px', width: '107px', minWidth: '107px' } },
                                    React.createElement(InputNumber, { disabled: true, value: i.planItemValue, style: { maxWidth: '100%' } })))));
                    }))));
            } }));
    };
    return ProtocolActivitiesTableSubRow;
}(React.Component));
export default ProtocolActivitiesTableSubRow;
var templateObject_1;
//# sourceMappingURL=ProtocolActivitiesTableSubRow.js.map