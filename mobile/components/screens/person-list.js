import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import PersonList from '../people/person-list'

class PersonListScreen extends Component {
  static propTypes = {}

  static navigationOptions = {
    title: 'person list'
  }

  render() {
    return <PersonList />
  }
}

const styles = StyleSheet.create({})

export default PersonListScreen
