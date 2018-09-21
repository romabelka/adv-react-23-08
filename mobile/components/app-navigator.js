import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import PersonScreen from './screens/person'
import EventListScreen from './screens/event-list'
import PersonListSceen from './screens/person-list'

const Tabs = createBottomTabNavigator({
  eventList: {
    screen: EventListScreen
  },
  personList: {
    screen: PersonListSceen
  }
})

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
  person: {
    screen: PersonScreen
  },
  tabs: {
    screen: Tabs
  }
})
