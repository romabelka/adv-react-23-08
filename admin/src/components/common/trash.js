import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { Motion, spring } from 'react-motion'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

console.log('---', spring(1))

class Trash extends Component {
  static propTypes = {}

  render() {
    const { connectDropTarget, isOver } = this.props
    const style = {
      border: `1px solid ${isOver ? 'green' : 'black'}`,
      width: 100,
      height: 100,
      position: 'fixed',
      top: 0,
      right: 0
    }
    return (
      <Motion
        defaultStyle={{ opacity: 0 }}
        style={{ opacity: spring(1, { stiffness: 100, damping: 1 }) }}
      >
        {(interpolatedStyles) =>
          connectDropTarget(
            <div style={{ ...style, ...interpolatedStyles }}>Trash</div>
          )
        }
      </Motion>
    )
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

const spec = {
  drop({ deleteEvent, deletePerson }, monitor) {
    const itemACMapping = {
      event: deleteEvent,
      person: deletePerson
    }

    const item = monitor.getItem()
    const itemType = monitor.getItemType()

    itemACMapping[itemType](item.id)
  }
}

export default connect(
  null,
  { deleteEvent, deletePerson }
)(DropTarget(['event', 'person'], spec, collect)(Trash))
