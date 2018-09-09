import React, { Component } from 'react'
import { defaultTableRowRenderer } from 'react-virtualized'
import { DragSource } from 'react-dnd'
import { EventDragPreview } from './event-drag-preview'
import getEmptyImage from 'react-dnd-html5-backend/lib/getEmptyImage'

class TableRow extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage())
  }
  render() {
    const { connectDragSource, ...props } = this.props
    return connectDragSource(defaultTableRowRenderer(props))
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.rowData.id,
      title: props.rowData.title,
      DragPreview: EventDragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})
export default DragSource('event', spec, collect)(TableRow)
