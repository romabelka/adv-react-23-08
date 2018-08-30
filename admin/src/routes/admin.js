import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddUserForm from '../components/admin/add-user-form'
import { addUser } from '../ducks/admin'

class AdminRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Admin</h2>
        <hr />
        <AddUserForm onSubmit={this.handleUser} />
      </div>
    )
  }

  handleUser = ({ firstName, lastName, email }) =>
    this.props.addUser(email, firstName, lastName)
}

export default connect(
  null,
  { addUser }
)(AdminRoute)
