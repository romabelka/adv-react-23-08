import React, { Component, Fragment } from 'react'
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
        {this.navMenu}
        <Route path="/people/people-list" render={this.peopleList} />
        <Route path="/people/add-person" render={this.addPersonForm} />
      </div>
    )
  }

  get navMenu() {
    return (
      <Fragment>
        <div>
          <NavLink to="/people/people-list" activeStyle={{ color: 'red' }}>
            People
          </NavLink>
        </div>
        <div>
          <NavLink to="/people/add-person" activeStyle={{ color: 'red' }}>
            Add New Person
          </NavLink>
        </div>
      </Fragment>
    )
  }

  addPersonForm = () => <AddPersonForm onSubmit={this.handleAddPerson} />

  peopleList = () => <PeopleList />

  handleAddPerson = ({ firstName, lastName, email }) =>
    this.props.addPerson(firstName, lastName, email)
}

export default connect(
  null,
  { addPerson }
)(PeopleRoute)
