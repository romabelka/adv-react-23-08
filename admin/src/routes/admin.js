import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Redirect } from 'react-router-dom'

class AdminRoute extends Component {
  static propTypes = {}

  checkIsAdmin() {
    const { currentUsers, users } = this.props
    const currentUserEmail = (currentUsers && currentUsers.user && currentUsers.user.email) || null
    const usersArray = (users && users.toArray()) || []
    if (!currentUserEmail) return false
    const targetUsersCred = usersArray.find((item) => currentUserEmail === item.email)
    return targetUsersCred ? targetUsersCred.isAdmin : false
  }

  render() {
    console.log(this);

    return this.checkIsAdmin() ?
      (<div>
        <h2>I am Admin</h2>
      </div>)
      : <Redirect to={'/'} />

  }
}

export default connect(
  ({ auth, user }) => ({ currentUsers: auth, users: user }),
  null
)(AdminRoute)
