import React, { Component } from 'react'
import EventsList from '../components/events/events-list'
import { connect } from 'react-redux'
import {
  eventsSelector,
  loadingSelector,
  errorSelector,
  getEvents
} from '../ducks/events'

class EventsPage extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.dispatch(getEvents())
  }

  render() {
    const { events, loading, error } = this.props
    return (
      <div>
        <h2>Events</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <EventsList events={events} />}
      </div>
    )
  }
}

export default connect((state) => ({
  events: eventsSelector(state),
  loading: loadingSelector(state),
  error: errorSelector(state)
}))(EventsPage)
