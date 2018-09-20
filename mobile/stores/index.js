import AuthStore from './auth';
import EventsStore from './events';
import NavigationStore from './navigation';

const navigation = new NavigationStore();
const events = new EventsStore();

/**
 * TOOD: Вопрос как лучше всего скомбинировать два стора? Т.e. в одном получать action другого.
*/
const auth = new AuthStore(navigation);

export default {
    auth, navigation, events
}