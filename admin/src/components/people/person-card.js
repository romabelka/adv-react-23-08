import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import PersonDragPreview from './person-drag-preview'

class PersonCard extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage())
  }

  render() {
    const { person, connectDragSource, isDragging } = this.props
    const dndStyle = {
      opacity: isDragging ? 0.3 : 1
    }
    const events = Object.values(person.events).join(', ')
    return (
      <div style={dndStyle}>
        {connectDragSource(
          <h3 style={{ cursor: 'pointer' }}>{person.email}</h3>
        )}
        <h4>
          {person.firstName} {person.lastName}
        </h4>
        <small>{events}</small>
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.person.id,
      DragPreview: PersonDragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonCard)
