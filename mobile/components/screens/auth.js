import React, { Component } from 'react'
import Auth from '../auth'
import { NavigationActions, StackActions } from 'react-navigation'

class AuthScreen extends Component {
    static propTypes = {

    }

    render() {
        return <Auth onSignIn = {this.handleSignIn}/>
    }

    handleSignIn = () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "eventList",
          })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
}

export default AuthScreen