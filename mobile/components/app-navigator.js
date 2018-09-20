import { createStackNavigator } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'

export default createStackNavigator({
  auth: {
    screen: AuthScreen,
    navigationOptions: {
      title: 'Sign In'
    }
  },
  event: {
    screen: EventScreen
  },
  eventList: {
    screen: EventListScreen,
    navigationOptions: {
      headerLeft: null
    }
  }
})
