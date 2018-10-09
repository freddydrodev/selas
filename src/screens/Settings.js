import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container } from "native-base";
import MainHeader from "../components/commons/MainHeader";

class Settings extends Component {
  state = {};

  render() {
    const {} = style;

    return (
      <Container>
        <MainHeader title="Settings" />
      </Container>
    );
  }
}

export default Settings;

const style = StyleSheet.create({});
