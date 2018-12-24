"use strict";
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
var shared_1 = require("../shared");
var ProtocolInfo = function (props) { return (react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
    react_1.default.createElement(shared_1.RowStyled, null,
        react_1.default.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u041F\u043B\u0430\u043D\u043E\u0432\u044B\u0439 \u043F\u0435\u0440\u0438\u043E\u0434"),
        react_1.default.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
            react_1.default.createElement(antd_1.Input, { disabled: true, value: props.periodYear.year }))),
    react_1.default.createElement(shared_1.RowStyled, null,
        react_1.default.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u0420\u0435\u0433\u0438\u043E\u043D"),
        react_1.default.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
            react_1.default.createElement(antd_1.Input, { disabled: true, value: props.region.nameRu }))),
    react_1.default.createElement(shared_1.RowStyled, null,
        react_1.default.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u0422\u0438\u043F"),
        react_1.default.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
            react_1.default.createElement(antd_1.Input, { disabled: true, value: props.planProtocolType.nameRu }))),
    react_1.default.createElement(shared_1.RowStyled, null,
        react_1.default.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440"),
        react_1.default.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
            react_1.default.createElement(antd_1.Input, { disabled: true, value: props.number }))),
    react_1.default.createElement(shared_1.RowStyled, null,
        react_1.default.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
        react_1.default.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
            react_1.default.createElement(antd_1.Input, { disabled: true, value: props.descr }))),
    react_1.default.createElement(shared_1.RowStyled, null,
        react_1.default.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u0414\u0430\u0442\u0430"),
        react_1.default.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
            react_1.default.createElement(antd_1.Input, { disabled: true, value: props.documentDate }))))); };
exports.default = ProtocolInfo;
//# sourceMappingURL=ProtocolInfo.js.map