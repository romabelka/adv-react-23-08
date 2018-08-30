import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { NavLink, Route } from 'react-router-dom'
import AddUserForm from '../components/admin/add-user-form'
import Table from '../components/common/table'
import { addUser } from '../ducks/admin'

class AdminRoute extends Component {
  static propTypes = {}

  get navMenu() {
    return (
      <div>
        <NavLink to="/admin/adduser" activeStyle={{ color: 'red' }}>
          Add User
        </NavLink>
      </div>
    )
  }

  addUserForm = () => <AddUserForm onSubmit={this.handleAddUser} />
  handleAddUser = (form) => {
    debugger
    console.log(form)
    this.props.dispatch(addUser(form))
    this.props.dispatch(reset('addUser'))
  }

  render() {
    return (
      <div>
        <h2>Admin</h2>
        {this.navMenu}
        <Route path="/admin/adduser" render={this.addUserForm} />
        <Table data={this.props.admin.users} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { admin } = state
  return { admin }
}

export default connect(mapStateToProps)(AdminRoute)
