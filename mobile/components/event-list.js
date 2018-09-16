import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {EventListItem} from "./event-list-item";

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <ScrollView>
                {this.props.events.map(event => <EventListItem key = {event.id} title={event.title} onClick={this.clickHandler(event)}/>)}
            </ScrollView>
        )
    }
    clickHandler = event => () => this.props.onSelect(event)
}

export default EventList