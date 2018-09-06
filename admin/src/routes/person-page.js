import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPerson, submittingSelector } from '../ducks/people'
import NewPersonForm from '../components/people/new-person-form'
import PeopleList from '../components/people/people-list'

class PersonPage extends Component {
  static propTypes = {}

  render() {
    const { submitting } = this.props

    return (
      <div>
        <h2>Add new person</h2>
        <PeopleList />
        <NewPersonForm onSubmit={this.props.addPerson} disabled={submitting} />
      </div>
    )
  }
}

export default connect(
  (state) => ({ submitting: submittingSelector(state) }),
  { addPerson }
)(PersonPage)
