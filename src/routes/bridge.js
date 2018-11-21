import React, { Component } from "react";
import { AUTH } from "../config/base";
import LoadingScreen from "../components/LoadingScreen";

class Bridge extends Component {
  componentDidMount() {
    AUTH.onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "app" : "auth");
    });
  }

  render() {
    return <LoadingScreen text="Loading the app please wait..." />;
  }
}

export default Bridge;
