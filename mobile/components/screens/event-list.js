import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import EventList from '../events/event-list'
import data from '../../fixtures'
const eventList = Object.entries(data.events).map(([id, event]) => ({
  id,
  ...event
}))

class EventListScreen extends Component {
  static propTypes = {}

  static navigationOptions = {
    title: 'event list'
  }

  render() {
    return <EventList events={eventList} />
  }

  //    handleEventPress = ({ id, title }) => this.props.navigation.navigate('event', { id, title })
}

const styles = StyleSheet.create({})

export default EventListScreen
