import React from "react";
import { StyleSheet, Image, SafeAreaView, StatusBar } from "react-native";
//import HelloWorld from './components/hello-world'
//import Auth from './components/auth'
import Event from './components/event'
import EventList from './components/event-list'
import data from './fixtures'
const eventList = Object.entries(data.events).map(([ id, event ]) => ({ id, ...event }))

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.image}
          resizeMode="contain"
          />
        <EventList events={eventList} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1
  },
    image: {
    width: "100%",
      height: 100
    }
});
