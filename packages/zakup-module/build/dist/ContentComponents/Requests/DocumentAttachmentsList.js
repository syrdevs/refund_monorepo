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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var utils_1 = require("../../utils");
var LinkStyle = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: #1890ff;\n  cursor: pointer;\n"], ["\n  color: #1890ff;\n  cursor: pointer;\n"])));
var DocumentAttachmentsList = /** @class */ (function (_super) {
    __extends(DocumentAttachmentsList, _super);
    function DocumentAttachmentsList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getColumns = function () {
            return [
                {
                    title: 'Тип документа',
                    dataIndex: 'attachmentType.nameRu',
                    width: '250px',
                },
                {
                    title: 'Комментарий',
                    dataIndex: 'fileDescription',
                },
                {
                    title: 'Имя файла',
                    dataIndex: 'name',
                    width: '160px',
                    render: function (data, originalRow) {
                        return (react_1.default.createElement(LinkStyle, { onClick: function () {
                                if (originalRow.id) {
                                    utils_1.createApiClient().downloadFile(originalRow.id);
                                }
                            } }, data));
                    },
                },
                {
                    title: 'Действия',
                    dataIndex: 'id',
                    width: '100px',
                    render: function (data, originalRow) {
                        return (react_1.default.createElement(antd_1.Icon, { type: "delete", style: { color: '#1890ff', cursor: 'pointer' }, onClick: function () {
                                _this.props.onDelete(__assign({}, originalRow));
                            } }));
                    },
                },
            ];
        };
        return _this;
    }
    DocumentAttachmentsList.prototype.render = function () {
        var styleObj = this.props.style ? __assign({}, this.props.style) : {};
        return (react_1.default.createElement(antd_1.Table, { style: styleObj, columns: this.getColumns(), dataSource: this.props.docs, rowKey: function (r) { return "" + r.attachmentType.id; }, size: "middle", pagination: false }));
    };
    return DocumentAttachmentsList;
}(react_1.default.Component));
exports.default = DocumentAttachmentsList;
var templateObject_1;
//# sourceMappingURL=DocumentAttachmentsList.js.map