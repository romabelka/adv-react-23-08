import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import UserList from './user-list'
import { moduleName as usersModule } from '../../ducks/users'
import UserAddForm from './user-add-form'

class UsersArea extends Component {
  handleUserAdd = () => ({}) // TODO: dispatch action
  emailExists = (email) => this.props.users.has(email)

  render() {
    return (
      <Fragment>
        <h3>Users</h3>
        <div>
          <h4>Add new</h4>
          <UserAddForm
            onSubmit={this.handleUserAdd}
            emailExists={this.emailExists}
          />
        </div>
        <div>
          <UserList users={this.props.users} />
        </div>
      </Fragment>
    )
  }
}

export default connect(({ [usersModule]: users }) => ({ users }))(UsersArea)
