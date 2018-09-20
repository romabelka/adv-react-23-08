import React, { Component } from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native'
import { inject, observer } from "mobx-react";
import Loader from '../common/loader'

@inject('people')
@observer
class PeopleList extends Component {
  componentDidMount () {
    this.props.people.fetchPeopleList()
  }
  render () {
    const { people: { peopleList, isLoaded, isLoading } } = this.props
    if (!isLoaded && isLoading) return <Loader />
    return (
      <ScrollView>
        {peopleList.map(person => <View key={person.email} style={s.person}>
                                    <Text>{person.firstName} {person.lastName}</Text>
                                  </View>)}
      </ScrollView>
    )
  }
}

const s = StyleSheet.create({
  person: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    shadowOffset: {
      height: 2, width: 0
    },
    shadowOpacity: 0.3,
    elevation: 3
  }
})

export default PeopleList
