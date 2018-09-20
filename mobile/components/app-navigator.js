import {createStackNavigator} from 'react-navigation'
import AuthScreen from './screens/auth'
import ListsScreen from './screens/lists'
import EventScreen from './screens/event' 

export default createStackNavigator({
    auth: {
        screen: AuthScreen,
        navigationOptions: {
            title: 'Sign In'
        }
    },
    listsScreen: {
        screen: ListsScreen
    },
    event: { 
        screen: EventScreen 
    }, 
})