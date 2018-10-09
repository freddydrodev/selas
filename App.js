import React, { Component } from "react";
import { Font } from "expo";
import LoadingScreen from "./src/components/LoadingScreen";
import MainApp from "./src/";
import { fonts } from "./src/tools";

export default class App extends Component {
  state = { isReady: false };

  async componentDidMount() {
    await Font.loadAsync({ ...fonts }).then(() => {
      this.setState({ isReady: true });
    });

    // this.setState({ isReady: true });
  }

  render() {
    return this.state.isReady ? <MainApp /> : <LoadingScreen />;
  }
}
