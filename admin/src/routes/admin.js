import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { moduleName as authModule } from '../ducks/auth'

class AdminRoute extends Component {
  static propTypes = {}

  get authorized() {
    return !!this.props.user
  }

  render() {
    if (this.authorized) {
      return (
        <div>
          <h2>Admin</h2>
        </div>
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

export default connect(({ [authModule]: auth }) => ({ user: auth.user }))(
  AdminRoute
)
