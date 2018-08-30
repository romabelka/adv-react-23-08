import React, { Component } from 'react'
import { connect } from 'react-redux'

class PeopleList extends Component {
  render() {
    const { people } = this.props
    return (
      <ul>
        {people.map((people, index) => (
          <li key={index}>{`${people.firstName} ${people.lastName} ${
            people.email
          }`}</li>
        ))}
      </ul>
    )
  }
}

export default connect(({ people }) => ({ people }))(PeopleList)
