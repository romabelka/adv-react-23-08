import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsListSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'
import { spring, Motion, presets } from 'react-motion'

class SelectedEvents extends Component {
  static propTypes = {}

  render() {
    const { events } = this.props

    return (
      <List
        width={400}
        height={300}
        rowCount={this.props.events.length}
        rowHeight={100}
        rowRenderer={this.rowRenderer}
      />
    )
  }

  rowRenderer = ({ index, key, style }) => {
    return (
      <Motion
        key={key}
        defaultStyle={{ width: 0 }}
        style={{ width: spring(400, { stiffness: 10, damping: 5 }) }}
      >
        {(interpolatedStyles) => (
          <div style={{ ...style, ...interpolatedStyles }}>
            <SelectedEventCard event={this.props.events[index]} />
          </div>
        )}
      </Motion>
    )
  }
}

export default connect((state) => ({
  events: selectedEventsListSelector(state)
}))(SelectedEvents)
