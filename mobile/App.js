import React from "react";
import {Image, StyleSheet, View,Alert} from "react-native";
//import HelloWorld from './components/hello-world'
//import Auth from './components/auth'
import Event from "./components/event";
import EventList from "./components/event-list";
import data from "./fixtures";

const eventList = Object.entries(data.events).map(([id, event]) => ({
  id,
  ...event
}));

export default class App extends React.Component {
  state = {
    event: eventList[0],
  };
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("./assets/logo.png")} style={styles.image} />
        <EventList events={eventList} onSelect={this.selectHandler} />
        <Event event={this.state.event} onDelete = {this.deleteHandler} />

      </View>
    );
  }
  selectHandler = event => this.setState({ event });
    deleteHandler =() => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this event?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: 100
  }
});
