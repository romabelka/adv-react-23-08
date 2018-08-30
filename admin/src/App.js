import React, { Component, Fragment } from 'react'
import { Route, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthRoute from './routes/auth'
import AdminRoute from './routes/admin'
import ProtectedRoute from './routes/protected-route'

class App extends Component {
  get adminLink() {
    return (
      <div>
        <NavLink to="/admin" activeStyle={{ color: 'red' }}>
          admin
        </NavLink>
      </div>
    )
  }

  get authLink() {
    return (
      <div>
        <NavLink to="/auth" activeStyle={{ color: 'red' }}>
          auth
        </NavLink>
      </div>
    )
  }

  get menu() {
    return (
      <Fragment>
        {this.props.user ? this.adminLink : null}
        {this.props.user ? null : this.authLink}
      </Fragment>
    )
  }
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        {this.menu}
        <ProtectedRoute path="/admin" component={AdminRoute} />
        <Route path="/auth" component={AuthRoute} />
      </div>
    )
  }
}

export default withRouter(connect((state) => ({ user: state.auth.user }))(App))
