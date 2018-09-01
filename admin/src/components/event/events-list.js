import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventSelector, loadingSelector } from '../../ducks/events'

class EventsList extends Component {
  static propTypes = {}

  render() {
    const { events, loading } = this.props
    return (
      <div>
        {loading && 'Loading ...'}
        {events.map(([key, event]) => (
          <li key={key}>
            <EventElement {...event} />
          </li>
        ))}
      </div>
    )
  }
}
const EventElement = ({ url, title, where, when, month }) => (
  <React.Fragment>
    <a href={url} target="_blank" rel="nofollow noopener noreferrer">
      {title}
    </a>
    : {where} at {when}
  </React.Fragment>
)

export default connect((state) => ({
  events: eventSelector(state),
  loading: loadingSelector(state)
}))(EventsList)
