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
import {
  textDark,
  rnFill,
  primaryColor,
  bgColor,
  textColor,
  DANGER_COLOR,
  ALERT_DANGER_COLOR,
  ALERT_DANGER_BORDER_COLOR
} from "../tools";
import { AUTH, DB } from "../config/base";
import LoadingScreen from "../components/LoadingScreen";

const Alert = ({ msg }) => (
  <View style={style.alertContainer}>
    <Text style={style.alertMsg}>{msg}</Text>
  </View>
);

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
        .then(res => {
          const user = AUTH.currentUser;

          return user
            ? user.updateProfile({ displayName: name }).then(() =>
                DB.post(`users/${user.uid}`, {
                  data: { ...user }
                })
                  .then(() => {
                    this.props.navigation.navigate("app");
                  })
                  .catch(err => err)
              )
            : "Erreur while retrieving user";
        })
        .catch(err => {
          errorMessage = [err.message];

          this.setState({ errorMessage, loadingMsg: null }, () => {
            console.log(this.form.updateData(this.state.formData));
          });
        });
    }
  };

  validateForm = form => {
    const data = form.state.formData;
    this.setState({ formData: data }, () => {
      console.log("added");
    });

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
      if (data["password"].length < 8) {
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
  },
  alertContainer: {
    padding: 5,
    borderRadius: 3,
    backgroundColor: ALERT_DANGER_COLOR,
    borderColor: ALERT_DANGER_BORDER_COLOR,
    borderWidth: 1,
    borderStyle: "solid",
    marginBottom: 10
  },
  alertMsg: {
    fontFamily: "font",
    color: ALERT_DANGER_BORDER_COLOR,
    fontSize: 13
  }
});
