import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class AdminRoute extends Component {
  static propTypes = {}

  render() {
    const { user } = this.props.auth

    if (!user) {
      return <Redirect to="/auth" />
    }

    return (
      <div>
        <h2>Admin</h2>
        <p>{user ? `Signed in with email ${user.email}` : 'Not signed in'}</p>
      </div>
    )
  }
}

export default connect((store) => ({ auth: store.auth }))(AdminRoute)
