import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
//import HelloWorld from './components/hello-world'
//import Auth from './components/auth'
import Event from './components/event'
import EventList from './components/event-list'
import data from './fixtures'
const eventList = Object.entries(data.events).map(([ id, event ]) => ({ id, ...event }))

export default class App extends React.Component {
  render() {
    return (
      <View>
          <Image source={require('./assets/logo.png')}
            style = {styles.image}
          />
          <EventList events = {eventList}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    image: {
      width: '100%',
      height: 100
    }
});
