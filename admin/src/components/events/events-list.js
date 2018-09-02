import React, { Component } from 'react'

class EventsList extends Component {
  static propTypes = {}

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Where</th>
            <th>When</th>
            <th>Submission Deadline</th>
          </tr>
        </thead>
        <tbody>
          {this.props.events.map((event) => (
            <tr key={event.id}>
              <td>
                <a href={event.url} target="_blank">
                  {event.title}
                </a>
              </td>
              <td>{event.where}</td>
              <td>{event.when}</td>
              <td>{event.submissionDeadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default EventsList
