import React from 'react'
import { Link } from 'react-router-dom'

import './index.less'


class UserLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <div className="title">
          单点登录成功！ ----   product--product--product
        </div>
        <div>
          <ul className="menu">
            <li><Link to="/product">product</Link></li>
            <li><Link to="/area">area</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default UserLayout
