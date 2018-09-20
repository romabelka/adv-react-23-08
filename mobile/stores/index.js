import AuthStore from './auth'
import NavigationStore from './navigation'
import EventsStore from "./events";
import PeopleStore from "./people";

const navigation = new NavigationStore()
const auth = new AuthStore({navigation})
const events = new EventsStore({auth})
const people = new PeopleStore({auth})

export default {
    auth, navigation, events, people
}