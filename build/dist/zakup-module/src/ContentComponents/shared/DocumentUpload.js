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
import { Button, Icon, Upload } from 'antd';
import React from 'react';
import { isTrue } from '../../utils';
var DocumentUpload = /** @class */ (function (_super) {
    __extends(DocumentUpload, _super);
    function DocumentUpload(props) {
        var _this = _super.call(this, props) || this;
        _this.onRemove = function (file) {
            var index = _this.state.fileList.indexOf(file);
            var newFileList = _this.state.fileList.slice();
            newFileList.splice(index, 1);
            _this.setState({
                fileList: newFileList,
            });
            _this.props.onChange(newFileList);
        };
        _this.beforeUpload = function (file) {
            var newFileList = _this.props.multiple ? __spread(_this.state.fileList, [file]) : [file];
            _this.setState({
                fileList: newFileList,
            });
            _this.props.onChange(newFileList);
            return false;
        };
        _this.handleUpload = function () {
            var shouldClearFileListOnUpload = _this.props.shouldClearFileListOnUpload;
            _this.setState({
                uploading: true,
                fileList: isTrue(shouldClearFileListOnUpload) ? [] : _this.state.fileList,
            }, function () { return _this.props.onUpload(); });
            setTimeout(function () { return _this.setState({ uploading: false }); }, 600);
        };
        _this.state = {
            fileList: _this.props.fileList ? __spread(_this.props.fileList) : [],
            uploading: false,
        };
        return _this;
    }
    DocumentUpload.prototype.render = function () {
        var _a = this.state, uploading = _a.uploading, fileList = _a.fileList;
        var uploadBtnText = this.props.uploadBtnText;
        return (React.createElement("div", { style: { display: 'flex', alignItems: 'flex-start' } },
            React.createElement(Upload, { onRemove: this.onRemove, beforeUpload: this.beforeUpload, fileList: fileList },
                React.createElement(Button, null,
                    React.createElement(Icon, { type: "upload" }),
                    " \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C")),
            isTrue(this.props.showUploadBtn) && (React.createElement(Button, { type: "primary", onClick: this.handleUpload, disabled: fileList.length === 0, loading: uploading, style: { marginLeft: 5 } }, uploading ? 'Загрузка...' : uploadBtnText || 'Начать загрузку'))));
    };
    return DocumentUpload;
}(React.Component));
export default DocumentUpload;
//# sourceMappingURL=DocumentUpload.js.map