import React, { Component, Fragment } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import AuthRoute from './routes/auth'
import AdminRoute from './routes/admin'
import PeopleRoute from './routes/people'
import ProtectedRoute from './components/common/protected-route'

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
          <NavLink to="/people" activeStyle={{ color: 'red' }}>
            people
          </NavLink>
        </div>
      </Fragment>
    )
  }
  render() {
    return (
      <Switch>
        <Fragment>
          <h1>Hello World</h1>
          {this.menu}
          <ProtectedRoute path="/admin" component={AdminRoute} />
          <Route path="/auth" component={AuthRoute} />
          <Route path="/people" component={PeopleRoute} />
        </Fragment>
      </Switch>
    )
  }
}

export default App
