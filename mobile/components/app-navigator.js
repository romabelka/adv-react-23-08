import { createStackNavigator } from 'react-navigation'
import AuthScreen from './screens/auth'
import MainNavigator from './main-navigator'

export default createStackNavigator({
  auth: {
    screen: AuthScreen,
    navigationOptions: {
      title: 'Sign In'
    }
  },
  main: {
    screen: MainNavigator,
    navigationOptions: {
      headerLeft: null
    }
  }
})
