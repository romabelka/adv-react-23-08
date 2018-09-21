import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { inject, observer } from 'mobx-react'

import PersonCard from './person-card'

@inject('navigation', 'people')
@observer
class PersonList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.people.fetchAll()
  }

  render() {
    const { people } = this.props

    if (!people.sectionList || people.loading) {
      return <ActivityIndicator style={StyleSheet.absoluteFill} size="large" />
    }

    return (
      <SectionList
        sections={people.sectionList}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.handlePersonPress(item.person)}>
            <PersonCard person={item.person} />
          </TouchableOpacity>
        )}
      />
    )
  }

  handlePersonPress = ({ id }) => this.props.navigation.goTo('person', { id })
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F0F0F0',
    height: 40,
    lineHeight: 40,
    marginBottom: 5,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.3,
    elevation: 3
  }
})

export default PersonList
