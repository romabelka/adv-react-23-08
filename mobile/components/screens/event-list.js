import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import EventList from '../events/event-list'
import Loader from '../common/loader'
import { inject, observer } from "mobx-react";

@inject('events')
@observer
class EventListScreen extends Component {

    static propTypes = {

    };

    static navigationOptions = {
        title: 'event list'
    }

    componentDidMount () {
      this.props.events.fetchEventsList()
    }

    render() {
        const { events } = this.props
        if (!events.isLoaded && events.isLoading) return <Loader />
        return <EventList events = {events.eventList} />
    }
}


export default EventListScreen