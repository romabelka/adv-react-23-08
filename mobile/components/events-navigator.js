import {createStackNavigator } from 'react-navigation'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'

export default createStackNavigator({
  eventList: EventListScreen,
  event: EventScreen
})