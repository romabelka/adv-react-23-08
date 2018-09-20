import React, { Component } from 'react'
import {View, Text, TextInput, Button, Platform} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('auth')
@observer
class Auth extends Component {
    static propTypes = {

    };

    render() {
        const {auth} = this.props
        return (
            <View style = {styles.container}>
                <View>
                    <Text style = {[styles.email, {fontSize: 20}]}>Email:</Text>
                    <TextInput
                        style = {styles.input}
//                        value={auth.email}
                        onChangeText={auth.changeEmail}
                        keyboardType="email-address"
                    />
                    <Text>email is {auth.isValidEmail ? 'valid' : 'invalid'}</Text>
                </View>
                <View>
                    <Text>Password:</Text>
                    <TextInput
                        style = {styles.input}
  //                      value = {auth.password}
                        onChangeText={auth.changePassword}
                        secureTextEntry
                    />
                </View>
                { auth.signInError && this.errorSection }
                <Button
                  disabled = {!auth.isSignInAvailable}
                  title = "Sign In"
                  onPress = {this.handleSubmit}
                />
            </View>
        )
    }

    handleSubmit = () => {
      this.props.auth.signIn()
        .then(() => {
          !this.props.auth.signInError && this.props.onSignIn()
        });
    }
    
    get errorSection() {
      return (
        <View>
          <Text style = {styles.error}>
            Authentication failed. Try again
          </Text>
        </View>
      )
    }
}

const styles = {
    email: {
        color: 'red'
    },
    input: {
        ...Platform.select({
            ios: {
                borderBottomWidth: 1,
                borderBottomColor: '#000'
            },
            android: {

            }
        })
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    error: {
      color: 'red'
    }
}

export default Auth