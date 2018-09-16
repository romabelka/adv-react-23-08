import React, { Component } from 'react'
import {View, StyleSheet, Text, Image, Button, Alert } from 'react-native'

class Event extends Component {

  showAlertDeleting = () => Alert.alert(
    'Delete event',
    'Are you sure?',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel')},
      {text: 'OK', onPress: () => console.log('Event is delete.')}
    ],
    {cancelable: false}
  )

    render() {
        const { title, when, url } = this.props.event
        return (
            <View style = {styles.eventContainer}>
                <Text style = {styles.eventTitle}>{title}</Text>
                <Text>{when}</Text>
                <Text>{url}</Text>
                <Button
                  color="red"
                  title="Delete"
                  onPress={this.showAlertDeleting}
                />
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