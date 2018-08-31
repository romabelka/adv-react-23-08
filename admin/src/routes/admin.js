import React, { Component, Fragment } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import AddUserForm from '../components/user/add-user'
import { connect } from 'react-redux'
import { addUser } from '../ducks/users'
import UserList from '../components/user/show-users'

class AdminRoute extends Component {
  render() {
    return (
      <div>
        <h2>Admin</h2>
        {this.menu}
        <Switch>
          <Route path="/admin/adduser" render={this.addUserForm} />
          <Route path="/admin/users" render={this.userList} />
        </Switch>
      </div>
    )
  }

  addUserForm = () => {
    return <AddUserForm onSubmit={this.handleSubmit} />
  }

  userList = () => {
    return <UserList />
  }

  get menu() {
    return (
      <Fragment>
        <div>
          <NavLink to="/admin/adduser" activeStyle={{ color: 'green' }}>
            Add User
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/users" activeStyle={{ color: 'green' }}>
            Users
          </NavLink>
        </div>
      </Fragment>
    )
  }

  handleSubmit = ({ firstName, lastName, email }) => {
    this.props.addUser(firstName, lastName, email)
  }
}

export default connect(
  null,
  { addUser }
)(AdminRoute)
