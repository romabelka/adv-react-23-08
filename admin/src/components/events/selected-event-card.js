import React from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { visitorsSelector } from '../../ducks/people'
import { addPersonToEvent } from '../../ducks/events'

function SelectedEventCard({
  event,
  connectDragSource,
  connectDropTarget,
  hovered,
  canDrop,
  people
}) {
  const borderColor = canDrop ? (hovered ? 'green' : 'red') : 'black'
  return connectDragSource(
    connectDropTarget(
      <div style={{ border: `1px solid ${borderColor}`, height: 150 }}>
        <div>
          <h3>
            {event.title} - {event.where}
          </h3>
        </div>
        <div>
          {people.map((item) => (
            <p style={{ margin: 0 }} key={item}>
              {item.email}
            </p>
          ))}
        </div>
      </div>
    )
  )
}

SelectedEventCard.propTypes = {}

const spec = {
  drop(props, monitor) {
    props.addPersonToEvent(props.event.id, monitor.getItem().id)
    props.reRender()
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  canDrop: monitor.canDrop()
})

const sourceSpec = {
  beginDrag(props) {
    return {
      id: props.event.id,
      type: 'event'
    }
  }
}

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default connect(
  (state, props) => ({
    people: visitorsSelector(state, props)
  }),
  { addPersonToEvent }
)(
  DragSource('event', sourceSpec, sourceCollect)(
    DropTarget(['person'], spec, collect)(SelectedEventCard)
  )
)
