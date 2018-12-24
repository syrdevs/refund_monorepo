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
var TextArea_1 = __importDefault(require("antd/lib/input/TextArea"));
var react_1 = __importDefault(require("react"));
var shared_1 = require("../shared");
var DocumentUpload_1 = __importDefault(require("../shared/DocumentUpload"));
var Option = antd_1.Select.Option;
var DocumentAttachmentsForm = /** @class */ (function (_super) {
    __extends(DocumentAttachmentsForm, _super);
    function DocumentAttachmentsForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onUpload = function () {
            _this.props.onUpload();
            _this.props.clearCurrentUploadInfo();
        };
        return _this;
    }
    DocumentAttachmentsForm.prototype.render = function () {
        var _this = this;
        var onChange = this.props.onChange;
        return (react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', alignSelf: 'center', width: '80%' } },
            react_1.default.createElement(shared_1.RowStyled, null,
                react_1.default.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442"),
                react_1.default.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
                    react_1.default.createElement(antd_1.Select, { style: { display: 'block' }, value: this.props.docType || '', onChange: function (docType) { return onChange(docType, _this.props.docComment, _this.props.file); } }, this.props.attachmentTypesDict.map(function (i) { return (react_1.default.createElement(Option, { key: i.id }, i.nameRu)); })))),
            react_1.default.createElement(shared_1.RowStyled, null,
                react_1.default.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"),
                react_1.default.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
                    react_1.default.createElement(TextArea_1.default, { value: this.props.docComment, onChange: function (event) {
                            return onChange(_this.props.docType, event.target.value, _this.props.file);
                        } }))),
            react_1.default.createElement(shared_1.RowStyled, null,
                react_1.default.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u0424\u0430\u0439\u043B"),
                react_1.default.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
                    react_1.default.createElement(DocumentUpload_1.default, { multiple: false, shouldClearFileListOnUpload: true, showUploadBtn: true, onUpload: this.onUpload, uploadBtnText: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C", fileList: this.props.file ? [this.props.file] : undefined, onChange: function (fileList) {
                            return onChange(_this.props.docType, _this.props.docComment, fileList.length > 0 ? fileList[0] : undefined);
                        } })))));
    };
    return DocumentAttachmentsForm;
}(react_1.default.Component));
exports.default = DocumentAttachmentsForm;
//# sourceMappingURL=DocumentAttachmentsForm.js.map