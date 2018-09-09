import React, { Component } from 'react'
import { defaultTableRowRenderer } from 'react-virtualized'
import { DragSource } from 'react-dnd'

class EventVirtRow extends Component {
  render() {
    return this.props.connectDragSource(defaultTableRowRenderer(this.props))
  }
}

const sourceSpec = {
  beginDrag(props) {
    return {
      id: props.rowData.id,
      type: 'event'
    }
  }
}

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default DragSource('event', sourceSpec, sourceCollect)(EventVirtRow)
