import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  H1,
  H3
} from "native-base";
import { AUTH } from "../config/base";
import { textDark, bgColor, textColor } from "../tools";

class Account extends Component {
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
    const { text, textBold } = style;

    return (
      <Container>
        <Content
          style={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 20 }}>
            <H3 style={text}>Email</H3>
            <H1 style={textBold}>{AUTH.currentUser.email}</H1>
          </View>
          <View style={{ marginBottom: 20 }}>
            <H3 style={text}>Password</H3>
            <H1 style={textBold}>Selected password</H1>
          </View>
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

const style = StyleSheet.create({
  textBold: {
    fontFamily: "font",
    fontWeight: "normal",
    color: textDark
  },
  text: {
    fontFamily: "font_thin",
    fontWeight: "normal",
    color: textColor
  }
});
