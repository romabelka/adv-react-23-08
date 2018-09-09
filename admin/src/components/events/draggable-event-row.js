import { Component } from 'react'
import { defaultTableRowRenderer } from 'react-virtualized'
import { DragSource } from 'react-dnd'

const spec = {
  beginDrag(props) {
    return { id: props.rowData.id }
  }
}

const collect = (connect) => ({
  connectDragSource: connect.dragSource()
})

class DragSourceRow extends Component {
  render() {
    const { connectDragSource, ...props } = this.props
    return connectDragSource(defaultTableRowRenderer({ ...props }))
  }
}

export default DragSource('event', spec, collect)(DragSourceRow)
