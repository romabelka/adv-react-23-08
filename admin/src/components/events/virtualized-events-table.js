import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'
import {
  fetchAllEvents,
  fetchLazyEvents,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelect as handleSelect
} from '../../ducks/events'

export class EventsTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazyEvents()
  }

  render() {
    const { loaded, events } = this.props

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={loaded ? events.lenght : events.length + 1}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            rowHeight={50}
            headerHeight={80}
            width={500}
            height={400}
            rowGetter={this.rowGetter}
            rowCount={events.length}
            overscanRowCount={20}
            onRowClick={this.handleRowClick}
            onRowsRendered={onRowsRendered}
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

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    this.props.fetchLazyEvents()
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents, fetchLazyEvents, handleSelect }
)(EventsTable)
