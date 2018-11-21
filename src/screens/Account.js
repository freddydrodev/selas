import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "native-base";
import { AUTH } from "../config/base";
import { textDark } from "../tools";

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
      <View>
        <Text> Account </Text>
        <Button block onPress={this.logout}>
          <Text>Logout</Text>
        </Button>
      </View>
    );
  }
}

export default Account;

const style = StyleSheet.create({});
