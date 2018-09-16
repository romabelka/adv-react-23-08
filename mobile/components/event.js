import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Alert
} from "react-native";
import { WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";

class Event extends Component {
  static handleLinkPress(url) {
    return function() {
      WebBrowser.openBrowserAsync(url);
    };
  }

  handleDelete = () => console.log("Delete Pressed");
  handleCancel = () => console.log("Cancel Pressed");

  openModal = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          onPress: this.handleCancel,
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: this.handleDelete,
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const {
      event: { id, title, when, url },
      isFirst,
      isLast
    } = this.props;

    const containerStyles = [
      styles.container,
      (isFirst && styles.containerFirst) || (isLast && styles.containerLast)
    ];

    return (
      <View style={containerStyles}>
        <Image
          source={{
            uri: `https://source.unsplash.com/random/500x500`
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.rowContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{when}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={Event.handleLinkPress(url)}>
            <Text style={styles.link}>Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.openModal}>
            <Ionicons
              style={{ color: "rgba(0, 0, 0, 0.4)" }}
              name={Platform.select({
                ios: "ios-trash-outline",
                android: "md-trash"
              })}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 320,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    marginLeft: 20,
    backgroundColor: "#ffffff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.2)",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, 0.4)",
        shadowOffset: { height: 5, width: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5
      },
      android: {
        elevation: 5
      }
    })
  },
  containerFirst: {
    marginTop: 20
  },
  containerLast: {
    marginBottom: 20
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  rowContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  image: {
    width: "100%",
    height: 200
  },
  title: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold"
  },
  text: {
    marginBottom: "auto"
  },
  link: {
    fontSize: 16,
    color: "rgb(30, 30, 192)"
  },
  bottomContainer: {
    // borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40
    // borderWidth: 1
  }
});

export default Event;
