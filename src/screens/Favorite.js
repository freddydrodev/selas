import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Text } from "native-base";
import MainHeader from "../components/commons/MainHeader";

class Favorite extends Component {
  state = {};

  render() {
    const {} = style;

    return (
      <Container>
        <MainHeader title="My Favorites" />
        <Text>Working on...</Text>
      </Container>
    );
  }
}

export default Favorite;

const style = StyleSheet.create({});
