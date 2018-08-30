import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp, signIn } from '../ducks/auth'
import { addPerson } from '../ducks/people'
import AddPersonForm from '../components/people/add-person-form'

class PeopleRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>People</h1>
        <Route path="/people" render={this.addPersonForm} />
      </div>
    )
  }

  addPersonForm = () => <AddPersonForm onSubmit={this.handleAddPerson} />

  handleAddPerson = ({ firstName, lastName, email }) =>
    this.props.addPerson(firstName, lastName, email)
}

export default connect(
  null,
  { addPerson }
)(PeopleRoute)
