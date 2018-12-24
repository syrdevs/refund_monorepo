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
import { Button, Col, DatePicker, Form, Input, message, Row, Select } from 'antd';
import * as _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import CreateOkModalInfo from '../../Components/Modals/OkModalInfo';
import { dispatchClearFetchEntityStatus, fetchSingleCommission, findPersonByIIN, } from '../../Redux/Actions/businessDataStateActions';
import { dispatchAddNewModal, dispatchCloseRecentModal } from '../../Redux/Actions/infrastructureStateActions';
import { FETCH_ENTITY_STATUS } from '../../Redux/Constants/businessDataStateConstants';
import { getHistory } from '../../Redux/history';
import { createApiClient, getAppRoute, isDisabledNextDate, isDisabledPreviousDate } from '../../utils';
import { CommonFormItemLayout, ContentLayout } from '../shared';
var FormItem = Form.Item;
var Option = Select.Option;
var Search = Input.Search;
var CustomizedForm = Form.create({
    onFieldsChange: function (props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields: function (props) {
        return {
            firstName: Form.createFormField(__assign({}, props.firstName)),
            lastName: Form.createFormField(__assign({}, props.lastName)),
            patronymic: Form.createFormField(__assign({}, props.patronymic)),
            iin: Form.createFormField(__assign({}, props.iin)),
            birthdate: Form.createFormField(__assign({}, props.birthdate)),
            workPlace: Form.createFormField(__assign({}, props.workPlace)),
            dateBegin: Form.createFormField(__assign({}, props.dateBegin)),
            dateEnd: Form.createFormField(__assign({}, props.dateEnd)),
            meetingMemberRole: Form.createFormField(__assign({}, props.meetingMemberRole, { value: props.meetingMemberRole.value ? props.meetingMemberRole.value.id : '' })),
        };
    },
})(function (props) {
    var getFieldDecorator = props.form.getFieldDecorator;
    return (React.createElement(Form, { onSubmit: props.handleSubmit(props.form), style: { display: 'flex', flexDirection: 'column' } },
        React.createElement(Row, null,
            React.createElement(Col, { xs: { span: 24 }, sm: { span: 16, offset: 8 } },
                React.createElement(Search, { placeholder: "\u0418\u0418\u041D", onSearch: function (value) { return props.findPersonByIIN(value); } }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0418\u043C\u044F" }, CommonFormItemLayout), getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Input, { disabled: true }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F" }, CommonFormItemLayout), getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Input, { disabled: true }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E (\u0435\u0441\u043B\u0438 \u0435\u0441\u0442\u044C)" }, CommonFormItemLayout), getFieldDecorator('patronymic')(React.createElement(Input, { disabled: true }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0418\u0418\u041D" }, CommonFormItemLayout), getFieldDecorator('iin', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Input, { disabled: true }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F" }, CommonFormItemLayout), getFieldDecorator('birthdate', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(DatePicker, { format: "DD.MM.YYYY", disabledDate: isDisabledNextDate }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B" }, CommonFormItemLayout), getFieldDecorator('workPlace', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Input, null))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u0432 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438" }, CommonFormItemLayout), getFieldDecorator('dateBegin', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(DatePicker, { format: "DD.MM.YYYY", disabledDate: isDisabledPreviousDate }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0414\u0430\u0442\u0430 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0432 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438" }, CommonFormItemLayout), getFieldDecorator('dateEnd')(React.createElement(DatePicker, { format: "DD.MM.YYYY", disabledDate: isDisabledPreviousDate }))),
        React.createElement(FormItem, __assign({ style: { marginBottom: '0', flexShrink: 0 }, label: "\u0420\u043E\u043B\u044C \u0432 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438" }, CommonFormItemLayout), getFieldDecorator('meetingMemberRole', {
            rules: [{ required: true, message: 'Поле обязательно для заполнения' }],
        })(React.createElement(Select, null, props.meetingMemberRolesDict.map(function (option) {
            return React.createElement(Option, { key: option.id }, option.nameRu);
        })))),
        React.createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '10px', flexShrink: 0 } },
            React.createElement(Button, { type: "primary", htmlType: "submit", disabled: !props.valid }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))));
});
var CommissionMemberForm = /** @class */ (function (_super) {
    __extends(CommissionMemberForm, _super);
    function CommissionMemberForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSubmit = function (form) { return function (e) {
            e.preventDefault();
            form.validateFields(function (err, values) {
                // const id = this.state.fields.id.value
                if (!err) {
                    var isNew = _this.props.match.params.id === 'new';
                    console.log(_this.props.initialValues);
                    var updatedOrNewMeetingMember = {
                        person: {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            patronymic: values.patronymic,
                            birthdate: values.birthdate.format('DD.MM.YYYY'),
                            workPlace: values.workPlace,
                            sex: {
                                id: _this.props.initialValues.sex.id,
                            },
                        },
                        dateBegin: values.dateBegin.format('DD.MM.YYYY'),
                        dateEnd: values.dateEnd ? values.dateEnd.format('DD.MM.YYYY') : null,
                        meetingMemberRole: {
                            id: values.meetingMemberRole,
                        },
                    };
                    if (!isNew) {
                        updatedOrNewMeetingMember['id'] = _this.props.match.params.id;
                    }
                    var meetingMembers = (isNew
                        ? __spread(_this.props.currentCommission.meetingMembers.map(function (i) { return ({ id: i.id }); }), [updatedOrNewMeetingMember]) : __spread(_this.props
                        .currentCommission.meetingMembers.filter(function (i) { return i.id !== _this.props.match.params.id; })
                        .map(function (i) { return ({ id: i.id }); }), [
                        updatedOrNewMeetingMember,
                    ]));
                    var updatedCommission = __assign({}, _this.props.currentCommission, { dateBegin: _this.props.currentCommission.dateBegin, region: _this.props.currentCommission.region.id, meetingMembers: meetingMembers });
                    createApiClient()
                        .saveCommission(updatedCommission)
                        .then(function () {
                        message.success('Член комиссии сохранен!');
                        getHistory().push(buildAppRoute(getAppRoute(), "/commissions/" + _this.props.match.params.commissionId + "/members"));
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
            var fieldsWithSelect = ['meetingMemberRole'];
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
        _this.findPersonByIIN = function (value) {
            _this.setState({
                lastIINSearched: value,
            }, function () { return _this.props.findPersonByIIN(value); });
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
    CommissionMemberForm.prototype.componentWillReceiveProps = function (newProps) {
        if (!_.isEqual(this.props.initialValues, newProps.initialValues) ||
            (!this.props.personFound && newProps.personFound)) {
            var newInitialValues = newProps.personFound
                ? __assign({}, newProps.initialValues, __assign({}, newProps.personFound, { birthdate: moment(newProps.personFound.birthdate), iin: newProps.personFound.iin || this.state.lastIINSearched }))
                : __assign({}, newProps.initialValues);
            var propsUpdated = __assign({}, newProps, { initialValues: newInitialValues });
            this.setState({
                fields: this.convertPropsToEntityDataForState(propsUpdated),
            });
        }
    };
    CommissionMemberForm.prototype.componentDidMount = function () {
        var commissionId = this.props.match.params.commissionId;
        if (!this.props.initialValues) {
            this.fetchEntity(commissionId);
        }
    };
    CommissionMemberForm.prototype.render = function () {
        var _a = this.state, fields = _a.fields, valid = _a.valid;
        var _b = this.props, fetchSingleCommissionStatus = _b.fetchSingleCommissionStatus, dictsFetching = _b.dictsFetching, match = _b.match;
        if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.FETCHING || dictsFetching) {
            return React.createElement(ContentLayout, { contentName: "\u041A\u043E\u043C\u0438\u0441\u0441\u0438\u044F" });
        }
        if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.IDLE) {
            return null;
        }
        if (fetchSingleCommissionStatus === FETCH_ENTITY_STATUS.FAILED) {
            var modalInfo_1 = CreateOkModalInfo('Ошибка при загрузке комиссии', 'Комиссия не найдена', function () {
                dispatchCloseRecentModal();
                getHistory().push(buildAppRoute(getAppRoute(), '/commissions/all'));
            }, undefined, false);
            setTimeout(function () {
                dispatchClearFetchEntityStatus();
                dispatchAddNewModal(modalInfo_1);
            }, 0);
            return null;
        }
        var _c = match.params, commissionId = _c.commissionId, id = _c.id;
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
                path: commissionId + "/members",
                breadcrumbName: 'Члены комиссии',
            },
            {
                path: id,
                breadcrumbName: id === 'new' ? 'Новый член комиссии' : 'Информация о члене комиссии',
            },
        ];
        return (React.createElement(ContentLayout, { contentName: "\u0427\u043B\u0435\u043D \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0438", breadcrumbRoutes: bcRoutes },
            React.createElement(CustomizedForm, __assign({}, fields, { valid: valid, onChange: this.handleFormChange, handleSubmit: this.handleSubmit, findPersonByIIN: this.findPersonByIIN, meetingMemberRolesDict: this.props.meetingMemberRolesDict }))));
    };
    CommissionMemberForm.prototype.convertPropsToEntityDataForState = function (props) {
        var data = {
            id: {
                value: undefined,
            },
            firstName: {
                value: undefined,
            },
            lastName: {
                value: undefined,
            },
            patronymic: {
                value: undefined,
            },
            iin: {
                value: undefined,
            },
            birthdate: {
                value: undefined,
            },
            workPlace: {
                value: undefined,
            },
            dateBegin: {
                value: undefined,
            },
            dateEnd: {
                value: undefined,
            },
            meetingMemberRole: {
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
    return CommissionMemberForm;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    var allMembers = state.businessDataState.commissionsData.currentCommission &&
        state.businessDataState.commissionsData.currentCommission.meetingMembers;
    var currentMember = allMembers && allMembers.find(function (i) { return i.id === ownProps.match.params.id; });
    return {
        initialValues: currentMember
            ? __assign({}, currentMember.person, { birthdate: moment(currentMember.person.birthdate), dateBegin: moment(currentMember.dateBegin, 'DD.MM.YYYY'), dateEnd: moment(currentMember.dateEnd, 'DD.MM.YYYY'), meetingMemberRole: currentMember.meetingMemberRole }) : undefined,
        currentCommission: state.businessDataState.commissionsData.currentCommission,
        personFound: state.businessDataState.commissionsData.personFound,
        fetchSingleCommissionStatus: state.businessDataState.commissionsData.fetchSingleCommissionStatus,
        dictsFetching: state.dictionariesDataState.dictNamesFetching.length > 0,
        meetingMemberRolesDict: state.dictionariesDataState.meetingMemberRole,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        fetchSingleCommission: function (id) { return dispatch(fetchSingleCommission(id)); },
        findPersonByIIN: function (iin) { return dispatch(findPersonByIIN(iin)); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommissionMemberForm);
//# sourceMappingURL=CommissionMemberForm.js.map