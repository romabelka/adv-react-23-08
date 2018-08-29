import React, { Component } from 'react'
import { connect } from 'react-redux'

import PersonForm from '../components/person/person-form'
import { addPerson } from '../ducks/person'

class PersonsRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Persons</h2>
        <PersonForm onSubmit={this.handleSubmit} />
      </div>
    )
  }

  handleSubmit = ({ firstName, lastName, email }) =>
    this.props.addPerson(firstName, lastName, email)
}

export default connect(
  null,
  { addPerson }
)(PersonsRoute)
