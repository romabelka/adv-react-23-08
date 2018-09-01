import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp, signIn } from '../ducks/auth'
import { addPerson } from '../ducks/people'
import AddPersonForm from '../components/people/add-person-form'
import PeopleList from '../components/people/people-list'

class PeopleRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>People</h1>
        <PeopleList />
        <AddPersonForm onSubmit={this.props.addPerson} />
      </div>
    )
  }
}

export default connect(
  null,
  { addPerson }
)(PeopleRoute)
