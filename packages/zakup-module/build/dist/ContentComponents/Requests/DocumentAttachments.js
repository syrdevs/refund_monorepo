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
var react_1 = __importDefault(require("react"));
var DocumentAttachmentsForm_1 = __importDefault(require("./DocumentAttachmentsForm"));
var DocumentAttachmentsList_1 = __importDefault(require("./DocumentAttachmentsList"));
var DocumentAttachments = /** @class */ (function (_super) {
    __extends(DocumentAttachments, _super);
    function DocumentAttachments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentAttachments.prototype.render = function () {
        var _a = this.props, docs = _a.docs, onDelete = _a.onDelete, attachmentTypesDict = _a.attachmentTypesDict, docType = _a.docType, docComment = _a.docComment, file = _a.file, onChange = _a.onChange, onUpload = _a.onUpload;
        var existingAttachmentTypeIds = docs.map(function (i) { return i.attachmentType.id; });
        var typesDict = attachmentTypesDict.filter(function (i) { return existingAttachmentTypeIds.findIndex(function (k) { return k === i.id; }) === -1; });
        return (react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
            react_1.default.createElement(DocumentAttachmentsForm_1.default, { clearCurrentUploadInfo: this.props.clearCurrentUploadInfo, attachmentTypesDict: typesDict, docType: docType, docComment: docComment, file: file, onChange: onChange, onUpload: onUpload }),
            react_1.default.createElement(DocumentAttachmentsList_1.default, { style: { marginTop: 10 }, docs: docs, onDelete: onDelete })));
    };
    return DocumentAttachments;
}(react_1.default.Component));
exports.default = DocumentAttachments;
//# sourceMappingURL=DocumentAttachments.js.map