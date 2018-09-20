import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Event from '../events/event'
import data from '../../fixtures'

@inject('events')
class EventScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title
    })

    render() {
        const eventId = this.props.navigation.state.params.id;
        const event = this.props.events.events.find(item => item.id === eventId)
        return <Event event = {event}/>
    }
}

export default EventScreen