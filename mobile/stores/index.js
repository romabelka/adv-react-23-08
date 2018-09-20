import AuthStore from './auth'
import EventsStore from './events'
import PeopleStore from './people'
import NavigationStore from './navigation'

const auth = new AuthStore()
const navigation = new NavigationStore()
const events = new EventsStore()
const people = new PeopleStore()

export default {
    auth, navigation, events, people
}