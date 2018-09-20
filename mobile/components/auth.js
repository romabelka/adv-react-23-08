import React, { Component } from "react";
import {
  ActivityIndicator,
  Button,
  Platform,
  Text,
  TextInput,
  View
} from "react-native";
import { inject, observer } from "mobx-react";

@inject("auth")
@observer
class Auth extends Component {
  static propTypes = {};

  render() {
    const { auth } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={[styles.email, { fontSize: 20 }]}>Email:</Text>
          <TextInput
            style={styles.input}
            //                        value={auth.email}
            onChangeText={auth.changeEmail}
            keyboardType="email-address"
          />
          <Text>email is {auth.isValidEmail ? "valid" : "invalid"}</Text>
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            //                      value = {auth.password}
            onChangeText={auth.changePassword}
            secureTextEntry
          />
        </View>
        <Text style={styles.error}>{auth.error}</Text>
        {auth.loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            disabled={auth.loading}
            title="Sign In"
            onPress={auth.signIn}
          />
        )}
      </View>
    );
  }
}

const styles = {
  email: {
    color: "red"
  },
  input: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: "#000"
      },
      android: {}
    })
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  error: {
    color: "red"
  }
};

export default Auth;
