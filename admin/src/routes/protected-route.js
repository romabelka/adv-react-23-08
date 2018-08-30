import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

class ProtectedRoute extends Component {
  render() {
    const { component, ...rest } = this.props
    return <Route {...rest} render={this.routeRenderer} />
  }

  routeRenderer = (props) => {
    const { component: Component, ...rest } = this.props
    return this.props.user ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/auth" />
    )
  }
}

export default withRouter(
  connect((state) => ({ user: state.auth.user }))(ProtectedRoute)
)
