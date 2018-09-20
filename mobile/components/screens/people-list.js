import React, { Component } from 'react';
import PeopleList from '../people/people-list'

class PeopleScreen extends Component {
  static navigationOptions = {
    title: 'people list'
  }

  render () {
    return (
      <PeopleList />
    )
  }
}

export default PeopleScreen