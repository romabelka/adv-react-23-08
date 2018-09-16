import React, { Component } from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, Alert } from 'react-native'

class Event extends Component {

    toggleModal = () => {
      Alert.alert(
        'Delete event?', '',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

    render() {
        const { title, when, url, where } = this.props.event
        const win = Dimensions.get('window');
        const ratio = win.width/400;

        return (
            <View style={styles.container}>
                <Image source={{ uri: 'http://lorempixel.com/400/300'}}
                    style = {{ width: win.width, height: 300*ratio}}
                />
                <View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                    <TouchableOpacity onPress={this.toggleModal} style={styles.deleteButton}>
                      <Text style={styles.deleteButtonText}>delete</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.details}>
                    <Text style={styles.when}>{when}</Text>
                    <Text style={styles.where}>{where}</Text>
                  </View>

                  <View style={styles.linkContainer}>
                    <Text style={styles.url}>{url}</Text>
                  </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f4f7f6',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      height: '100%',
    },
    info: {
      padding: 0,
      backgroundColor: '#fff'
    },
    titleContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      backgroundColor: '#fff',
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleText: {
      paddingVertical: 15,
      fontSize: 20,
      fontWeight: 'bold'
    },
    details: {
      backgroundColor: '#fff',
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    url: {
      color: '#fff'
    },
    linkContainer: {
      padding: 10,
      backgroundColor: '#2c99d2'
    },
    deleteButton: {
      backgroundColor: '#f62c31',
      height: 30,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 15
    },
    deleteButtonText: {
      color: '#fff'
    }
})

export default Event