/* eslint-disable no-restricted-globals */

import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { dropPerson } from '../../ducks/people'
import { dropEvent } from '../../ducks/events'

function TrashBin({ connectDropTarget }) {
  return connectDropTarget(
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        backgroundColor: '#cc9966',
        border: '1px solid black'
      }}
    >
      <h1>Trash</h1>
    </div>
  )
}

const spec = {
  drop(props, monitor) {
    let action
    switch (monitor.getItemType()) {
      case 'person':
        action = props.dropPerson
        break
      case 'event':
        action = props.dropEvent
        break
      default:
    }

    if (!action) return

    if (confirm('Are you sure to PERMANENTLY delete this item?'))
      action(monitor.getItem().id)
  }
}

const collect = (connect) => ({
  connectDropTarget: connect.dropTarget()
})

export default connect(
  null,
  {
    dropPerson,
    dropEvent
  }
)(DropTarget(['person', 'event'], spec, collect)(TrashBin))
