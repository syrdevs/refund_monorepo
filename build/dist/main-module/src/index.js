import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import { ConnectedRouter } from 'connected-react-router';
import moment from 'moment';
import 'moment/locale/ru';
import 'normalize.css';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './i18n';
import './index.css';
import Layout from './Layout/Layout';
import './overrides.css';
import history from './Redux/history';
import store from './Redux/store';
moment.locale('ru');
ReactDOM.render(React.createElement(Provider, { store: store },
    React.createElement(Layout, null,
        React.createElement(ConnectedRouter, { history: history },
            React.createElement(LocaleProvider, { locale: ruRU },
                React.createElement(App, null))))), document.getElementById('root'));
//# sourceMappingURL=index.js.map