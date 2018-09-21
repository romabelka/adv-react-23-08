import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { inject, observer } from 'mobx-react'

import EventCard from './event-card'

@inject('navigation', 'events')
@observer
class EventList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.events.fetchAll()
  }

  render() {
    const { events } = this.props

    if (!events.sectionList || events.loading) {
      return <ActivityIndicator style={StyleSheet.absoluteFill} size="large" />
    }

    return (
      <SectionList
        sections={events.sectionList}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.handleEventPress(item.event)}>
            <EventCard event={item.event} />
          </TouchableOpacity>
        )}
      />
    )
  }

  handleEventPress = ({ id, title }) =>
    this.props.navigation.goTo('event', { id, title })
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F0F0F0',
    height: 40,
    lineHeight: 40,
    marginBottom: 5,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.3,
    elevation: 3
  }
})

export default EventList
