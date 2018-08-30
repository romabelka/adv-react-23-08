import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import AuthRoute from './routes/auth'
import AdminRoute from './routes/admin'
import requireAuth from './components/auth/require-auth'

class App extends Component {
  get menu() {
    return (
      <Fragment>
        <div>
          <NavLink to="/admin" activeStyle={{ color: 'red' }}>
            admin
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth" activeStyle={{ color: 'red' }}>
            auth
          </NavLink>
        </div>
      </Fragment>
    )
  }
  render() {
    return (
      <div>
        {this.menu}
        <Route path="/admin" component={requireAuth(AdminRoute)} />
        <Route path="/auth" component={AuthRoute} />
      </div>
    )
  }
}

export default App
