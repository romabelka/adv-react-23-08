import React, { Component } from 'react'
import Event from '../events/event'
import data from '../../fixtures'

class EventScreen extends Component {
  static propTypes = {}

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  render() {
    const event = data.events[this.props.navigation.state.params.id]
    return <Event event={event} />
  }
}

export default EventScreen
