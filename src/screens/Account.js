import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Button,
  Container,
  Content,
  Footer,
  FooterTab
} from "native-base";
import { AUTH } from "../config/base";
import { textDark, primaryColor, bgColor } from "../tools";

class Account extends Component {
  state = {};

  static navigationOptions = {
    headerStyle: { elevation: 0 },
    headerTitle: "Account",
    headerTitleStyle: {
      fontFamily: "font",
      fontWeight: "normal",
      color: textDark
    }
  };
  logout = () => {
    AUTH.signOut().then(() => {
      this.props.navigation.navigate("auth");
    });
  };

  render() {
    const {} = style;

    return (
      <Container>
        <Content
          style={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text>Account</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full disabled={false} danger onPress={this.logout}>
              <Text style={{ fontFamily: "font", color: bgColor }}>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Account;

const style = StyleSheet.create({});
