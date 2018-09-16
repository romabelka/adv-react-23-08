import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight
} from "react-native";

export const EventListItem = ({ title, onClick }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onClick}>
        <View style={[styles.box, styles.shadow]}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {},
  container: {
    flex: 1,
    borderColor: "black",
    margin: 10,
    elevation: 10
  },
  shadow: {
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 }
  },
  box: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20
  }
});
