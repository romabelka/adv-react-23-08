import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import PeopleListScreen from "./people-list";
import EventListScreen from "./event-list";
import {observer} from "mobx-react";


export default createBottomTabNavigator({
  Events: EventListScreen,
  People: PeopleListScreen
});
