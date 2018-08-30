import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateUserForm from '../components/user/create-user-form'
import EditUserForm from '../components/user/edit-user-form'
import { createUserAction } from '../ducks/user'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

class ManageUser extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>User Page</h2>
        {this.navMenu}
        <h2>Users list: </h2>
        {this.usersList}
        <Route path="/user/create" render={this.createUserForm}/>
        <Route path="/user/edit" render={this.editUserForm}/>
      </div>
    )
  }

  get usersList() {
    const { user } = this.props
    return user.size > 0 ? <ReactTable data={user.toArray()}
                                       defaultPageSize={5}
                                       columns={[{
                                         columns: [
                                           {
                                             Header: 'First Name',
                                             accessor: 'firstName'
                                           },
                                           {
                                             Header: 'Last Name',
                                             accessor: 'lastName'
                                           },
                                           {
                                             Header: 'Email',
                                             accessor: 'email'
                                           }
                                         ]
                                       }]}
    /> : 'No data available'
  }

  get navMenu() {
    return (
      <Fragment>
        <div>
          <NavLink to="/user/create" activeStyle={{ color: 'red' }}>
            Create user
          </NavLink>
        </div>
        <div>
          <NavLink to="/user/edit" activeStyle={{ color: 'red' }}>
            Edit user
          </NavLink>
        </div>
      </Fragment>
    )
  }

  createUserForm = () => <CreateUserForm onSubmit={this.handleCreateUser}/>
  editUserForm = () => <EditUserForm onSubmit={this.handleEditUser}/>

  handleCreateUser = ({ email, firstName, lastName }) => this.props.createUserAction(email, firstName, lastName)
  handleEditUser = ({ email }) => this.props.editUserFormAction(email)
}

export default connect(
  ({ user }) => ({ user }),
  { createUserAction }
)(ManageUser)
