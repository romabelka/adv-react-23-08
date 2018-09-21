import {NavigationActions, StackActions} from 'react-navigation'
import BasicStore from './basic-store'

class NavigationStore extends BasicStore {
    ref = null

    setNavRef = ref => this.ref = ref

    goTo = (routeName, params) => this.ref.dispatch(NavigationActions.navigate({
        routeName, params
    }))

    reset = routeName => this.ref.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName })
        ]
    }))
}

export default NavigationStore