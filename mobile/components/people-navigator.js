import { createStackNavigator } from 'react-navigation'
import PeopleListScreen from './screens/people-list'
import PersonScreen from './screens/person'

export default createStackNavigator({
  peopleList: PeopleListScreen,
  person: PersonScreen
})
