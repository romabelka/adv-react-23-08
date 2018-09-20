import React from "react";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import AppNavigator from "./components/app-navigator";
import stores from "./stores";

configure({
  enforceActions: "always"
});

export default class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <AppNavigator ref={stores.navigation.setNavRef} />
      </Provider>
    );
  }
}
