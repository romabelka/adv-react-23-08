import { createBottomTabNavigator } from 'react-navigation'
import Events from './events-navigator'
import People from './people-navigator'
import React from 'react'
import { View, Text } from 'react-native'

function Hello() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}

export default createBottomTabNavigator(
  {
    events: { screen: Events, navigationOptions: { title: 'Events' } },
    people: { screen: People, navigationOptions: { title: 'People' } }
  },
  {
    tabBarOptions: {
      labelStyle: { fontSize: 16, paddingBottom: 14 }
    }
  }
)
