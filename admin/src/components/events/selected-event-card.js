import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson, peopleSelector } from '../../ducks/people'

class SelectedEventCard extends Component {
  render() {
    const { event, connectDropTarget, hovered, canDrop, people } = this.props
    const borderColor = canDrop ? (hovered ? 'green' : 'red') : 'black'
    const peopleOnEvent = people.filter((person) =>
      person.events.includes(event.id)
    )

    return connectDropTarget(
      <div style={{ border: `1px solid ${borderColor}`, height: 100 }}>
        <h3>{event.title}</h3>
        <div>{event.where}</div>
        {peopleOnEvent && (
          <div>
            {' '}
            {'Visitors: '}
            <span>
              {peopleOnEvent.map((person) => person.email).join(', ')}
            </span>
          </div>
        )}
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    props.addEventToPerson(props.event.id, monitor.getItem().id)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  canDrop: monitor.canDrop()
})

export default connect(
  (state) => ({ people: peopleSelector(state) }),
  { addEventToPerson }
)(DropTarget(['person'], spec, collect)(SelectedEventCard))
