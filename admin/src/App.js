import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import AuthRoute from './routes/auth'
import AdminRoute from './routes/admin'
import PrivateRoute from './routes/private'

class App extends Component {
  state = {
    isAuth: false
  }

  authStateChanged = (isAuth) => this.setState({ isAuth })

  get menu() {
    const { isAuth } = this.state
    return (
      <Fragment>
        {isAuth && (
          <div>
            <NavLink to="/admin" activeStyle={{ color: 'red' }}>
              admin
            </NavLink>
          </div>
        )}
        <div>
          <NavLink to="/auth" activeStyle={{ color: 'red' }}>
            auth
          </NavLink>
        </div>
      </Fragment>
    )
  }
  render() {
    const { authStateChanged } = this
    return (
      <div>
        <h1>Hello World</h1>
        {this.menu}
        <PrivateRoute
          authenticated={this.state.isAuth}
          path="/admin"
          component={AdminRoute}
        />
        {/* <Route path="/auth" component={AuthRoute } /> */}
        <Route
          path="/auth"
          render={() => <AuthRoute authStateChanged={authStateChanged} />}
        />
      </div>
    )
  }
}

export default App
