import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  eventsSelector,
  errorSelector,
  loadingSelector
} from '../../ducks/events'

class EventsList extends Component {
  renderEvents = () => {
    const { events, loading, error } = this.props
    if (loading) return <div>Loading</div>
    if (error) return <div style={{ color: 'red' }}>{error}</div>

    return events.map((item) => {
      const id = item[0]
      const event = item[1]
      return (
        <div style={{ marginTop: 50, marginBottom: 50 }} key={id}>
          <p style={{ fontWeight: 'bold' }}>
            <a href={event.url}>
              {event.title} - {event.month}
            </a>
          </p>
          <p>
            {event.when} - {event.where}
          </p>
          {event.submissionDeadline && event.submissionDeadline.length ? (
            <p>
              <b>Deadline:</b> {event.submissionDeadline}
            </p>
          ) : null}
        </div>
      )
    })
  }
  render() {
    return <div>{this.renderEvents()}</div>
  }
}

const mapStateToProps = (store) => {
  return {
    loading: loadingSelector(store),
    error: errorSelector(store),
    events: eventsSelector(store)
  }
}

export default connect(mapStateToProps)(EventsList)
