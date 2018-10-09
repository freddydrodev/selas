import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Text } from "native-base";
import MainHeader from "../components/commons/MainHeader";

class Cart extends Component {
  state = {};

  render() {
    const {} = style;

    return (
      <Container>
        <MainHeader title="My Cart" />
        <Text>Working on...</Text>
      </Container>
    );
  }
}

export default Cart;

const style = StyleSheet.create({});
