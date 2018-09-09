import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'

function SelectedEventCard({ event, connectDropTarget, hovered, canDrop }) {
  const borderColor = canDrop ? (hovered ? 'green' : 'red') : 'black'
  return connectDropTarget(
    <div style={{ border: `1px solid ${borderColor}`, height: 100 }}>
      <h3>
        {event.title} ({event.people.length})
      </h3>
      <div>{event.where}</div>
      <InvitedPeople people={event.people} />
    </div>
  )
}

const InvitedPeople = ({ people }) => (
  <small>
    {people
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
      .join(', ')}
  </small>
)

const spec = {
  drop(props, monitor) {
    props.addEventToPerson(
      props.event.id,
      monitor.getItem().id,
      props.event.title
    )
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  canDrop: monitor.canDrop()
})

export default connect(
  null,
  { addEventToPerson }
)(DropTarget(['person'], spec, collect)(SelectedEventCard))
