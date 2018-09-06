import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Column, InfiniteLoader, Table } from 'react-virtualized'
import {
  eventListSelector,
  eventsCountSelector,
  eventsIndicesSelector,
  fetchAllEvents,
  fetchEvents,
  loadedSelector,
  loadingSelector,
  toggleSelect as handleSelect
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'
import { createStructuredSelector } from 'reselect'

export class EventsTable extends Component {
  static propTypes = {}

  render() {
    if (this.props.loading && !this.props.loaded) return <Loader />
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={this.props.count}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            rowHeight={50}
            headerHeight={80}
            width={500}
            height={400}
            rowGetter={this.rowGetter}
            rowCount={this.props.events.length + 1}
            overscanRowCount={0}
            onRowClick={this.handleRowClick}
            onRowsRendered={onRowsRendered}
            ref={(el) => {
              registerChild(el)
            }}
          >
            <Column dataKey="title" width={200} label="Title" />
            <Column dataKey="when" width={100} label="Date" />
            <Column dataKey="where" width={200} label="Place" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }
  isRowLoaded = ({ index }) => !!this.props.indices[index]
  loadMoreRows = ({ startIndex, stopIndex }) =>
    new Promise((resolve, reject) =>
      this.props.fetchEvents(startIndex, stopIndex, { resolve, reject })
    )

  handleRowClick = ({ rowData }) => this.props.handleSelect(rowData.id)

  rowGetter = ({ index }) => this.props.events[index] || {}
}

export default connect(
  createStructuredSelector({
    events: eventListSelector,
    loading: loadingSelector,
    loaded: loadedSelector,
    indices: eventsIndicesSelector,
    count: eventsCountSelector
  }),
  { fetchAllEvents, handleSelect, fetchEvents }
)(EventsTable)
