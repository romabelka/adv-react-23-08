import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

const basketStyle = {
  height: 200,
  width: 200,
  padding: 20,
  background: '#333',
  position: 'fixed',
  top: 0,
  right: 0,
  color: '#fff'
}
class Basket extends Component {
  render() {
    return this.props.connectDropTarget(
      <div style={basketStyle}>Drag person or event here to delete</div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const { id, type } = monitor.getItem()
    switch (type) {
      case 'event':
        props.deleteEvent(id)
        break
      case 'person':
        props.deletePerson(id)
        break
      default:
        return
    }
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  canDrop: monitor.canDrop()
})

export default connect(
  null,
  { deleteEvent, deletePerson }
)(DropTarget(['person', 'event'], spec, collect)(Basket))
