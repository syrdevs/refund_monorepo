import { Button, Dropdown, Icon } from 'antd';
import React from 'react';
import { CommandMenu } from './CommandMenu';
var CommandsList = function (props) { return (React.createElement(Dropdown, { overlay: React.createElement(CommandMenu, { disabled: props.disabled, handleMenuClick: props.handleMenuClick, items: props.items }) },
    React.createElement(Button, { htmlType: "button", style: { marginLeft: 8 } },
        props.name,
        React.createElement(Icon, { type: "down" })))); };
export default CommandsList;
//# sourceMappingURL=CommandsList.js.map