import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventList from '../components/events/event-list'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Events</h2>
        <EventList />
      </div>
    )
  }
}

export default connect(null)(EventsPage)
