import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Event from '../events/event'

@inject('events')
class EventScreen extends Component {
  static propTypes = {}

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  render() {
    const event = this.props.events.entities[
      this.props.navigation.state.params.id
    ]

    return <Event event={event} />
  }
}

export default EventScreen
