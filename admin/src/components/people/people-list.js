import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  peopleSelector,
  peopleHashCodeSelector,
  fetchAllPeople
} from '../../ducks/people'
import { List } from 'react-virtualized'
import PersonCard from './person-card'

import 'react-virtualized/styles.css'

class PeopleList extends Component {
  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    return (
      <List
        rowRenderer={this.rowRenderer}
        rowCount={this.props.people.length}
        rowHeight={200}
        height={400}
        width={400}
        peopleHashCode={this.props.peopleHashCode}
      />
    )
  }

  rowRenderer = ({ style, index, key }) => {
    const person = this.props.people[index]
    return (
      <div style={style} key={key}>
        <PersonCard person={person} />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state),
    peopleHashCode: peopleHashCodeSelector(state) // to re-render the visible part of the list on people list data change
  }),
  { fetchAllPeople }
)(PeopleList)
