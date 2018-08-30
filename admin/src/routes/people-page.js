import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddNewPersonForm from '../components/admin/add-new-person'
import PeopleList from '../components/admin/people-list'
import { addPerson } from '../ducks/people'

class PeoplePage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>People page</h1>
        <AddNewPersonForm onSubmit={this.handleAddNewPerson} />
        <PeopleList />
      </div>
    )
  }

  handleAddNewPerson = ({ fistName, lastName, email }) =>
    this.props.addPerson(fistName, lastName, email)
}

export default connect(
  null,
  { addPerson }
)(PeoplePage)
