import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AddUserFrom from '../components/users/add-user-form'
import UsersList from '../components/users/user-list'
import { addUser } from '../ducks/user'

class Users extends Component {
  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.usersMenu}
        <Route path="/users/add" render={this.addUserForm} />
        <Route path="/users/list" component={UsersList} />
      </div>
    )
  }

  get usersMenu() {
    return (
      <Fragment>
        <div>
          <NavLink to="/users/add">Add user</NavLink>
        </div>
        <div>
          <NavLink to="/users/list">Users list</NavLink>
        </div>
      </Fragment>
    )
  }

  addUserForm = () => <AddUserFrom onSubmit={this.handleAddUser} />

  handleAddUser = ({ firstName, lastName, email }) => {
    this.props.addUser(firstName, lastName, email)
  }
}

export default connect(
  null,
  {
    addUser
  }
)(Users)
