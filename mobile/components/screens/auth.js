import React, { Component } from 'react'
import Auth from '../auth'

class AuthScreen extends Component {
  static propTypes = {}

  render() {
    return <Auth onSignIn={this.handleSignIn} />
  }

  handleSignIn = () => {
    // this.props.navigation.navigate('eventList')
    this.props.navigation.replace('eventList')
  }
}

export default AuthScreen
