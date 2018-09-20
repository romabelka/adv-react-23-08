import AuthStore from './auth'
import NavigationStore from './navigation'

const auth = new AuthStore()
const navigation = new NavigationStore()

export default {
    auth, navigation
}