import { LocaleProvider } from 'antd'
import ruRU from 'antd/lib/locale-provider/ru_RU'
import { ConnectedRouter } from 'connected-react-router'
import moment from 'moment'
import 'moment/locale/ru'
import 'normalize.css'
import React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './i18n'
import './index.css'
import Layout from './Layout/Layout'
import './overrides.css'
import history from './Redux/history'
import store from './Redux/store'

moment.locale('ru')

ReactDOM.render(
  <Provider store={store}>
    <Layout>
      <ConnectedRouter history={history}>
        <LocaleProvider locale={ruRU}>
          <App />
        </LocaleProvider>
      </ConnectedRouter>
    </Layout>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
