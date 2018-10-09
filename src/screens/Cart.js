import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container } from "native-base";
import MainHeader from "../components/commons/MainHeader";

class Cart extends Component {
  state = {};

  render() {
    const {} = style;

    return (
      <Container>
        <MainHeader title="My Cart" />
      </Container>
    );
  }
}

export default Cart;

const style = StyleSheet.create({});
