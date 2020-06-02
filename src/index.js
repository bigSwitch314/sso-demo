import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Area from './pages/Area'
import Product from './pages/Product'
import './styles/index.less'

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <Router>
        <Redirect path="/" to="/product" />
        <Route path="/area" component={Area} />
        <Route path="/product" component={Product} />
      </Router>
    </LocaleProvider>
  </Provider>,
  document.getElementById('home-root')
)
