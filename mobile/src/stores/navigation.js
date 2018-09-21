import {NavigationActions, StackActions} from 'react-navigation'

class NavigationStore {
    ref = null

    setNavRef = ref => this.ref = ref

    goTo = routeName => this.ref.dispatch(NavigationActions.navigate({
        routeName
    }))

    reset = routeName => this.ref.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName })
        ]
    }))
}

export default NavigationStore