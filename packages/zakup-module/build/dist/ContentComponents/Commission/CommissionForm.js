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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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
var shared_ui_1 = require("@vitacore/shared-ui");
var antd_1 = require("antd");
var _ = __importStar(require("lodash"));
var moment_1 = __importDefault(require("moment"));
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var OkModalInfo_1 = __importDefault(require("../../Components/Modals/OkModalInfo"));
var businessDataStateActions_1 = require("../../Redux/Actions/businessDataStateActions");
var infrastructureStateActions_1 = require("../../Redux/Actions/infrastructureStateActions");
var businessDataStateConstants_1 = require("../../Redux/Constants/businessDataStateConstants");
var history_1 = require("../../Redux/history");
var utils_1 = require("../../utils");
var shared_1 = require("../shared");
var FormItem = antd_1.Form.Item;
var Option = antd_1.Select.Option;
var CustomizedForm = antd_1.Form.create({
    onFieldsChange: function (props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields: function (props) {
        return {
            region: antd_1.Form.createFormField(__assign({}, props.region, { value: props.region.value ? props.region.value.id : '' })),
            dateBegin: antd_1.Form.createFormField(__assign({}, props.dateBegin, { value: props.dateBegin.value })),
        };
    },
})(function (props) {
    var getFieldDecorator = props.form.getFieldDecorator;
    return (React.createElement(antd_1.Form, { onSubmit: props.handleSubmit(props.form), style: { display: 'flex', flexDirection: 'column' } },
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0420\u0435\u0433\u0438\u043E\u043D" }, shared_1.CommonFormItemLayout), getFieldDecorator('region', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(antd_1.Select, null, props.regionsDict.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.nameRu);
        })))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438" }, shared_1.CommonFormItemLayout), getFieldDecorator('dateBegin', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(antd_1.DatePicker, { format: "DD.MM.YYYY", disabledDate: utils_1.isDisabledPreviousDate }))),
        React.createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '10px', flexShrink: 0 } },
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit", disabled: !props.valid }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))));
});
var CommissionForm = /** @class */ (function (_super) {
    __extends(CommissionForm, _super);
    function CommissionForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSubmit = function (form) { return function (e) {
            e.preventDefault();
            form.validateFields(function (err, values) {
                var id = _this.state.fields.id.value;
                if (!err) {
                    var valuesToSend = __assign({}, values, { meetingMembers: _this.props.initialValues.meetingMembers });
                    utils_1.createApiClient()
                        .saveCommission(__assign({ id: id }, valuesToSend))
                        .then(function () {
                        antd_1.message.success('Коммиссия сохранена!');
                        if (id) {
                            _this.setState({ valid: false });
                        }
                        else {
                            history_1.getHistory().push(shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions/all'));
                        }
                    });
                }
            });
        }; };
        _this.handleFormChange = function (changedFields) {
            var data = _this.handleSelectValueChanged(changedFields);
            var isValid = true;
            for (var field in data) {
                if (data[field].errors && Array.isArray(data[field].errors) && data[field].errors.length > 0) {
                    isValid = false;
                    break;
                }
            }
            _this.setState(function (_a) {
                var fields = _a.fields;
                return ({
                    fields: __assign({}, fields, _this.handleSelectValueChanged(changedFields)),
                    valid: isValid,
                });
            });
        };
        _this.handleSelectValueChanged = function (changedFields) {
            var e_1, _a;
            var fieldsWithSelect = ['region'];
            var rightFieldsData = __assign({}, changedFields);
            try {
                for (var fieldsWithSelect_1 = __values(fieldsWithSelect), fieldsWithSelect_1_1 = fieldsWithSelect_1.next(); !fieldsWithSelect_1_1.done; fieldsWithSelect_1_1 = fieldsWithSelect_1.next()) {
                    var f = fieldsWithSelect_1_1.value;
                    if (changedFields.hasOwnProperty(f)) {
                        rightFieldsData[f] = __assign({}, changedFields[f], { value: _this.extractDictionaryValue(f, changedFields[f].value) });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (fieldsWithSelect_1_1 && !fieldsWithSelect_1_1.done && (_a = fieldsWithSelect_1.return)) _a.call(fieldsWithSelect_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return rightFieldsData;
        };
        _this.extractDictionaryValue = function (fieldName, value, multi) {
            if (multi === void 0) { multi = false; }
            var dictPropsName = "" + fieldName + (multi ? '' : 's') + "Dict";
            var allDictData = _this.props[dictPropsName];
            if (!value) {
                return multi ? [] : undefined;
            }
            if (multi) {
                return allDictData.filter(function (i) { return value.indexOf(i.id) > -1; });
            }
            var data = allDictData.filter(function (i) { return i.id === value; });
            return data.length ? data[0] : undefined;
        };
        _this.fetchEntity = function (id) {
            _this.props.fetchSingleCommission(id);
        };
        _this.state = {
            fields: _this.convertPropsToEntityDataForState(props),
            valid: false,
        };
        return _this;
    }
    CommissionForm.prototype.componentWillReceiveProps = function (newProps) {
        if (!_.isEqual(this.props.initialValues, newProps.initialValues)) {
            this.setState({
                fields: this.convertPropsToEntityDataForState(newProps),
            });
        }
    };
    CommissionForm.prototype.componentDidMount = function () {
        var id = this.props.match.params.id;
        if (id === 'new') {
            this.props.setNewCommission();
        }
        else {
            this.fetchEntity(id);
        }
    };
    CommissionForm.prototype.render = function () {
        var _a = this.state, fields = _a.fields, valid = _a.valid;
        var _b = this.props, fetchSingleCommissionStatus = _b.fetchSingleCommissionStatus, dictsFetching = _b.dictsFetching;
        if (fetchSingleCommissionStatus === businessDataStateConstants_1.FETCH_ENTITY_STATUS.FETCHING || dictsFetching) {
            return React.createElement(shared_1.ContentLayout, { contentName: "\u041A\u043E\u043C\u0438\u0441\u0441\u0438\u044F" });
        }
        if (fetchSingleCommissionStatus === businessDataStateConstants_1.FETCH_ENTITY_STATUS.IDLE) {
            return null;
        }
        if (fetchSingleCommissionStatus === businessDataStateConstants_1.FETCH_ENTITY_STATUS.FAILED) {
            var modalInfo_1 = OkModalInfo_1.default('Ошибка при загрузке комиссии', 'Комиссия не найдена', function () {
                infrastructureStateActions_1.dispatchCloseRecentModal();
                history_1.getHistory().push(shared_ui_1.buildAppRoute(utils_1.getAppRoute(), '/commissions/all'));
            }, undefined, false);
            setTimeout(function () {
                businessDataStateActions_1.dispatchClearFetchEntityStatus();
                infrastructureStateActions_1.dispatchAddNewModal(modalInfo_1);
            }, 0);
            return null;
        }
        var id = this.props.match.params.id;
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'commissions',
                breadcrumbName: 'Комиссии',
            },
            {
                path: "" + id,
                breadcrumbName: id === 'new' ? 'Новая комиссия' : 'Информация о комиссии',
            },
        ];
        return (React.createElement(shared_1.ContentLayout, { contentName: "\u041A\u043E\u043C\u0438\u0441\u0441\u0438\u044F", breadcrumbRoutes: bcRoutes },
            React.createElement(CustomizedForm, __assign({}, fields, { valid: valid, onChange: this.handleFormChange, handleSubmit: this.handleSubmit, regionsDict: this.props.regionsDict }))));
    };
    CommissionForm.prototype.convertPropsToEntityDataForState = function (props) {
        var data = {
            id: {
                value: undefined,
            },
            region: {
                value: undefined,
            },
            dateBegin: {
                value: undefined,
            },
        };
        if (props.initialValues) {
            for (var key in props.initialValues) {
                if (props.initialValues.hasOwnProperty(key)) {
                    var value = props.initialValues && props.initialValues[key];
                    data[key] = {
                        value: value,
                    };
                }
            }
        }
        return data;
    };
    return CommissionForm;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        initialValues: state.businessDataState.commissionsData.currentCommission
            ? __assign({}, state.businessDataState.commissionsData.currentCommission, { region: state.businessDataState.commissionsData.currentCommission.region, dateBegin: moment_1.default(state.businessDataState.commissionsData.currentCommission.dateBegin, 'DD.MM.YYYY'), meetingMembers: state.businessDataState.commissionsData.currentCommission.meetingMembers }) : undefined,
        fetchSingleCommissionStatus: state.businessDataState.commissionsData.fetchSingleCommissionStatus,
        dictsFetching: state.dictionariesDataState.dictNamesFetching.length > 0,
        regionsDict: state.dictionariesDataState.region,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchSingleCommission: function (id) { return dispatch(businessDataStateActions_1.fetchSingleCommission(id)); },
        setNewCommission: function () { return dispatch({ type: businessDataStateConstants_1.SET_NEW_COMMISSION_REQUESTED, payload: undefined }); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CommissionForm);
//# sourceMappingURL=CommissionForm.js.map