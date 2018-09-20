import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'

class Person extends Component {
  static propTypes = {}

  render() {
    const { person } = this.props
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={{ uri: 'http://lorempixel.com/200/100/people' }}
            style={styles.image}
          />
          <Text>{person.firstName}</Text>
          <Text>{person.lastName}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: 0
    },
    elevation: 5
  },
  text: {
    width: '100%',
    height: 100,
    marginBottom: 20,
    textAlign: 'center'
  },
  image: {
    width: 200,
    height: 100
  },
  button: {
    width: '100%',
    height: 100,
    marginBottom: 30
  }
})

export default Person
