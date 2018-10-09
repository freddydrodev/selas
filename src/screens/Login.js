import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "native-base";

class Login extends Component {
  state = {};

  render() {
    const {} = style;

    return (
      <View>
        <Text> Login </Text>
        <Button onPress={() => this.props.navigation.navigate("app")}>
          <Text>Login</Text>
        </Button>
      </View>
    );
  }
}

export default Login;

const style = StyleSheet.create({});
