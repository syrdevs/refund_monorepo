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
import { buildAppRoute } from '@vitacore/shared-ui';
import { Button, DatePicker, Form, message, Select } from 'antd';
import * as _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import CreateOkModalInfo from '../../Components/Modals/OkModalInfo';
import { dispatchClearFetchEntityStatus, fetchSingleNotice } from '../../Redux/Actions/businessDataStateActions';
import { dispatchAddNewModal, dispatchCloseRecentModal } from '../../Redux/Actions/infrastructureStateActions';
import { FETCH_ENTITY_STATUS, SET_NEW_NOTICE_REQUESTED } from '../../Redux/Constants/businessDataStateConstants';
import { getHistory } from '../../Redux/history';
import { createApiClient, getAppRoute, isDisabledPreviousDate, isDisabledPreviousTime } from '../../utils';
import { CommonFormItemLayout, ContentLayout } from '../shared';
var FormItem = Form.Item;
var Option = Select.Option;
var CustomizedForm = Form.create({
    onFieldsChange: function (props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields: function (props) {
        return {
            name: Form.createFormField(__assign({}, props.name, { value: props.name.value ? props.name.value.id : '' })),
            region: Form.createFormField(__assign({}, props.region, { value: props.region.value ? props.region.value.id : '' })),
            periodYear: Form.createFormField(__assign({}, props.periodYear, { value: props.periodYear.value ? props.periodYear.value.id : '' })),
            dateBegin: Form.createFormField(__assign({}, props.dateBegin, { value: props.dateBegin.value })),
            dateEnd: Form.createFormField(__assign({}, props.dateEnd, { value: props.dateEnd.value })),
            noticeMedicalTypes: Form.createFormField(__assign({}, props.noticeMedicalTypes, { value: props.noticeMedicalTypes && props.noticeMedicalTypes.value.map(function (i) { return i.medicalType.id; }) })),
            noticeMedicalForms: Form.createFormField(__assign({}, props.noticeMedicalForms, { value: props.noticeMedicalForms && props.noticeMedicalForms.value.map(function (i) { return i.medicalForm.id; }) })),
        };
    },
})(function (props) {
    var getFieldDecorator = props.form.getFieldDecorator;
    return (React.createElement(Form, { onSubmit: props.handleSubmit(props.form), style: { display: 'flex', flexDirection: 'column' } },
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F" }, CommonFormItemLayout), getFieldDecorator('name', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Select, null, props.namesDict.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.nameRu);
        })))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0420\u0435\u0433\u0438\u043E\u043D" }, CommonFormItemLayout), getFieldDecorator('region', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Select, null, props.regionsDict.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.nameRu);
        })))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u041F\u043B\u0430\u043D\u043E\u0432\u044B\u0439 \u043F\u0435\u0440\u0438\u043E\u0434" }, CommonFormItemLayout), getFieldDecorator('periodYear', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Select, null, props.periodYearsDict.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.year);
        })))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0440\u0438\u0435\u043C\u0430 \u0437\u0430\u044F\u0432\u043E\u043A" }, CommonFormItemLayout), getFieldDecorator('dateBegin', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(DatePicker, { showTime: true, format: "DD.MM.YYYY HH:mm", disabledDate: isDisabledPreviousDate, disabledTime: isDisabledPreviousTime }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0414\u0430\u0442\u0430 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F \u043F\u0440\u0438\u0435\u043C\u0430 \u0437\u0430\u044F\u0432\u043E\u043A" }, CommonFormItemLayout), getFieldDecorator('dateEnd', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(DatePicker, { showTime: true, format: "DD.MM.YYYY HH:mm", disabledDate: isDisabledPreviousDate, disabledTime: isDisabledPreviousTime }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0412\u0438\u0434 \u043C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u043E\u0439 \u043F\u043E\u043C\u043E\u0449\u0438" }, CommonFormItemLayout), getFieldDecorator('noticeMedicalTypes', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Select, { mode: "multiple" }, props.noticeMedicalTypesDict.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.nameRu);
        })))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0424\u043E\u0440\u043C\u0430 \u043C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u043E\u0439 \u043F\u043E\u043C\u043E\u0449\u0438" }, CommonFormItemLayout), getFieldDecorator('noticeMedicalForms', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Select, { mode: "multiple" }, props.noticeMedicalFormsDict.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.nameRu);
        })))),
        React.createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '10px', flexShrink: 0 } },
            React.createElement(Button, { style: { marginRight: 5 }, type: "primary", htmlType: "button", disabled: !props.id.value || !props.isOpen, onClick: function () {
                    localStorage.setItem('noticeId', props.id.value);
                    localStorage.setItem('regionId', props.region.value.id);
                    localStorage.setItem('periodYearId', props.periodYear.value.id);
                    getHistory().push(buildAppRoute(getAppRoute(), '/requests/proposals/new'));
                } }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u043D\u0430 \u043E\u0431\u044A\u0435\u043C\u044B"),
            React.createElement(Button, { style: { marginRight: 5 }, type: "primary", htmlType: "button", disabled: !props.id.value || !props.hasApplications || !props.isOpen, onClick: function () { return props.createProtocol(props.id.value); } }, "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B"),
            React.createElement(Button, { type: "primary", htmlType: "submit", disabled: !props.valid }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))));
});
var NoticeForm = /** @class */ (function (_super) {
    __extends(NoticeForm, _super);
    function NoticeForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSubmit = function (form) { return function (e) {
            e.preventDefault();
            form.validateFields(function (err, values) {
                var id = _this.state.fields.id.value;
                if (!err) {
                    var valuesToSend_1 = __assign({}, values, { noticeMedicalTypes: __spread(values.noticeMedicalTypes), noticeMedicalForms: __spread(values.noticeMedicalForms) });
                    var initialNoticeMedicalTypes = _this.props.initialValues.noticeMedicalTypes;
                    var initialNoticeMedicalForms = _this.props.initialValues.noticeMedicalForms;
                    var _loop_1 = function (i) {
                        var initialObj = initialNoticeMedicalTypes.find(function (t) { return t.medicalType.id === values.noticeMedicalTypes[i]; });
                        if (initialObj) {
                            valuesToSend_1.noticeMedicalTypes[i] = __assign({}, initialObj);
                        }
                        else {
                            valuesToSend_1.noticeMedicalTypes[i] = {
                                medicalType: {
                                    id: valuesToSend_1.noticeMedicalTypes[i],
                                },
                            };
                        }
                    };
                    for (var i = 0; i < valuesToSend_1.noticeMedicalTypes.length; i += 1) {
                        _loop_1(i);
                    }
                    var _loop_2 = function (i) {
                        var initialObj = initialNoticeMedicalForms.find(function (t) { return t.medicalForm.id === valuesToSend_1.noticeMedicalForms[i]; });
                        if (initialObj) {
                            valuesToSend_1.noticeMedicalForms[i] = __assign({}, initialObj);
                        }
                        else {
                            valuesToSend_1.noticeMedicalForms[i] = {
                                medicalForm: {
                                    id: valuesToSend_1.noticeMedicalForms[i],
                                },
                            };
                        }
                    };
                    for (var i = 0; i < valuesToSend_1.noticeMedicalForms.length; i += 1) {
                        _loop_2(i);
                    }
                    createApiClient()
                        .saveNotice(__assign({ id: id }, valuesToSend_1))
                        .then(function (resp) {
                        var newId = !id || id === 'new' ? resp.data.id : id;
                        message.success('Объявление сохранено!');
                        _this.fetchEntity(newId);
                        // getHistory().push(buildAppRoute(getAppRoute(), `/notices/${newId}`))
                    })
                        .catch(function (error) { return message.error('Ошибка при сохранении объявления'); });
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
        _this.onCommandClick = function (commandId, isReport) {
            createApiClient().runCommand(commandId, [_this.props.match.params.id], isReport);
        };
        _this.createProtocol = function (noticeId) {
            createApiClient()
                .createProtocol(noticeId)
                .then(function () {
                message.success('Протокол сформирован!');
            })
                .catch(function (error) {
                message.error((error.message && error.response.data && error.response.data.Message) || 'Ошибка при формировании протокола');
            });
        };
        _this.handleSelectValueChanged = function (changedFields) {
            var e_1, _a, e_2, _b;
            var fieldsWithSelect = ['name', 'region', 'periodYear'];
            var fieldsWithMultiSelect = ['noticeMedicalTypes', 'noticeMedicalForms'];
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
            var _loop_3 = function (f) {
                if (changedFields.hasOwnProperty(f)) {
                    var propName_1 = f === 'noticeMedicalTypes' ? 'medicalType' : 'medicalForm';
                    rightFieldsData[f] = __assign({}, changedFields[f], { value: _this.extractDictionaryValue(f, changedFields[f].value, true).map(function (i) {
                            var _a;
                            return (_a = {},
                                _a[propName_1] = i,
                                _a);
                        }) });
                }
            };
            try {
                for (var fieldsWithMultiSelect_1 = __values(fieldsWithMultiSelect), fieldsWithMultiSelect_1_1 = fieldsWithMultiSelect_1.next(); !fieldsWithMultiSelect_1_1.done; fieldsWithMultiSelect_1_1 = fieldsWithMultiSelect_1.next()) {
                    var f = fieldsWithMultiSelect_1_1.value;
                    _loop_3(f);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (fieldsWithMultiSelect_1_1 && !fieldsWithMultiSelect_1_1.done && (_b = fieldsWithMultiSelect_1.return)) _b.call(fieldsWithMultiSelect_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return rightFieldsData;
        };
        _this.extractDictionaryValue = function (fieldName, value, multi) {
            if (multi === void 0) { multi = false; }
            var dictPropsName = "" + fieldName + (multi ? '' : 's') + "Dict";
            var allDictData = _this.props[dictPropsName];
            if (!allDictData) {
                allDictData = _this.state[dictPropsName];
            }
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
            _this.props.fetchSingleNotice(id);
        };
        _this.state = {
            fields: _this.convertPropsToEntityDataForState(props),
            periodYearsDict: [],
            valid: false,
        };
        return _this;
    }
    NoticeForm.prototype.componentWillReceiveProps = function (newProps) {
        if (!_.isEqual(this.props.initialValues, newProps.initialValues)) {
            this.setState({
                fields: this.convertPropsToEntityDataForState(newProps),
                valid: true,
            });
        }
    };
    NoticeForm.prototype.componentDidMount = function () {
        var _this = this;
        var id = this.props.match.params.id;
        if (id === 'new') {
            this.props.setNewAd();
        }
        else {
            this.fetchEntity(id);
        }
        createApiClient()
            .fetchDict('periodYear', undefined, false)
            .then(function (r) {
            _this.setState({
                periodYearsDict: r.data.content,
            });
        });
    };
    NoticeForm.prototype.render = function () {
        var _a = this.state, fields = _a.fields, valid = _a.valid, periodYearsDict = _a.periodYearsDict;
        var _b = this.props, fetchSingleNoticeStatus = _b.fetchSingleNoticeStatus, dictsFetching = _b.dictsFetching, match = _b.match;
        var header = 'Объявление';
        if (fetchSingleNoticeStatus === FETCH_ENTITY_STATUS.FETCHING || dictsFetching || !periodYearsDict.length) {
            return React.createElement(ContentLayout, { contentName: header });
        }
        if (fetchSingleNoticeStatus === FETCH_ENTITY_STATUS.IDLE) {
            return null;
        }
        if (fetchSingleNoticeStatus === FETCH_ENTITY_STATUS.FAILED) {
            var modalInfo_1 = CreateOkModalInfo('Ошибка при загрузке объявления', 'Объявление не найдено', function () {
                dispatchCloseRecentModal();
                getHistory().push(buildAppRoute(getAppRoute(), '/notices/all/1'));
            }, undefined, false);
            setTimeout(function () {
                dispatchClearFetchEntityStatus();
                dispatchAddNewModal(modalInfo_1);
            }, 0);
            return null;
        }
        var id = match.params.id;
        var bcRoutes = [
            {
                path: '/',
                breadcrumbName: 'Главная',
            },
            {
                path: 'notices',
                breadcrumbName: 'Все объявления',
            },
            {
                path: id,
                breadcrumbName: id === 'new' ? 'Новое объявление' : 'Объявление',
            },
        ];
        if (id !== 'new') {
            header = "" + (fields.name.value ? fields.name.value.nameRu : 'Объявление') + (fields.region.value ? ". \u0420\u0435\u0433\u0438\u043E\u043D: " + fields.region.value.nameRu : '');
        }
        else {
            header = 'Новое объявление';
        }
        return (React.createElement(ContentLayout, { contentName: header, breadcrumbRoutes: bcRoutes, entity: "notice", disableCommands: id === 'new', showCommands: true, onCommandClick: this.onCommandClick },
            React.createElement(CustomizedForm, __assign({}, fields, { valid: valid, hasApplications: this.state.fields.numberOfApplications.value ? this.state.fields.numberOfApplications.value > 0 : false, isOpen: this.state.fields.status ? this.state.fields.status.value === 'Активно' : false, onChange: this.handleFormChange, handleSubmit: this.handleSubmit, noticeMedicalTypesDict: this.props.noticeMedicalTypesDict, noticeMedicalFormsDict: this.props.noticeMedicalFormsDict, periodYearsDict: this.state.periodYearsDict, regionsDict: this.props.regionsDict, namesDict: this.props.namesDict, createProtocol: this.createProtocol }))));
    };
    NoticeForm.prototype.convertPropsToEntityDataForState = function (props) {
        var data = {
            id: {
                value: undefined,
            },
            name: {
                value: undefined,
            },
            region: {
                value: undefined,
            },
            periodYear: {
                value: undefined,
            },
            dateBegin: {
                value: undefined,
            },
            dateEnd: {
                value: undefined,
            },
            noticeMedicalTypes: {
                value: [],
            },
            noticeMedicalForms: {
                value: [],
            },
            numberOfApplications: {
                value: undefined,
            },
            status: {
                value: undefined,
            },
        };
        if (props.initialValues) {
            for (var key in props.initialValues) {
                if (props.initialValues.hasOwnProperty(key)) {
                    var value = props.initialValues && props.initialValues[key];
                    if (value) {
                        data[key] = {
                            value: value,
                        };
                    }
                }
            }
        }
        return data;
    };
    return NoticeForm;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        initialValues: state.businessDataState.noticeData.currentNotice
            ? __assign({}, state.businessDataState.noticeData.currentNotice, { name: state.businessDataState.noticeData.currentNotice.noticeType, region: state.businessDataState.noticeData.currentNotice.region, dateBegin: moment(state.businessDataState.noticeData.currentNotice.dateBegin, 'DD.MM.YYYY HH:mm'), dateEnd: moment(state.businessDataState.noticeData.currentNotice.dateEnd, 'DD.MM.YYYY HH:mm'), noticeMedicalTypes: state.businessDataState.noticeData.currentNotice.noticeMedicalTypes || [], noticeMedicalForms: state.businessDataState.noticeData.currentNotice.noticeMedicalForms || [] }) : undefined,
        fetchSingleNoticeStatus: state.businessDataState.noticeData.fetchSingleNoticeStatus,
        dictsFetching: state.dictionariesDataState.dictNamesFetching.length > 0,
        noticeMedicalTypesDict: state.dictionariesDataState.medicalType,
        noticeMedicalFormsDict: state.dictionariesDataState.medicalForm,
        namesDict: state.dictionariesDataState.noticeType,
        regionsDict: state.dictionariesDataState.region,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchSingleNotice: function (id) { return dispatch(fetchSingleNotice(id)); },
        setNewAd: function () { return dispatch({ type: SET_NEW_NOTICE_REQUESTED, payload: undefined }); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoticeForm);
//# sourceMappingURL=NoticeForm.js.map