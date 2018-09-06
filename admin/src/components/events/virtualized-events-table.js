import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InfiniteLoader, Table, Column } from 'react-virtualized'
import {
  fetchLazy,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelect as handleSelect
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTable extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.remoteRowCount = 298 //TODO hardcode
  }

  componentDidMount() {
    this.props.fetchLazy()
  }

  render() {
    if (this.props.loading && !this.props.loaded) return <Loader />
    const { events } = this.props
    console.log('events', events)

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={this.remoteRowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            rowCount={events.length}
            rowGetter={this.rowGetter}
            rowHeight={40}
            headerHeight={50}
            overscanRowCount={5}
            width={700}
            height={300}
            onRowClick={this.handleRowClick}
            onRowsRendered={onRowsRendered}
            rowRenderer={this.getRowRenderer}
          >
            <Column dataKey="title" width={200} label="Title" />
            <Column dataKey="when" width={100} label="Date" />
            <Column dataKey="where" width={200} label="Place" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    this.props.fetchLazy()
  }

  handleRowClick = ({ rowData }) => this.props.handleSelect(rowData.id)

  rowGetter = ({ index }) => this.props.events[index]
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchLazy, handleSelect }
)(EventsTable)
