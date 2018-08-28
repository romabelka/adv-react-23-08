import React from 'react'
import { connect } from 'react-redux'
import PeopleList from '../components/people/people-list'

const PeopleRoute = ({ items }) =>
  (items.size && (
    <div>
      <h3>People</h3>
      <PeopleList items={items} />
    </div>
  )) ||
  null

const mapStateToProps = (state) => {
  return { items: state.people }
}

export default connect(mapStateToProps)(PeopleRoute)
