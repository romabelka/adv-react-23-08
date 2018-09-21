import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Person from '../people/person'

@inject('people')
class PersonScreen extends Component {
  static propTypes = {}

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  render() {
    const person = this.props.people.entities[
      this.props.navigation.state.params.id
    ]

    return <Person person={person} />
  }
}

export default PersonScreen
