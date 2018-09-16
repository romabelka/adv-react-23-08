import React from "react";
import { StyleSheet, Image, SafeAreaView, StatusBar } from "react-native";
//import HelloWorld from './components/hello-world'
//import Auth from './components/auth'
import Event from "./components/event";
import EventList from "./components/event-list";
import data from "./fixtures";

const eventList = Object.entries(data.events).map(([id, event]) => ({
  id,
  ...event
}));

const sectionedEventList = eventList
  .reduce((acc, item, i) => {
    const letter = item.title.slice(0, 1).toUpperCase();
    const index = acc.findIndex(
      ({ title }) => title.slice(0, 1).toUpperCase() === letter
    );

    if (index < 0) return [...acc, { title: letter, data: [item] }];

    const section = acc[index];

    return [
      ...acc.slice(0, index),
      { ...section, data: [...section.data, item] },
      ...acc.slice(index + 1)
    ];
  }, [])
  .sort(({ title: title1 }, { title: title2 }) => title1 > title2)
  .map(({ title, data }) => ({ title: `${title} (${data.length})`, data }));

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <EventList events={sectionedEventList} />
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
