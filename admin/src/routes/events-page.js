import React, { Component } from 'react'
import EventsTable from '../components/events/virtualized-lazy-table'
import SelectedEvents from '../components/events/selected-events'
import PeopleList from '../components/people/people-list'
import Basket from '../components/basket/basket'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <Basket />
        <PeopleList />
        <SelectedEvents />
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
