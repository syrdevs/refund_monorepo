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
import { COLORS, SIZES } from '@vitacore/shared-ui';
import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import fakeLogo from '../../Images/logo.png';
var AppTilesContainers = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex-grow: 1;\n  flex-direction: column;\n  padding: 10px 25px;\n  border-top: 4px solid ", ";\n"], ["\n  flex-grow: 1;\n  flex-direction: column;\n  padding: 10px 25px;\n  border-top: 4px solid ", ";\n"])), COLORS.MAIN_GREEN);
var AppTilesHeader = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border-bottom: 1px solid ", ";\n  padding: 5px 0 10px;\n  font-size: 24px;\n  margin-bottom: 1em;\n"], ["\n  border-bottom: 1px solid ", ";\n  padding: 5px 0 10px;\n  font-size: 24px;\n  margin-bottom: 1em;\n"])), COLORS.LIGHTER_GRAY);
var AppTile = styled(Link)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 10px 10px 6px;\n  border: 1px solid ", ";\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n\n  & > img {\n    width: 100%;\n    max-width: 200px;\n    height: auto;\n    max-height: 200px;\n  }\n\n  & > p {\n    flex-shrink: 0;\n    font-size: ", "px;\n    font-weight: 600;\n    margin-top: 10px;\n    border-top: 1px solid ", ";\n    padding-top: 4px;\n    text-align: center;\n  }\n"], ["\n  padding: 10px 10px 6px;\n  border: 1px solid ", ";\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n\n  & > img {\n    width: 100%;\n    max-width: 200px;\n    height: auto;\n    max-height: 200px;\n  }\n\n  & > p {\n    flex-shrink: 0;\n    font-size: ", "px;\n    font-weight: 600;\n    margin-top: 10px;\n    border-top: 1px solid ", ";\n    padding-top: 4px;\n    text-align: center;\n  }\n"])), COLORS.LIGHTER_GRAY, SIZES.s18, COLORS.LIGHTER_GRAY);
var MainContainer = /** @class */ (function (_super) {
    __extends(MainContainer, _super);
    function MainContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainContainer.prototype.render = function () {
        return (React.createElement(AppTilesContainers, null,
            React.createElement(AppTilesHeader, null, "\u041C\u043E\u0434\u0443\u043B\u0438"),
            React.createElement(Row, { gutter: 24 },
                React.createElement(Col, { span: 4 },
                    React.createElement(AppTile, { to: "/zakup" },
                        React.createElement("img", { src: fakeLogo, alt: "Zakup application logo" }),
                        React.createElement("p", null, "\u0417\u0430\u043A\u0443\u043F\u044B"))),
                React.createElement(Col, { span: 4 },
                    React.createElement(AppTile, { to: "/contracts" },
                        React.createElement("img", { src: fakeLogo, alt: "Zakup application logo" }),
                        React.createElement("p", null, "\u0414\u043E\u0433\u043E\u0432\u043E\u0440\u0430"))),
                React.createElement(Col, { span: 4 },
                    React.createElement(AppTile, { to: "/test2" },
                        React.createElement("img", { src: fakeLogo, alt: "Zakup application logo" }),
                        React.createElement("p", null, "\u041E\u0442\u0447\u0435\u0442\u044B"))),
                React.createElement(Col, { span: 4 },
                    React.createElement(AppTile, { to: "/refunds" },
                        React.createElement("img", { src: fakeLogo, alt: "\u0412\u043E\u0437\u0432\u0440\u0430\u0442\u044B" }),
                        React.createElement("p", null, "\u0412\u043E\u0437\u0432\u0440\u0430\u0442\u044B"))))));
    };
    return MainContainer;
}(React.Component));
export default MainContainer;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=MainContainer.js.map