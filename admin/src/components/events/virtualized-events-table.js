import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import {
  fetchChunkEvents,
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
    this.props.fetchChunkEvents()
  }

  render() {
    if (this.props.loading && !this.props.loaded) return <Loader />
    return (
      <Table
        rowHeight={50}
        headerHeight={80}
        width={500}
        height={400}
        rowGetter={this.rowGetter}
        rowCount={this.props.events.length}
        overscanRowCount={0}
        onRowClick={this.handleRowClick}
        onScroll={this.onScroll}
      >
        <Column dataKey="title" width={200} label="Title" />
        <Column dataKey="when" width={100} label="Date" />
        <Column dataKey="where" width={200} label="Place" />
      </Table>
    )
  }

  onScroll = ({ scrollTop, scrollHeight, clientHeight }) => {
    console.log(scrollTop, scrollHeight, clientHeight, scrollTop + scrollHeight)
    if (scrollTop + clientHeight >= scrollHeight) {
      this.props.fetchChunkEvents()
    }
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
  { fetchChunkEvents, handleSelect }
)(EventsTable)
