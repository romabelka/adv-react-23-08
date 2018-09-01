import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAuthorizedSelector } from '../../ducks/auth'

class ProtectedRoute extends Component {
  render() {
    const { component: Component, isAuthorized, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthorized ? <Component {...props} /> : <h1>Not Authorized</h1>
        }
      />
    )
  }
}

export default connect((state) => ({
  isAuthorized: isAuthorizedSelector(state)
}))(ProtectedRoute)
