import React, { Component } from 'react'
import { connect } from 'react-redux'

import PersonForm from '../components/person/person-form'
import PersonList from '../components/person/person-list'
import { addPerson } from '../ducks/person'

class PersonsRoute extends Component {
  static propTypes = {}

  render() {
    const { data } = this.props

    return (
      <div>
        <h2>Persons</h2>
        <PersonForm onSubmit={this.handleSubmit} />
        <PersonList data={data} />
      </div>
    )
  }

  handleSubmit = ({ firstName, lastName, email }) =>
    this.props.addPerson(firstName, lastName, email)
}

export default connect(
  (state) => ({ data: state.person }),
  { addPerson }
)(PersonsRoute)
