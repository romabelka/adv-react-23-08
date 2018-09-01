import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventsList from '../components/event/events-list'
class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Events list</h2>
        <EventsList />
      </div>
    )
  }
}

export default EventsPage
