import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import ConfirmModal from '../common/confirm-modal'

class Person extends Component {
  static propTypes = {}

  state = {
    confirmModal: false
  }

  render() {
    const { person } = this.props

    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.header]}>
          {person.firstName} {person.lastName}
        </Text>
        <View>
          <Image
            source={{ uri: 'http://lorempixel.com/200/100/technics' }}
            style={styles.image}
          />
          <Text>{person.email}</Text>
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.handleDelete}
            title="Delete Person"
            color="#F55"
          />
        </View>
        <ConfirmModal
          visible={this.state.confirmModal}
          onConfirm={this.confirmDelete}
          onCancel={this.cancelDelete}
        >
          Are you sure you want to delete "{person.firstName} {person.lastName}"
        </ConfirmModal>
      </View>
    )
  }

  handleDelete = () => {
    this.setState({
      confirmModal: true
    })
  }

  confirmDelete = () => this.setState({ confirmModal: false })
  cancelDelete = () => this.setState({ confirmModal: false })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: 0
    },
    elevation: 5
  },
  text: {
    width: '100%',
    height: 100,
    marginBottom: 20,
    textAlign: 'center'
  },
  image: {
    width: 200,
    height: 100
  },
  button: {
    width: '100%',
    height: 100,
    marginBottom: 30
  }
})

export default Person
