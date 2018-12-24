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
import { Col, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { CommonFormItemLayout, LabelColStyled, RowStyled } from '../shared';
import DocumentUpload from '../shared/DocumentUpload';
var Option = Select.Option;
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
        return (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', alignSelf: 'center', width: '80%' } },
            React.createElement(RowStyled, null,
                React.createElement(LabelColStyled, __assign({}, CommonFormItemLayout.labelCol), "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442"),
                React.createElement(Col, __assign({}, CommonFormItemLayout.wrapperCol),
                    React.createElement(Select, { style: { display: 'block' }, value: this.props.docType || '', onChange: function (docType) { return onChange(docType, _this.props.docComment, _this.props.file); } }, this.props.attachmentTypesDict.map(function (i) { return (React.createElement(Option, { key: i.id }, i.nameRu)); })))),
            React.createElement(RowStyled, null,
                React.createElement(LabelColStyled, __assign({}, CommonFormItemLayout.labelCol), "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"),
                React.createElement(Col, __assign({}, CommonFormItemLayout.wrapperCol),
                    React.createElement(TextArea, { value: this.props.docComment, onChange: function (event) {
                            return onChange(_this.props.docType, event.target.value, _this.props.file);
                        } }))),
            React.createElement(RowStyled, null,
                React.createElement(LabelColStyled, __assign({}, CommonFormItemLayout.labelCol), "\u0424\u0430\u0439\u043B"),
                React.createElement(Col, __assign({}, CommonFormItemLayout.wrapperCol),
                    React.createElement(DocumentUpload, { multiple: false, shouldClearFileListOnUpload: true, showUploadBtn: true, onUpload: this.onUpload, uploadBtnText: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C", fileList: this.props.file ? [this.props.file] : undefined, onChange: function (fileList) {
                            return onChange(_this.props.docType, _this.props.docComment, fileList.length > 0 ? fileList[0] : undefined);
                        } })))));
    };
    return DocumentAttachmentsForm;
}(React.Component));
export default DocumentAttachmentsForm;
//# sourceMappingURL=DocumentAttachmentsForm.js.map