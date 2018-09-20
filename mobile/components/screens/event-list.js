import React, { Component } from 'react'
import { StyleSheet} from 'react-native'
import {inject, observer} from 'mobx-react'
import EventList from '../events/event-list'
import Loader from '../common/loader'
import data from '../../fixtures'
const eventList = Object.entries(data.events).map(([ id, event ]) => ({ id, ...event }))

@inject('events')
@observer
class EventListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'event list'
    }
    
    componentDidMount() {
      this.props.events.loadEvents();
    }

    render() {
      const events = this.props.events.events;
      return events ? <EventList events = {events} /> : <Loader />
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen