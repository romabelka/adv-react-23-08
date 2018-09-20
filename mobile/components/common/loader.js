import React, { Component } from 'react';
import { StyleSheet, Text, View } from "react-native";

class Loader extends Component {
  render () {
    return (
      <View style={s.loader}><Text style={{fontSize: 30}}>Loading...</Text></View>
    )
  }
}

const s = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loader