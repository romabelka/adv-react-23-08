import React, { Component } from 'react'
import Person from '../people/person'
import data from '../../fixtures'

class PersonScreen extends Component {
  static propTypes = {}

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.person.firstName} ${
      navigation.state.params.person.lastName
    }`
  })

  render() {
    const person = data.people[this.props.navigation.state.params.id]
    return <Person person={person} />
  }
}

export default PersonScreen
