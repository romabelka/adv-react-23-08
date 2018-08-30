import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { moduleName as authModule } from '../ducks/auth'
import UsersArea from '../components/users/users-area'

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
          <UsersArea />
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

export default connect(({ [authModule]: auth }) => ({
  currentUser: auth.user
}))(AdminRoute)
