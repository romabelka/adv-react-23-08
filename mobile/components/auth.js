import React, { Component } from 'react'
import {View, Text, TextInput, Button, Platform} from 'react-native'

class Auth extends Component {
    static propTypes = {

    };

    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <View style = {styles.container}>
                <View>
                    <Text style = {[styles.email, {fontSize: 20}]}>Email:</Text>
                    <TextInput
                        style = {styles.input}
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        keyboardType="email-address"
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <TextInput
                        style = {styles.input}
                        value = {this.state.password}
                        onChangeText={this.handlePasswordChange}
                        secureTextEntry
                    />
                </View>
                <Button title = "Sign In" onPress = {this.handleSubmit}/>
            </View>
        )
    }

    handleSubmit = () => console.log('---', this.state)

    handlePasswordChange = password => this.setState({ password })

    handleEmailChange = email => this.setState({ email })
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
    }
}

export default Auth