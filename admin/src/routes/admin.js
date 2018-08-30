import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import PeoplePage from './people-page'

class AdminRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Admin</h2>
        {this.navMenu}
        <Route path="/admin/people" component={PeoplePage} />
      </div>
    )
  }

  get navMenu() {
    return (
      <Fragment>
        <div>
          <NavLink to="/admin/people" activeStyle={{ color: 'red' }}>
            People
          </NavLink>
        </div>
      </Fragment>
    )
  }
}

export default AdminRoute
