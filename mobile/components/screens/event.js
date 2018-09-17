import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Event from '../events/event'
import data from '../../fixtures'
const eventList = Object.entries(data.events).map(([ id, event ]) => ({ id, ...event }))

class EventScreen extends Component {
    static propTypes = {

    };

    render() {
        return <Event event = {eventList[0]}/>
    }
}

const styles = StyleSheet.create({
})

export default EventScreen