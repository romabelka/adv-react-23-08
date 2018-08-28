import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AdminRoute extends Component {
  static propTypes = {}

  render() {
    if (this.props.currentUser)
      return (
        <div>
          <h2>Admin</h2>
        </div>
      )
    return <Redirect to="/auth/sign-in" />
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.auth.user }
}

export default connect(mapStateToProps)(AdminRoute)
