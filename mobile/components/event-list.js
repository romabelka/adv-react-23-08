import React, { Component } from "react";
import { SectionList, Text } from "react-native";
import { EventListItem } from "./event-list-item";

class EventList extends Component {
  static propTypes = {};

  render() {
    return (
      <SectionList
        renderItem={({ item }) => (
          <EventListItem
            key={item.id}
            title={item.title}
            onClick={this.clickHandler(item)}
          />
        )}
        renderSectionHeader={({ section: { title, data } }) => (
          <Text style={{ fontWeight: "bold" }}>
            {title} ({data.length})
          </Text>
        )}
        keyExtractor={item => item.id}
        sections={groupData(this.props.events)}
      />
    );
  }
  clickHandler = event => () => this.props.onSelect(event);
}
const groupData = data =>
  Object.values(
    data.reduce((r, e) => {
      let title = e.title[0];
      if (!r[title]) r[title] = { title, data: [e] };
      else r[title].data.push(e);
      return r;
    }, {})
  );

export default EventList;
