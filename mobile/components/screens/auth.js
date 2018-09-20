import React, { Component } from 'react'
import { StackActions, NavigationActions } from 'react-navigation';
import Auth from '../auth'

class AuthScreen extends Component {
    static propTypes = {

    }

    render() {
        return <Auth onSignIn = {this.handleSignIn}/>
    }

    handleSignIn = () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'listsScreen' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
}

export default AuthScreen