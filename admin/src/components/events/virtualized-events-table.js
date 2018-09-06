import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import {
  fetchEventsChunk,
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
    this.props.fetchEventsChunk()
  }

  render() {
    return (
      <div>
        <Table
          rowHeight={50}
          headerHeight={80}
          width={500}
          height={400}
          rowGetter={this.rowGetter}
          rowCount={this.props.events.length}
          overscanRowCount={0}
          onRowClick={this.handleRowClick}
          onScroll={this.handleScroll}
        >
          <Column dataKey="title" width={200} label="Title" />
          <Column dataKey="when" width={100} label="Date" />
          <Column dataKey="where" width={200} label="Place" />
        </Table>
        {this.getLoader()}
      </div>
    )
  }

  handleRowClick = ({ rowData }) => this.props.handleSelect(rowData.id)

  rowGetter = ({ index }) => this.props.events[index]

  handleScroll = ({ scrollHeight, clientHeight, scrollTop }) =>
    clientHeight + scrollTop === scrollHeight && this.props.fetchEventsChunk()

  getLoader() {
    return this.props.loading && !this.props.loaded && <Loader />
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchEventsChunk, handleSelect }
)(EventsTable)
