import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

class Event extends Component {
  render() {
    const { title, when, url } = this.props.event;
    return (
      <View style={styles.card}>
        <View style={styles.card_image}>
          <Image
            source={{
              uri: "https://picsum.photos/400/200?random&" + title
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.card_content}>
          <Text style={styles.card_title}>{title}</Text>
          <View style={styles.card_text}>
            <Text>{when}</Text>
            <Text>{url}</Text>
          </View>
          <Button
            style={styles.card_btn}
            title="Delete"
            onPress={this.props.onDelete}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150
  },
  card_content: {
    display: "flex",
    // flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    flexDirection: "column",
    padding: 5
  },
  card_title: {
    fontSize: 20
  },
  card_text: {
    flexShrink: 1,
    flexBasis: "auto",
    marginBottom: 10
  },
  card_image: {},
  card: {
    backgroundColor: "white",
    borderRadius: 0.25,
    flexDirection: "column",
    width: "100%"
  },
  card_btn: {
    width: "100%"
  }
});

export default Event;
