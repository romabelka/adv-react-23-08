import React, { Component } from 'react'
import Event from '../events/event'
import data from '../../fixtures'
import {inject} from "mobx-react";

@inject('events')
class EventScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title
    })

    render() {
        return <Event event = {this.props.events.getById(this.props.navigation.state.params.id)}/>
    }
}

export default EventScreen