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
import { SIZES, WEIGHTS } from '@vitacore/shared-ui';
import { Icon as AntIcon } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../Images/logo.png';
import { getUserLanguage } from '../../utils';
import LanguageSelector from './LanguageSelector';
var HeaderContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-shrink: 0;\n  height: 70px;\n  background-color: white;\n"], ["\n  display: flex;\n  flex-shrink: 0;\n  height: 70px;\n  background-color: white;\n"])));
var LogoContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 220px;\n  align-items: center;\n  justify-content: center;\n\n  & > a.logo-link {\n    display: block;\n\n    img {\n      height: 46px;\n    }\n  }\n"], ["\n  display: flex;\n  width: 220px;\n  align-items: center;\n  justify-content: center;\n\n  & > a.logo-link {\n    display: block;\n\n    img {\n      height: 46px;\n    }\n  }\n"])));
var TopBarContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 20px;\n\n  & > a.register-link {\n    color: #b4b4b4;\n  }\n\n  & > a.login-link {\n    padding: 3px 24px;\n    background-color: #a4b671;\n    color: white;\n    margin-left: 10px;\n    text-decoration: none;\n    display: flex;\n    align-items: center;\n\n    & > .icon {\n      margin-right: 4px;\n    }\n  }\n"], ["\n  display: flex;\n  flex-grow: 1;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 20px;\n\n  & > a.register-link {\n    color: #b4b4b4;\n  }\n\n  & > a.login-link {\n    padding: 3px 24px;\n    background-color: #a4b671;\n    color: white;\n    margin-left: 10px;\n    text-decoration: none;\n    display: flex;\n    align-items: center;\n\n    & > .icon {\n      margin-right: 4px;\n    }\n  }\n"])));
var UserContainer = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var UserInfoContainer = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  margin-right: 6px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  margin-right: 6px;\n"])));
var UserName = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: black;\n  font-size: ", "px;\n  font-weight: ", ";\n"], ["\n  color: black;\n  font-size: ", "px;\n  font-weight: ", ";\n"])), SIZES.s12, WEIGHTS.MEDIUM);
var UserOrganization = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  color: #a2a2a2;\n  font-size: ", "px;\n"], ["\n  color: #a2a2a2;\n  font-size: ", "px;\n"])), SIZES.s12);
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        var userInfoElement = this.props.isUserAuthenticated ? (React.createElement(UserContainer, null,
            React.createElement(UserInfoContainer, null,
                React.createElement(UserName, null, this.props.userData.userName),
                React.createElement(UserOrganization, null, "\u0424\u041D\u0410\u041E \u00AB\u0424\u0421\u041C\u0421\u00BB \u043F\u043E \u0410\u043A\u043C\u043E\u043B\u0438\u043D\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438")),
            React.createElement(Link, { to: '/logout' },
                React.createElement(AntIcon, { type: "logout" })))) : (React.createElement(React.Fragment, null,
            React.createElement(Link, { className: "register-link", to: '/register' }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"),
            React.createElement(Link, { className: "login-link", to: '/login' }, "\u0412\u0445\u043E\u0434")));
        return (React.createElement(HeaderContainer, null,
            React.createElement(LogoContainer, null,
                React.createElement(Link, { className: "logo-link", to: '/' },
                    React.createElement("img", { src: logo }))),
            React.createElement(TopBarContainer, null,
                React.createElement(LanguageSelector, { defaultLanguage: getUserLanguage() }),
                userInfoElement)));
    };
    return Header;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        isUserAuthenticated: state.userState.isAuthenticated && !state.userState.loginInProgress,
        userData: {
            userName: state.userState.user.userName,
        },
    };
};
export default connect(mapStateToProps, null)(Header);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=Header.js.map