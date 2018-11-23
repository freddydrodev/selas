import React, { Component } from "react";
import { StyleSheet } from "react-native";
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
import { connect } from "react-redux";
import MainHeader from "../components/commons/MainHeader";
import { textDark, textLight, primaryColor } from "../tools";
import { styles } from "react-native-material-ripple/styles";

class Reports extends Component {
  state = {
    carts: []
  };

  static navigationOptions = {
    headerStyle: { elevation: 0 },
    headerTitle: "Reports",
    headerTitleStyle: {
      fontFamily: "font",
      fontWeight: "normal",
      color: textDark
    }
  };

  displayData = () => {
    if (this.state.carts.length > 0) {
      const cartsKeys = Object.keys(this.state.carts);
      const carts = [];

      //make a new array with the cart
      cartsKeys.forEach(ck => {
        const mainCart = this.state.carts[ck];
        const cartID = Object.keys(mainCart);
        cartID.map(c => {
          carts.push(mainCart[c]);
        });
      });

      return carts.map((cart, i) => {
        const { name, price, quantity, total, imgURI, eventId } = cart;
        return (
          <List key={i}>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: imgURI }} />
              </Left>
              <Body>
                <Text style={style.textStyle}>{name}</Text>
                <Text style={style.textStyle} note numberOfLines={1}>
                  {quantity} Tickets for {total}$
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
                  <Text style={style.textStyle}>View</Text>
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

  componentDidMount() {
    // console.log("[REPORTS/USERS]", this.props.users);
    const carts = this.props.users
      .filter(user => !!user.cart)
      .map(user => {
        const cartKeys = Object.keys(user.cart);
        return user.cart;
      });

    // console.log(carts);
    this.setState({ carts });
  }

  render() {
    const {} = style;

    return (
      <Container>
        <Text
          style={{
            padding: 20,
            fontFamily: "font",
            backgroundColor: "#f0f0f0",
            color: primaryColor
          }}
        >
          You have {this.props.users.length - 1} user(s)
        </Text>
        <Content>{this.displayData()}</Content>
      </Container>
    );
  }
}

export default connect(({ users }) => ({ users }))(Reports);

const style = StyleSheet.create({
  textStyle: {
    fontFamily: "font"
  }
});
