import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import AuthRoute from './routes/auth'
import AdminRoute from './routes/admin'
import PersonsRoute from './routes/persons'

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
        <div>
          <NavLink to="/persons" activeStyle={{ color: 'red' }}>
            persons
          </NavLink>
        </div>
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
        <Route path="/persons" component={PersonsRoute} />
      </div>
    )
  }
}

export default App
