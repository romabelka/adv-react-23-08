import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

class ProtectedRoute extends Component {
  render() {
    const { component: Component, user, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(props) =>
          !!user ? <Component {...props} /> : <Redirect to="/auth" />
        }
      />
    )
  }
}

export default connect(({ auth }) => ({ user: auth.get('user', null) }))(
  ProtectedRoute
)
