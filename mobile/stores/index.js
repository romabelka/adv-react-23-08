import AuthStore from './auth'
import NavigationStore from './navigation'

const navigation = new NavigationStore()
const auth = new AuthStore({navigation})

export default {
    auth, navigation
}