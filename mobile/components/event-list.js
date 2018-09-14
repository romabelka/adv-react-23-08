import React, { Component } from 'react'
import {StyleSheet, Text, ScrollView} from 'react-native'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <ScrollView>
                {this.props.events.map(event => <Text key = {event.id}>{event.title}</Text>)}
            </ScrollView>
        )
    }
}

export default EventList