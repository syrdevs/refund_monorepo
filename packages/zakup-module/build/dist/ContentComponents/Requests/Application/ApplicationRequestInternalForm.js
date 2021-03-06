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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var React = __importStar(require("react"));
var AppRolesDict_1 = __importDefault(require("../../../Data/AppRolesDict"));
var utils_1 = require("../../../utils");
var shared_1 = require("../../shared");
var FormItem = antd_1.Form.Item;
var Option = antd_1.Select.Option;
var ApplicationRequestInternalForm = antd_1.Form.create({
    onFieldsChange: function (props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields: function (props) {
        return {
            descr: antd_1.Form.createFormField(__assign({}, props.descr)),
            documentDate: antd_1.Form.createFormField(__assign({}, props.documentDate)),
            clinic: antd_1.Form.createFormField(__assign({}, props.clinic, { value: props.clinic.value ? props.clinic.value.id : '' })),
            region: antd_1.Form.createFormField(__assign({}, props.region, { value: props.region.value ? props.region.value.id : '' })),
            role: antd_1.Form.createFormField(__assign({}, props.role, { value: props.role.value ? props.role.value.id : '' })),
        };
    },
})(function (props) {
    var getFieldDecorator = props.form.getFieldDecorator;
    return (React.createElement(antd_1.Form, { onSubmit: props.handleSubmit(props.form), style: { display: 'flex', flexDirection: 'column' } },
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F" }, shared_1.CommonFormItemLayout), getFieldDecorator('clinic', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(antd_1.Select, null, props.clinicsDict.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.shortName);
        })))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0420\u0435\u0433\u0438\u043E\u043D \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u0435\u043D\u0438\u044F \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }, shared_1.CommonFormItemLayout), getFieldDecorator('region', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(antd_1.Select, null, props.regionsDict.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.nameRu);
        })))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0414\u0430\u0442\u0430 \u043F\u043E\u0434\u0430\u0447\u0438 \u0437\u0430\u044F\u0432\u043A\u0438" }, shared_1.CommonFormItemLayout), getFieldDecorator('documentDate', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(antd_1.DatePicker, { format: "DD.MM.YYYY", disabledDate: utils_1.isDisabledPreviousDate }))),
        !props.isNew && (React.createElement(shared_1.RowStyled, null,
            React.createElement(shared_1.LabelColStyled, __assign({}, shared_1.CommonFormItemLayout.labelCol), "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440"),
            React.createElement(antd_1.Col, __assign({}, shared_1.CommonFormItemLayout.wrapperCol),
                React.createElement(antd_1.Input, { disabled: true, value: props.number.value })))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439" }, shared_1.CommonFormItemLayout), getFieldDecorator('descr')(React.createElement(antd_1.Input, null))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0420\u043E\u043B\u044C" }, shared_1.CommonFormItemLayout), getFieldDecorator('role', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(antd_1.Select, null, AppRolesDict_1.default.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.name);
        })))),
        React.createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '10px', flexShrink: 0 } },
            React.createElement(antd_1.Button, { type: "primary", htmlType: "button", disabled: props.isNew || !props.hasItems, style: { marginRight: '10px' }, onClick: props.onSendToReview }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u0440\u0430\u0441\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u0438\u0435"),
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit", disabled: !props.valid }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))));
});
exports.default = ApplicationRequestInternalForm;
//# sourceMappingURL=ApplicationRequestInternalForm.js.map