import {NavigationActions} from 'react-navigation'

class NavigationStore {
    navRef = null

    setNavRef = ref => this.navRef = ref

    goTo = (routeName, params) => this.navRef.dispatch(NavigationActions.navigate({
        routeName, params
    }))
}

export default NavigationStore