import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AddPersonForm from '../components/auth/add-person-form'
import { addPerson } from '../ducks/admin'

class AdminRoute extends Component {
  static propTypes = {}

  render() {
    const {
      props: { users },
      navMenu,
      addPersonForm,
      personList
    } = this
    return (
      <div>
        <h2>Admin</h2>
        {navMenu}
        <Route path="/admin/add-person" render={addPersonForm} />
        {users && !!users.size && personList}
      </div>
    )
  }

  get navMenu() {
    return (
      <div>
        <NavLink to="/admin/add-person" activeStyle={{ color: 'red' }}>
          Add Person
        </NavLink>
      </div>
    )
  }

  get personList() {
    const { users } = this.props
    return (
      <Fragment>
        {users &&
          !!users.size &&
          [...users].map((user, index) => (
            <div key={index}>
              <h3>{`Person #${index}`}</h3>
              <div>First Name: {user.firstName}</div>
              <div>Last Name: {user.lastName}</div>
              <div>Email: {user.email}</div>
            </div>
          ))}
      </Fragment>
    )
  }

  addPersonForm = () => <AddPersonForm onSubmit={this.handleAddPerson} />

  handleAddPerson = ({ firstName, lastName, email }) =>
    this.props.addPerson(firstName, lastName, email)
}

export default connect(
  (state) => ({
    users: state.admin
  }),
  { addPerson }
)(AdminRoute)
