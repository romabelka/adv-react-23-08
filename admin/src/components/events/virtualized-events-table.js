import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import {
  fetchAllEvents,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelect as handleSelect,
  getChunck,
  selectEventsCount
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchAllEvents()
  }

  isRowLoaded = ({ index }) => {
    const val = this.props.events[index]
    return val && val.id
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise((resolve) => {
      this.props.getChunck({ startIndex, stopIndex })
      resolve()
    })
  }

  render() {
    if (this.props.loading && !this.props.loaded) return <Loader />
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={this.props.recordCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            rowHeight={50}
            headerHeight={80}
            width={500}
            height={400}
            rowGetter={this.rowGetter}
            rowCount={this.props.events.length}
            overscanRowCount={0}
            onRowClick={this.handleRowClick}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
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

  rowGetter = ({ index }) => this.props.events[index]
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    recordCount: selectEventsCount(state)
  }),
  { fetchAllEvents, handleSelect, getChunck }
)(EventsTable)
