import React, { Component } from 'react'
import { StyleSheet} from 'react-native'
import EventList from '../events/event-list'

class EventListScreen extends Component {
    static propTypes = {

    };

    render() {
        return <EventList />
    }

//    handleEventPress = ({ id, title }) => this.props.navigation.navigate('event', { id, title })
}

const styles = StyleSheet.create({

})

export default EventListScreen