import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import Auth from '../auth'
import { autorun } from 'mobx'
import { observer, inject } from 'mobx-react'

@inject('auth')
@observer
class AuthScreen extends Component {
  static propTypes = {}
  authenticatedDisposer = null

  onSuccessfulSignIn = () => {
    this.props.navigation.navigate('main')
  }

  componentDidMount() {
    this.authenticatedDisposer = autorun(() => {
      if (this.props.auth.authenticated) {
        this.onSuccessfulSignIn()
      }
    })
  }

  componentWillUnmount() {
    this.authenticatedDisposer()
  }

  handleSignIn = () => this.props.auth.signIn()

  render() {
    if (this.props.auth.loadingNewState) {
      return <ActivityIndicator size="large" style={styles.activity} />
    } else {
      return <Auth onSignIn={this.handleSignIn} />
    }
  }
}

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default AuthScreen
