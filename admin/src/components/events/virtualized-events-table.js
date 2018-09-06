import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InfiniteLoader, Table, Column } from 'react-virtualized'
import {
  fetchMoreEventsRows,
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
    this.props.fetchMoreEventsRows()
  }

  render() {
    const { loading, loaded, events } = this.props
    // if (loading && !loaded) return <Loader />
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={loaded ? events.length : events.length + 1}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            rowHeight={50}
            headerHeight={80}
            width={500}
            height={400}
            rowGetter={this.rowGetter}
            rowCount={events.length}
            overscanRowCount={5}
            onRowClick={this.handleRowClick}
            ref={registerChild}
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

  isRowLoaded = ({ index }) => !!this.props.events[index]

  loadMoreRows = () => {
    this.props.fetchMoreEventsRows()
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchMoreEventsRows, handleSelect }
)(EventsTable)
