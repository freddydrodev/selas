import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Text,
  Content,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Button
} from "native-base";
import MainHeader from "../components/commons/MainHeader";
import { textColor, textLight } from "../tools";

class Cart extends Component {
  state = {
    carts: []
  };

  displayData = () => {
    const { cart } = this.props.currentUser;
    const keys = Object.keys(cart || {});

    if (keys.length > 0) {
      return keys.map(key => {
        const { name, price, quantity, total, imgURI, eventId } = cart[key];
        return (
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: imgURI }} />
              </Left>
              <Body>
                <Text>{name}</Text>
                <Text note numberOfLines={1}>
                  price: {price}$/ quantity: {quantity}/ total: {total}$
                </Text>
              </Body>
              <Right>
                <Button
                  transparent
                  info
                  onPress={() => {
                    this.props.navigation.navigate("eventDetail", {
                      id: eventId
                    });
                  }}
                >
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        );
      });
    } else {
      return (
        <Text
          style={{
            padding: 20,
            fontFamily: "font",
            color: textLight,
            backgroundColor: "#f0f0f0",
            textAlign: "center"
          }}
        >
          No event your cart
        </Text>
      );
    }
  };

  render() {
    const {} = style;
    return (
      <Container>
        <MainHeader title="My Cart" />
        <Content>{this.displayData()}</Content>
      </Container>
    );
  }
}

export default connect(({ currentUser }) => ({ currentUser }))(Cart);

const style = StyleSheet.create({});
