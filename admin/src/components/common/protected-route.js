import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
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

export default connect((state) => ({ user: state.auth.user }))(ProtectedRoute)
