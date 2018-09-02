import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventsSelector, loadEvents } from '../../ducks/events'

class Events extends Component {
  static propTypes = {}
  componentWillMount() {
    this.props.loadEvents()
  }

  render() {
    console.log('this.props.events', this.props.events)
    return (
      <div>
        <h3>Events: </h3>
        {this.props.events.map((event) => (
          <li key={event.id}>
            {event.title}: {event.when}
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
)(Events)
