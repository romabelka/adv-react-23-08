import {createStackNavigator} from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'
import MainScreen from "./screens/main";

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
            title: 'Events',
            headerLeft:null
        }
    },
    main : {
        screen: MainScreen,
        navigationOptions: {
            title: '',
            headerLeft:null
        }
    }
})