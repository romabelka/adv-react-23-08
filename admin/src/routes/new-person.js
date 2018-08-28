import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewPersonForm from '../components/people/new-person-form'
import { createPerson } from '../ducks/people'

class NewPersonRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h3>Create New Person</h3>
        <NewPersonForm onSubmit={this.handleCreatePerson} />
      </div>
    )
  }

  handleCreatePerson = ({ firstName, lastName, email }) =>
    this.props.createPerson(firstName, lastName, email)
}

export default connect(
  null,
  { createPerson }
)(NewPersonRoute)
