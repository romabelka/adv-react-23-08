import React, { Component } from 'react'
import {StyleSheet, Text, ScrollView} from 'react-native'

const styles = StyleSheet.create({
	text: {
		paddingTop: 6,
		paddingRight: 16,
		paddingLeft: 16,
		paddingBottom: 6,
		fontSize: 13,
		lineHeight: 20,
		fontFamily: 'Arial',
		textShadowColor: 'rgba(0, 0, 0, 1)',
		textShadowOffset: {width: 1, height: 1},
		textShadowRadius: 1,
		alignSelf: 'center'
	}
});

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <ScrollView>
                {this.props.events.map(event =>
					<Text
						style = {styles.text}
						key = {event.id}
					>
						{event.title}
					</Text>
				)}
            </ScrollView>
        )
    }
}

export default EventList