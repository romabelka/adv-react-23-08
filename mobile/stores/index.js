import AuthStore from './auth'
import NavigationStore from './navigation'

const navigation = new NavigationStore();

/**
 * TOOD: Вопрос как лучше всего скомбинировать два стора? Т.e. в одном получать action другого.
*/
const auth = new AuthStore(navigation);

export default {
    auth, navigation
}