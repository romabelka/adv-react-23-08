import AuthStore from './auth'
import NavigationStore from './navigation'
import EventsStore from './events'
import PeopleStore from './people'

const auth = new AuthStore()
const navigation = new NavigationStore()
const events = new EventsStore()
const people = new PeopleStore()

export default {
    auth, navigation, events, people
}