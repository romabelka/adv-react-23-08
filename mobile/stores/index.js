import AuthStore from './auth'
import NavigationStore from './navigation'
import PeopleStore from './people'
import EventsStore from './events'

const auth = new AuthStore()
const navigation = new NavigationStore()
const people = new PeopleStore()
const events = new EventsStore()

export default {
  auth,
  navigation,
  people,
  events
}
