import React, { Component } from 'react'
import { connect } from 'react-redux'

class PeopleList extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h3>People</h3>
        <ul>
          {this.props.people.map((person, i) => (
            <li key={i}>
              <h4>
                {person.firstName} {person.lastName}
              </h4>
              <i>{person.email}</i>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect((state) => ({
  people: state.people.toJS()
}))(PeopleList)
