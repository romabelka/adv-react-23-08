import { connect } from 'react-redux'
import EventsListComponent from './components'

const mapStateToProps = (state) => {
  return {
    events: state.events.items.toJS()
  }
}

const Events = connect(mapStateToProps)(EventsListComponent)

export default Events
