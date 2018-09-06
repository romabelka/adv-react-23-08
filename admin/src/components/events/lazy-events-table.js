import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import {
  fetchEvents,
  fetchSliceRequest,
  fetchSliceSuccess,
  eventListSelector,
  loadingSelector,
  toggleSelect as handleSelect
} from '../../ducks/events'
import 'react-virtualized/styles.css'

export class EventsTable extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.remoteRowCount = 298 // unable to fetch the rows count from FB so we have to hardcode it
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    if (this.props.loading) return

    this.props.fetchSliceRequest()

    return this.props
      .fetchEvents(
        stopIndex - startIndex + 1, // stopIndex is included in the range
        this.startKey()
      )
      .then((events) => {
        this.props.fetchSliceSuccess(events)
        return events
      })
  }

  startKey = () => {
    return (
      this.props.events.length &&
      this.props.events[this.props.events.length - 1].id
    )
  }

  isRowLoaded = ({ index }) => {
    return !!this.props.events[index]
  }

  render() {
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={this.remoteRowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            rowHeight={50}
            headerHeight={80}
            width={500}
            height={400}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowGetter={this.rowGetter}
            rowCount={this.remoteRowCount}
            overscanRowCount={0}
            onRowClick={this.handleRowClick}
          >
            <Column dataKey="title" width={200} label="Title" />
            <Column dataKey="when" width={100} label="Date" />
            <Column dataKey="where" width={200} label="Place" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  handleRowClick = ({ rowData }) => this.props.handleSelect(rowData.id)

  rowGetter = ({ index }) => this.props.events[index] || {}
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    fetchEvents
  }),
  { fetchSliceRequest, fetchSliceSuccess, handleSelect }
)(EventsTable)
