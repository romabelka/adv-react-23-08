import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, SectionList } from "react-native";
import Event from "./event";

class EventList extends Component {
  static propTypes = {};

  renderItem = ({ item, index, section }) => {
    const isLast = index === section.data.length - 1;
    return (
      <Event event={item} index={index} isLast={isLast} isFirst={!index} />
    );
  };

  render() {
    const { events } = this.props;

    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        sections={events}
        keyExtractor={({ id }) => id}
      />
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 8,
    backgroundColor: "#e3e3e3"
  },
  sectionTitle: {
    fontWeight: "bold"
  },
  itemContainer: {
    padding: 8
  }
});

export default EventList;
