import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddUserForm from '../components/admin/add-user-form'
import { addUser, getUsers } from '../ducks/admin'

class AdminRoute extends Component {
  static propTypes = {}

  render() {
    debugger
    return (
      <div>
        <h2>Admin</h2>
        <ul>
          {this.props.users.toArray().map((user) => (
            <li key={user.email}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
        <AddUserForm onSubmit={this.handleUser} />
      </div>
    )
  }

  handleUser = ({ firstName, lastName, email }) =>
    this.props.addUser(firstName, lastName, email)
}

export default connect(
  (state) => ({
    users: getUsers(state)
  }),
  { addUser }
)(AdminRoute)
