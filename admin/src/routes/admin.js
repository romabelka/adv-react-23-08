import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { moduleName as authModule } from '../ducks/auth'
import { moduleName as usersModule } from '../ducks/users'
import UserList from '../components/users/user-list'

class AdminRoute extends Component {
  static propTypes = {}

  // TODO: extract into HOC
  get authorized() {
    return !!this.props.currentUser
  }

  render() {
    if (this.authorized) {
      return (
        <Fragment>
          <h2>Admin</h2>
          <h3>Users</h3>
          <UserList users={this.props.users} />
        </Fragment>
      )
    } else {
      return (
        <Redirect
          to={{
            pathname: '/auth',
            state: {
              error: { message: "You're not authorized to access this page" }
            }
          }}
        />
      )
    }
  }
}

export default connect(({ [authModule]: auth, [usersModule]: users }) => ({
  currentUser: auth.user,
  users
}))(AdminRoute)
