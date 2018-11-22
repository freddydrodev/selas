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
import { AUTH, DB } from "../config/base";
import LoadingScreen from "../components/LoadingScreen";
import Alert from "../components/commons/Alert";

class Registration extends Component {
  state = {
    formData: {},
    formStructure: {
      name: { label: "Fullname", placeholder: "Enter your fullname" },
      email: { label: "Email", placeholder: "Enter your email address" },
      password: {
        label: "Password",
        placeholder: "Enter your password",
        secure: true
      },
      confirm: {
        label: "Confirm",
        placeholder: "Confirm your password",
        secure: true
      }
    },
    errorMessage: [],
    loadingMsg: null
  };

  static navigationOptions = {
    headerStyle: { elevation: 0 },
    headerTitle: "Registration",
    headerTitleStyle: {
      fontFamily: "font",
      fontWeight: "normal",
      color: textDark
    }
  };

  onFormSubmit = () => {
    let errorMessage = [];

    if (this.validateForm(this.form)) {
      console.log(this.state.formData);
      const { name, email, password } = this.form.state.formData;
      AUTH.createUserWithEmailAndPassword(email, password)
        .then(() =>
          AUTH.currentUser.updateProfile({
            displayName: name
          })
        )
        .catch(err => {
          errorMessage = [err.message];

          this.setState({ errorMessage, loadingMsg: null });
        });
    }
  };

  validateForm = form => {
    const data = form.state.formData;

    let errorMessage = Object.keys(data)
      .map(key => !data[key] && `${key} is required!`)
      .filter(data => !!data);

    if (errorMessage.length === 0) {
      //name length
      if (data["name"].length < 6) {
        this.setState({
          errorMessage: ["name must be at least 6 characters"]
        });
        return false;
      }
      //password length
      if (data["password"].length < 2) {
        this.setState({
          errorMessage: ["Password must be at least 8 characters"]
        });
        return false;
      }
      //password and confirm
      if (data["password"] !== data["confirm"]) {
        this.setState({
          errorMessage: ["Password and confirm are different"]
        });
        return false;
      }

      this.setState({ errorMessage });
      return true;
    }

    return false;
  };

  render() {
    const { text } = style;
    return this.state.loadingMsg ? (
      <LoadingScreen text={this.state.loadingMsg} />
    ) : (
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
          <View style={{ marginVertical: 20 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("login")}
            >
              <Text style={text}>Already member login now?</Text>
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
              <Text style={{ fontFamily: "font", color: bgColor }}>
                Register
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Registration;

const style = StyleSheet.create({
  text: {
    fontFamily: "font",
    color: textColor
  }
});
