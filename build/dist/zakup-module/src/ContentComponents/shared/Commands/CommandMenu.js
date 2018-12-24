import { Menu } from 'antd';
import React from 'react';
export var CommandMenu = function (props) { return (React.createElement(Menu, { style: { boxShadow: '0 0 4px 0 #cecece' }, onClick: props.handleMenuClick }, props.items.map(function (i) { return (React.createElement(Menu.Item, { disabled: props.disabled, key: i.id }, i.name)); }))); };
//# sourceMappingURL=CommandMenu.js.map