import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, AutoSizer, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'
import {
  fetchAllEvents,
  fetchLazyEvents,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelect as handleSelect
} from '../../ducks/events'
import Loader from '../common/loader'

export class EventsTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazyEvents()
  }

  render() {
    const { loaded, minWidth, events } = this.props

    return (
      <div className="vt-container" style={{ outline: '1px dotted red' }}>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={loaded ? events.lenght : events.length + 1}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <Table
                  ref={registerChild}
                  rowHeight={50}
                  headerHeight={80}
                  width={minWidth ? Math.max(minWidth, width) : width}
                  height={400}
                  rowGetter={this.rowGetter}
                  rowCount={events.length}
                  overscanRowCount={10}
                  onRowClick={this.handleRowClick}
                  onRowsRendered={onRowsRendered}
                >
                  <Column dataKey="title" width={200} label="Title" />
                  <Column dataKey="when" width={100} label="Date" />
                  <Column dataKey="where" width={200} label="Place" />
                </Table>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
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
