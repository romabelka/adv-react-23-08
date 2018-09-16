import React, { Component } from 'react'
import {Text, StyleSheet, SectionList} from 'react-native'
import Event from './event'
import lodash from 'lodash'

class EventList extends Component {
    static propTypes = {
    };
    render() {
        const grouped = lodash.groupBy(this.props.events, event => event.title.charAt(0))
        const sections = Object.keys(grouped).
            sort().
            map((letter) => ({
                title: `${letter}, ${grouped[letter].length} events`,
                data: grouped[letter].map(event => ({key: event.id, event}))
            }))
        return <SectionList
          sections = {sections}
          renderSectionHeader = {({section}) => <Text style={styles.title}>{section.title}</Text>}
          renderItem = {({item}) => <Event event = {item.event} />}
        />
    }
}
const styles = StyleSheet.create({
    title: {
        backgroundColor: '#ffccc4',
        marginBottom: 5,
        height: 30,
        lineHeight: 30,
        paddingLeft: 20,
        fontSize: 14,
        fontWeight: "600"
    }
})
export default EventList