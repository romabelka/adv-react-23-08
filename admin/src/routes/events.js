import React, { Component } from 'react'
import EventsList from '../components/events/events-list'
class EventsRoute extends Component {
  render() {
    return (
      <div>
        <h2>Events list</h2>
        <EventsList />
      </div>
    )
  }
}

export default EventsRoute
