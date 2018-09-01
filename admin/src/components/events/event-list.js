import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventsSelector, loadEvents } from '../../ducks/events'

class EventList extends Component {
  static propTypes = {}

  componentWillMount() {
    this.props.loadEvents()
  }

  // TODO: add spinner and loading:Boolean to the state
  render() {
    return (
      <div>
        {this.props.events.map((event) => (
          <li key={event.id}>
            {new Date(event.date).toDateString()}: &quot;
            {event.title}
            &quot;, {event.venue}
          </li>
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state)
  }),
  { loadEvents }
)(EventList)
