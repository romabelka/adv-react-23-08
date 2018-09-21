import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import EventList from '../events/event-list'

class EventListScreen extends Component {
  static propTypes = {}

  static navigationOptions = {
    title: 'event list'
  }

  render() {
    return <EventList />
  }
}

const styles = StyleSheet.create({})

export default EventListScreen
