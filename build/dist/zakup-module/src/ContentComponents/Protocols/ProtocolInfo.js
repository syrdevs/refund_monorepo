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
import { Col, Input } from 'antd';
import React from 'react';
import { CommonFormItemLayout, LabelColStyled, RowStyled } from '../shared';
var ProtocolInfo = function (props) { return (React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
    React.createElement(RowStyled, null,
        React.createElement(LabelColStyled, __assign({}, CommonFormItemLayout.labelCol), "\u041F\u043B\u0430\u043D\u043E\u0432\u044B\u0439 \u043F\u0435\u0440\u0438\u043E\u0434"),
        React.createElement(Col, __assign({}, CommonFormItemLayout.wrapperCol),
            React.createElement(Input, { disabled: true, value: props.periodYear.year }))),
    React.createElement(RowStyled, null,
        React.createElement(LabelColStyled, __assign({}, CommonFormItemLayout.labelCol), "\u0420\u0435\u0433\u0438\u043E\u043D"),
        React.createElement(Col, __assign({}, CommonFormItemLayout.wrapperCol),
            React.createElement(Input, { disabled: true, value: props.region.nameRu }))),
    React.createElement(RowStyled, null,
        React.createElement(LabelColStyled, __assign({}, CommonFormItemLayout.labelCol), "\u0422\u0438\u043F"),
        React.createElement(Col, __assign({}, CommonFormItemLayout.wrapperCol),
            React.createElement(Input, { disabled: true, value: props.planProtocolType.nameRu }))),
    React.createElement(RowStyled, null,
        React.createElement(LabelColStyled, __assign({}, CommonFormItemLayout.labelCol), "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440"),
        React.createElement(Col, __assign({}, CommonFormItemLayout.wrapperCol),
            React.createElement(Input, { disabled: true, value: props.number }))),
    React.createElement(RowStyled, null,
        React.createElement(LabelColStyled, __assign({}, CommonFormItemLayout.labelCol), "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"),
        React.createElement(Col, __assign({}, CommonFormItemLayout.wrapperCol),
            React.createElement(Input, { disabled: true, value: props.descr }))),
    React.createElement(RowStyled, null,
        React.createElement(LabelColStyled, __assign({}, CommonFormItemLayout.labelCol), "\u0414\u0430\u0442\u0430"),
        React.createElement(Col, __assign({}, CommonFormItemLayout.wrapperCol),
            React.createElement(Input, { disabled: true, value: props.documentDate }))))); };
export default ProtocolInfo;
//# sourceMappingURL=ProtocolInfo.js.map