import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { removePerson } from '../../ducks/people'
import { DropTarget } from 'react-dnd'
import { removeEvent } from '../../ducks/events'

function TrashBin({ connectDropTarget, hovered, canDrop }) {
  const backgroundColor = canDrop ? (hovered ? 'red' : 'lightred') : 'wheat'
  const size = canDrop ? { transform: 'scale(3)' } : {}
  return connectDropTarget(
    <div
      style={{
        position: 'absolute',
        right: 50,
        top: 'calc(100vh/2)',
        transition: 'all .5s ease-in-out',
        height: 50,
        width: 50,
        backgroundColor,
        ...size
      }}
    >
      {canDrop ? 'DROP it' : 'Trash bin'}
    </div>
  )
}
const spec = {
  drop(props, monitor) {
    const type = monitor.getItemType()
    const { id } = monitor.getItem()
    if (type === 'person') props.removePerson(id)
    else if (type === 'event') props.removeEvent(id)
    console.log(type, id)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  canDrop: monitor.canDrop()
})
export default connect(
  null,
  { removePerson, removeEvent }
)(DropTarget(['person', 'event'], spec, collect)(TrashBin))
