import { createBottomTabNavigator } from "react-navigation";
import EventListScreen from "./screens/event-list";
import PeopleListScreen from "./people/people-list";

export default createBottomTabNavigator({
  eventList: {
    screen: EventListScreen,
    navigationOptions: { title: 'Events' }
    },
  peopleList: {
    screen: PeopleListScreen,
    navigationOptions: { title: 'People' }
  }
});