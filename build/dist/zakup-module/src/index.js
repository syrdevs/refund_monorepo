import React from 'react';
import * as ReactDOM from 'react-dom';
import { default as ZakupModule } from './App';
var writeInDOM = process.env.REACT_APP_ENV === 'development';
if (writeInDOM) {
    ReactDOM.render(React.createElement(ZakupModule, { appRoute: "" }), document.getElementById('root'));
}
export default ZakupModule;
export { default as LeftMenuItems } from './Data/leftMenuItems';
//# sourceMappingURL=index.js.map