import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react'

@inject('auth')
@observer
class Auth extends Component {
  static propTypes = {}

  handleSubmit = async () => {
    const { auth } = this.props
    await auth.signIn()
    if (auth.isAuthorized) this.props.onSignIn()
  }

  render() {
    const { auth } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.emailField}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            //                        value={auth.email}
            onChangeText={auth.changeEmail}
            editable={!auth.pending}
            keyboardType="email-address"
          />
          <Text style={!auth.isValidEmail && styles.errorText}>
            email is {auth.isValidEmail ? 'valid' : 'invalid'}
          </Text>
        </View>

        <View style={styles.passwordField}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            //                      value = {auth.password}
            onChangeText={auth.changePassword}
            editable={!auth.pending}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={this.handleSubmit}
          />
        </View>

        <View style={styles.submit}>
          <Button
            title="Sign In"
            onPress={this.handleSubmit}
            disabled={auth.pending}
          />
        </View>

        {auth.error && (
          <View>
            <Text>Email: {auth.email}</Text>
            <Text>{auth.error.message}</Text>
          </View>
        )}

        {auth.pending && (
          <ActivityIndicator style={StyleSheet.absoluteFill} size="large" />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column'
  },

  emailField: {},

  emailInput: {
    marginTop: 10
  },

  passwordField: {
    marginTop: 20
  },

  passwordInput: {},

  label: {
    fontSize: 18
  },

  input: {
    marginTop: 10,

    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: '#000'
      },
      android: {}
    })
  },

  submit: {
    marginTop: 20
  },

  errorText: {
    color: 'red'
  }
})

export default Auth
