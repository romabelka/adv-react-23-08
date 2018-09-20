import React, { Component } from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import EventList from './event-list'
import PeopleList from './people-list'

export default createBottomTabNavigator({
  eventList: {
    screen: EventList,
    title: 'Event list',
  },
  peopleList: {
    screen: PeopleList,
    title: 'People list',
  },
}, {
  intitialRouteName: 'eventList',
  order: ['eventList', 'peopleList'],
  backBehavior: true,
})
