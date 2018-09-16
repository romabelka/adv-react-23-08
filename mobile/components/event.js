import React, { Component } from 'react'
import {View, StyleSheet, Text, Image } from 'react-native'

class Event extends Component {

    render() {
        const { title, when, url } = this.props.event
        return (
            <View style = {styles.eventContainer}>
                <Text style = {styles.eventTitle}>{title}</Text>
                <Text>{when}</Text>
                <Text>{url}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100
    },
    eventContainer: {
      margin: 10,
      padding: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.7,
      shadowRadius: 4
    },
    eventTitle: {
      paddingTop: 5,
      backgroundColor: '#fff'
    }
})

export default Event