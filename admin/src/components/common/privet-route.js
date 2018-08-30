import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends Component {
  static propTypes = {}

  render() {
    const { component, ...rest } = this.props
    return <Route {...rest} render={this.getComponent} />
  }

  getComponent = ({ match }) => {
    return this.props.authorized ? (
      <this.props.component match={match} />
    ) : (
      <Redirect to="/auth" />
    )
  }
}

export default connect(
  (state) => ({
    authorized: !!state.auth.user
  }),
  null,
  null,
  { pure: false }
)(PrivateRoute)
