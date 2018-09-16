import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

class Event extends Component {
  render() {
    const { title, when, url } = this.props.event;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://picsum.photos/400/200?random&" + title }}
            style={styles.image}
          />
        </View>
        <View style={styles.main}>
          <Text style={styles.header}>{title}</Text>
          <View style={styles.description}>
            <Text>{when}</Text>
            <Text>{url}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
    borderRadius: 5
  },
  imageContainer: {
    width: 200
  },
  container: {
    overflow: "hidden",
    flexDirection: "row",
    padding: 20
  },
  main: {
    paddingLeft: 20,
    flex: 1
  },
  header: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Event;
