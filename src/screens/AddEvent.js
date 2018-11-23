import React, { Component } from "react";
import { StyleSheet } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  Footer,
  Button,
  FooterTab,
  Toast
} from "native-base";
import {
  textDark,
  bgColor,
  textColor,
  rnSetPadding,
  BASE_SPACE,
  bgLight,
  primaryColor,
  ALERT_DANGER_COLOR,
  ALERT_DANGER_BORDER_COLOR
} from "../tools";
import { STORAGE, DB } from "../config/base";
import LoadingScreen from "../components/LoadingScreen";
import FormGenerator from "../components/commons/FormGenerator";
import Alert from "../components/commons/Alert";

class AddEvent extends Component {
  static navigationOptions = {
    headerStyle: { elevation: 0 },
    headerTitle: "Create Event",
    headerTitleStyle: {
      fontFamily: "font",
      fontWeight: "normal",
      color: textDark
    }
  };

  state = {
    uploading: false,
    isReady: true,
    formData: {},
    categories: this.props.categories,
    formStructure: {
      cover: { type: "image", label: "Event Cover" },
      name: { label: "Event Name", placeholder: "My awesome event" },
      location: { label: "Event Location", placeholder: "My event location" },
      description: { type: "textarea", label: "Event Description" },
      category: {
        type: "picker",
        label: "Event Category",
        data: this.props.categories
      },
      date: { type: "date", label: "Event Date & hour" },
      price: {
        label: "Event Price",
        placeholder: "Any price"
      }
    }
  };

  check = () => {
    console.log(this.form.state);
  };

  render() {
    const {} = styles;
    const { isReady, uploading } = this.state;
    return isReady ? (
      <Container>
        {!uploading ? (
          <React.Fragment>
            <Content
              contentContainerStyle={{
                ...rnSetPadding(BASE_SPACE, "horizontal")
              }}
            >
              <FormGenerator
                ref={form => (this.form = form)}
                structure={this.state.formStructure}
              />
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
                    Create
                  </Text>
                </Button>
              </FooterTab>
            </Footer>
          </React.Fragment>
        ) : (
          <LoadingScreen text="Uploading..." />
        )}
      </Container>
    ) : (
      <LoadingScreen />
    );
  }

  _uploadImg = async (uri, name) => {
    console.log(uri);
    const response = await fetch(uri);
    const blob = await response.blob();

    return await STORAGE.ref()
      .child(`images/covers/${name}`)
      .put(blob);
  };

  onFormSubmit = () => {
    const { formData } = this.form.state;
    console.log("FD", formData);

    let errorMessage = Object.keys(formData)
      .map(key => !formData[key] && `${key} is required!`)
      .filter(formData => !!formData);

    // this.setState({ errorMessage });

    const name = "cover_" + new Date().valueOf();
    const { cover, ...data } = formData;

    const keys = Object.keys(formData);

    if (errorMessage.length === 0) {
      if (cover) {
        const { uri, cancelled, type, ...restCover } = cover;
        this.setState({ uploading: true }, () => {
          this._uploadImg(cover.uri, name)
            .then(p =>
              p.ref.getDownloadURL().then(uri => {
                const newField = {
                  ...data,
                  date: moment(data.date).format("DD-MM-YYYY"),
                  createdAt: moment(new Date()).format("DD-MM-YYYY"),
                  img: { ...restCover, uri }
                };
                DB.push("events", {
                  data: { ...newField },
                  then: err => {
                    console.log(err);
                    this.form.resetFormData();
                  }
                });
                console.log(...newField);
              })
            )
            .catch(err => {
              console.log(err);
            })
            .then(() => {
              this.setState({ uploading: false, errorMessage: "" });
            });
        });
      }
    } else {
      Toast.show({
        text: "Fill all the fields",
        type: "warning",
        buttonText: "Close"
      });
    }
  };
}

const mstp = ({ categories }) => ({
  categories
});

export default connect(mstp)(AddEvent);

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: "font",
    color: textColor,
    fontSize: 14
  },
  textAreaStyle: {
    fontFamily: "font",
    color: textColor,
    backgroundColor: bgLight,
    borderWidth: null,
    ...rnSetPadding(10),
    fontSize: 14
  },
  labelStyle: {
    fontFamily: "font",
    color: textDark,
    fontSize: 15,
    ...rnSetPadding(5, "vertical")
  },
  imageSytle: {
    elevation: null
  },
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
