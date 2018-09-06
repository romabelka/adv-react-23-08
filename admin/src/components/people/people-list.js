import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../common/loader'
import {
  loadingSelector,
  loadedSelector,
  peopleSelector,
  errorSelector,
  fetchPeople
} from '../../ducks/people'

class PeopleList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchPeople()
  }

  render() {
    if (this.props.loading && !this.props.loaded) return <Loader />
    return (
      <div>
        {this.props.people.map((person) => (
          <li key={person.id}>
            {person.firstName}: {person.email}
          </li>
        ))}
        {this.props.error ? (
          <div style={{ color: 'red' }}>{this.props.error}</div>
        ) : null}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    error: errorSelector(state)
  }),
  {
    fetchPeople
  }
)(PeopleList)
