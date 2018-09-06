import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import {
  fetchEventsPage,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelect as handleSelect
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchEventsPage(null, 10)
  }

  render() {
    const { events, loading, loaded } = this.props
    if (loading && !loaded) return <Loader />
    return (
      <div>
        <div>Loaded: {events.length}</div>
        <InfiniteLoader
          isRowLoaded={this._isRowLoaded}
          loadMoreRows={this._loadMoreRows}
          rowCount={events.length}
        >
          {({ onRowsRendered, registerChild }) => (
            <Table
              ref={registerChild}
              rowHeight={50}
              headerHeight={80}
              width={500}
              height={400}
              onRowsRendered={onRowsRendered}
              rowGetter={this.rowGetter}
              rowCount={this.props.events.length}
              overscanRowCount={0}
              onRowClick={this.handleRowClick}
            >
              <Column dataKey="title" width={200} label="Title" />
              <Column dataKey="when" width={100} label="Date" />
              <Column dataKey="where" width={200} label="Place" />
            </Table>
          )}
        </InfiniteLoader>
      </div>
    )
  }

  handleRowClick = ({ rowData }) => this.props.handleSelect(rowData.id)

  rowGetter = ({ index }) => this.props.events[index]

  _loadMoreRows = ({ stopIndex, startIndex }) => {
    const { events, loading } = this.props

    const increment = 11

    if (loading) return
    if (events.length) {
      this.props.fetchEventsPage(events[events.length - 1].id, increment)
    }
  }

  _isRowLoaded = ({ index }) => {
    const { events } = this.props
    return !!events[index + 1]
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchEventsPage, handleSelect }
)(EventsTable)
