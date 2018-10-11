import React, { Component } from "react";
import { View, Spinner, Text } from "native-base";
import { rnFill, rnSetPosition, primaryColor } from "../tools";

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ ...rnFill, ...rnSetPosition(), backgroundColor: "white" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
}
