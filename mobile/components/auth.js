import React, { Component } from 'react'
import {View, Text, TextInput, Button} from 'react-native'

class Auth extends Component {
    static propTypes = {

    };

    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <View>
                <View>
                    <Text>Email:</Text>
                    <TextInput
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        keyboardType="email-address"
                    />
                </View>
                <View>
                    <Text>Passowrd:</Text>
                    <TextInput
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

export default Auth