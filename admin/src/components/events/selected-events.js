import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsListSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'
import { spring, TransitionMotion, presets } from 'react-motion'

class SelectedEvents extends Component {
  static propTypes = {}

  render() {
    const { events } = this.props
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
        defaultStyles={events.map((item) => ({
          key: item.id,
          style: { height: 0, opacity: 0 },
          data: item
        }))}
        styles={events.map((item) => ({
          key: item.id,
          data: item,
          style: {
            width: spring(400),
            height: spring(100),
            opacity: spring(1)
          }
        }))}
      >
        {(styles) => (
          <List
            width={400}
            height={300}
            rowCount={styles.length}
            rowHeight={100}
            rowRenderer={this.rowRenderer(styles)}
          />
        )}
      </TransitionMotion>
    )
  }
  willLeave = () => ({
    width: spring(0),
    height: spring(0),
    opacity: spring(0)
  })
  willEnter = () => ({ width: 0, height: 0, opacity: 1 })

  rowRenderer = (styles) => ({ index, key, style }) => (
    <div key={key} style={{ ...style, ...styles[index].style }}>
      <SelectedEventCard event={styles[index].data} />
    </div>
  )
}

export default connect((state) => ({
  events: selectedEventsListSelector(state)
}))(SelectedEvents)
