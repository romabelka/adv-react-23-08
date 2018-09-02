import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import AuthRoute from './routes/auth'
import AdminRoute from './routes/admin'
import PeopleRoute from './routes/person-page'
import EventRoute from './routes/event-page'

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
        <div>
          <NavLink to="/events" activeStyle={{ color: 'red' }}>
            events
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
        <Route path="/people" component={PeopleRoute} />
        <Route path="/events" component={EventRoute} />
      </div>
    )
  }
}

export default App
