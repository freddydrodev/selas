import React, { Component } from "react";
import { View, Spinner, Text } from "native-base";
import { rnFill, rnSetPosition, primaryColor, textDark } from "../tools";

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ ...rnFill, ...rnSetPosition(), backgroundColor: "white" }}>
        <Text
          style={{
            fontFamily: "font",
            fontWeight: "normal",
            color: textDark
          }}
        >
          {this.props.text || "Loading..."}
        </Text>
      </View>
    );
  }
}
