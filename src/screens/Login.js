import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Button,
  Container,
  Content,
  Footer,
  FooterTab
} from "native-base";
import FormGenerator from "../components/commons/FormGenerator";
import { textDark, rnFill, primaryColor, bgColor, textColor } from "../tools";
import { AUTH } from "../config/base";
import Alert from "../components/commons/Alert";

class Login extends Component {
  state = {
    formData: {},
    formStructure: {
      email: { label: "Email", placeholder: "Enter your email address" },
      password: {
        label: "Password",
        placeholder: "Enter your password",
        secure: true
      }
    },
    errorMessage: []
  };

  static navigationOptions = {
    headerStyle: { elevation: 0 },
    headerTitle: "Login",
    headerTitleStyle: {
      fontFamily: "font",
      fontWeight: "normal",
      color: textDark
    }
  };

  onFormSubmit = () => {
    let errorMessage = [];
    if (this.validateForm(this.form)) {
      const { email, password } = this.form.state.formData;
      AUTH.signInWithEmailAndPassword(email, password).catch(err => {
        errorMessage = [err.message];
        this.setState({ errorMessage });
      });
    }
  };

  validateForm = form => {
    const data = form.state.formData;
    const errorMessage = Object.keys(data)
      .map(key => !data[key] && `${key} is required!`)
      .filter(data => !!data);
    this.setState({ errorMessage });
    return errorMessage.length === 0 ? true : false;
  };

  render() {
    const { text } = style;
    return (
      <Container>
        <Content
          style={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {this.state.errorMessage.map((msg, i) => (
            <Alert msg={msg} key={i} />
          ))}
          <FormGenerator
            style={{ ...rnFill }}
            ref={form => (this.form = form)}
            structure={this.state.formStructure}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20
            }}
          >
            <TouchableOpacity>
              <Text style={text}>Password Forget?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("registration")}
            >
              <Text style={text}>Not member yet?</Text>
            </TouchableOpacity>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              full
              disabled={false}
              style={{ backgroundColor: primaryColor }}
              onPress={this.onFormSubmit}
            >
              <Text style={{ fontFamily: "font", color: bgColor }}>Login</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Login;

const style = StyleSheet.create({
  text: {
    fontFamily: "font",
    color: textColor
  }
});
