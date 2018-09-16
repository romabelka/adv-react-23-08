import React, { Component } from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, Alert, Modal, Button } from 'react-native'

class Event extends Component {
    state = {
      modalVisible: false,
    };

    toggleModalVisible = () => {
      this.setState({modalVisible: !this.state.modalVisible});
    }

    requestCloseHandler = () => {
      console.log('Modal has been closed.');
    }


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
                    <TouchableOpacity onPress={this.toggleModalVisible} style={styles.deleteButton}>
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

                <Modal animationType="fade"
                       transparent={true}
                       visible={this.state.modalVisible}
                       onRequestClose={this.requestCloseHandler} >
                  <View  style={styles.modalWrapper}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalText}>Do you want to delete {title} event?</Text>

                      <View style={styles.modalButtons}>
                        <Button title="Cancel" onPress={() => {
                          this.toggleModalVisible();
                        }}/>
                        <Button title="YES" onPress={() => {
                          this.toggleModalVisible();
                        }}/>
                      </View>
                    </View>
                  </View>
                </Modal>
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
    },
  modalWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalContainer: {
      width: 250,
      height: 150,
      padding: 20,
      justifyContent: 'space-between',
      alignItems: 'stretch',
      backgroundColor: '#fff'
  },
  modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  modalText: {
      fontSize: 18,
      textAlign: 'center'
  }
})

export default Event