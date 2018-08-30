import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import AuthRoute from './routes/auth'
import AdminRoute from './routes/admin'
import ManageUser from './routes/user'
import connect from 'react-redux/es/connect/connect'
import Profile from './routes/profile'


class App extends Component {

  get menu() {
    return (
      <Fragment>
        <div>
          <NavLink to="/admin" activeStyle={{ color: 'red' }}>
            Admin
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth" activeStyle={{ color: 'red' }}>
            Auth
          </NavLink>
        </div>
        <div>
          <NavLink to="/user" activeStyle={{ color: 'red' }}>
            Manage User
          </NavLink>
        </div>
        <div>
          <NavLink to="/profile" activeStyle={{ color: 'red' }}>
            Profile
          </NavLink>
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div>
        <h1>My Awesome App</h1>
        {this.menu}
        <Route path="/admin" component={AdminRoute}/>
        <Route path="/auth" component={AuthRoute}/>
        <Route path="/user" component={ManageUser}/>
        <Route path="/profile" component={Profile}/>
      </div>
    )
  }
}


export default App
