import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import EventList from '../events/event-list'
import { observer, inject } from 'mobx-react';
import { LOADING_STATES } from '../../stores/events/constants';

@inject('events')
@observer
class EventListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'event list'
    }

    componentDidMount() {
        this.props.events.getEvents()
    }

    render() {
        const { events } = this.props;

        if (!events.state || events.state === LOADING_STATES.LOADING) {
            return <View>loading...</View>;
        }

        return <EventList events = {events.events} />
    }

//    handleEventPress = ({ id, title }) => this.props.navigation.navigate('event', { id, title })
}

const styles = StyleSheet.create({
})

export default EventListScreen