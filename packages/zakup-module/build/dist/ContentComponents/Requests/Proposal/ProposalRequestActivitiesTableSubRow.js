"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var ProposalRequestActivitiesTableSubRow = /** @class */ (function (_super) {
    __extends(ProposalRequestActivitiesTableSubRow, _super);
    function ProposalRequestActivitiesTableSubRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getColumns = function () {
            return [
                {
                    title: 'Вид деятельности',
                    dataIndex: 'measureUnit.nameRu',
                    width: '160px',
                },
                {
                    title: '',
                    dataIndex: 'value',
                    render: function (value, originalRow, index) {
                        return (react_1.default.createElement(antd_1.InputNumber, { min: 0, value: value, onChange: function (newValue) { return _this.onValueChange(originalRow.measureUnit.id, newValue); } }));
                    },
                },
            ];
        };
        _this.onValueChange = function (measureUnitId, newValue) {
            var val = newValue || 0;
            if (typeof newValue !== 'number') {
                val = parseInt(newValue, 10) || 0;
            }
            _this.props.onProposalItemValueChange(_this.props.proposalItem.activity.id, measureUnitId, val);
        };
        return _this;
    }
    ProposalRequestActivitiesTableSubRow.prototype.render = function () {
        return (react_1.default.createElement(antd_1.Table, { size: "small", showHeader: false, style: { margin: '4px 0' }, columns: this.getColumns(), rowKey: function (r) { return r.measureUnit.id.toString(); }, dataSource: this.props.proposalItem.proposalItemValues, pagination: false }));
    };
    return ProposalRequestActivitiesTableSubRow;
}(react_1.default.Component));
exports.default = ProposalRequestActivitiesTableSubRow;
//# sourceMappingURL=ProposalRequestActivitiesTableSubRow.js.map