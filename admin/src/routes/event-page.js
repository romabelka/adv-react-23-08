import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEvents, eventsSelector, isLoadingSelector } from '../ducks/event'
import EventTable from '../components/event/event-list'

class EventRoute extends Component {
  componentDidMount() {
    this.props.fetchEvents()
  }

  render() {
    const { events, isLoading } = this.props

    return (
      <div>
        <h1>Events</h1>
        {isLoading ? <div>Loading...</div> : <EventTable data={events} />}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  {
    fetchEvents
  }
)(EventRoute)
