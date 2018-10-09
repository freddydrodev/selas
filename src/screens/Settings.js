import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Text } from "native-base";
import MainHeader from "../components/commons/MainHeader";

class Settings extends Component {
  state = {};

  render() {
    const {} = style;

    return (
      <Container>
        <MainHeader title="Settings" />
        <Text>Working on...</Text>
      </Container>
    );
  }
}

export default Settings;

const style = StyleSheet.create({});
