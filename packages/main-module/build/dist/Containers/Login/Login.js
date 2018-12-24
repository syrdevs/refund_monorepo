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
import { COLORS } from '@vitacore/shared-ui';
import { Alert, Button, Form, Icon, Input } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../Redux/Actions/userStateActions';
var FormItem = Form.Item;
var LoginLayout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-top: 4px solid ", ";\n"], ["\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-top: 4px solid ", ";\n"])), COLORS.MAIN_GREEN);
var LoginFormContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 40%;\n  background-color: white;\n  border: 1px solid ", ";\n  padding: 20px;\n"], ["\n  max-width: 40%;\n  background-color: white;\n  border: 1px solid ", ";\n  padding: 20px;\n"])), COLORS.GRAY);
var FormAlert = styled(Alert)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  && {\n    margin-bottom: 10px;\n    margin-top: 4px;\n  }\n"], ["\n  && {\n    margin-bottom: 10px;\n    margin-top: 4px;\n  }\n"])));
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _this.props.form.validateFields(function (err, values) {
                if (!err) {
                    _this.props.tryLogin(values, _this.props.redirectTo);
                }
            });
        };
        return _this;
    }
    LoginForm.prototype.render = function () {
        var _a = this.props, loginErrorMessage = _a.loginErrorMessage, getFieldDecorator = _a.form.getFieldDecorator;
        return (React.createElement(LoginLayout, null,
            React.createElement(LoginFormContainer, null,
                React.createElement(Form, { onSubmit: this.handleSubmit },
                    React.createElement(FormItem, { style: { marginBottom: '6px' } }, getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Введите логин!' }],
                    })(React.createElement(Input, { autoFocus: true, prefix: React.createElement(Icon, { type: "user", style: { color: 'rgba(0,0,0,.25)' } }), placeholder: "\u041B\u043E\u0433\u0438\u043D" }))),
                    React.createElement(FormItem, { style: { marginBottom: '6px' } }, getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Введите пароль!' }],
                    })(React.createElement(Input, { prefix: React.createElement(Icon, { type: "lock", style: { color: 'rgba(0,0,0,.25)' } }), type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C" }))),
                    loginErrorMessage && React.createElement(FormAlert, { message: loginErrorMessage, type: "error" }),
                    React.createElement(Button, { type: "primary", htmlType: "submit", block: true }, "\u0412\u043E\u0439\u0442\u0438")))));
    };
    return LoginForm;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        loginErrorMessage: state.userState.loginErrorMessage,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        tryLogin: function (values, redirectTo) {
            dispatch(login(values.userName, values.password, redirectTo));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Login.js.map