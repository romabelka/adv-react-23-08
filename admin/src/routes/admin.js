import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddUserForm from '../components/users/add-user-form'
import UsersList from '../components/users/users-list'
import { addUser } from '../ducks/users'

class AdminRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Admin</h2>
        <AddUserForm users={this.props.users} onSubmit={this.handleAddUser} />
        <UsersList users={this.props.users} />
      </div>
    )
  }

  handleAddUser = (user) => this.props.addUser(user)
}

export default connect(
  (state) => ({ users: state.users.usersList.toJS() }),
  { addUser }
)(AdminRoute)
