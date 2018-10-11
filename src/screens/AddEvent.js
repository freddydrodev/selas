import React, { Component } from "react";
import { StyleSheet, ProgressBarAndroid } from "react-native";
import { Permissions } from "expo";
import moment from "moment";
import {
  Container,
  Content,
  Text,
  Footer,
  Button,
  FooterTab,
  Form,
  ProgressBar
} from "native-base";
import { Grid } from "react-native-easy-grid";
import {
  textDark,
  bgColor,
  textColor,
  rnSetPadding,
  BASE_SPACE,
  bgLight,
  rnFill,
  primaryColor
} from "../tools";
import FormField from "../components/commons/FormField";
import { storage, db } from "../config/base";
import LoadingScreen from "../components/LoadingScreen";
import addEventFormStructure from "../config/addEventFormStructure";

class AddEvent extends Component {
  static navigationOptions = {
    headerStyle: { elevation: 0 },
    headerTitle: "Create Event",
    headerTitleStyle: {
      fontFamily: "ws",
      fontWeight: "normal",
      color: textDark
    }
  };

  state = {
    animating: false,
    isReady: false,
    formData: {},
    categories: [],
    ticketTypes: [],
    formStructure: {}
  };

  async componentDidMount() {
    const callCam = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await db.bindToState("categories", {
      context: this,
      state: "categories",
      asArray: true,
      then: data => {
        db.bindToState("ticketTypes", {
          context: this,
          state: "ticketTypes",
          asArray: true,
          then: data => {
            const { categories, ticketTypes } = this.state;
            const formStructure = addEventFormStructure(
              categories,
              ticketTypes
            );
            this.setState({ isReady: true, formStructure }, () => {
              Object.keys(this.state.formStructure).map(key => {
                const formData = this.state.formData;
                formData[key] = null;
                this.setState(formData);
              });
            });
          },
          onFailure: err => {
            console.log(err);
          }
        });
      }
    });
  }

  render() {
    const {} = styles;
    const { animating, isReady } = this.state;
    return isReady ? (
      <Container>
        <Content
          contentContainerStyle={{ ...rnSetPadding(BASE_SPACE, "horizontal") }}
        >
          <Form>
            {animating ? (
              <Text style={{ padding: 10, textAlign: "center" }}>
                Uploading...
              </Text>
            ) : (
              this.generateForm()
            )}
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              full
              disabled={false}
              style={{ backgroundColor: primaryColor }}
              onPress={this.onFormSubmit}
            >
              <Text style={{ fontFamily: "ws", color: bgColor }}>Create</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    ) : (
      <LoadingScreen />
    );
  }

  _uploadImg = async (uri, name) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    return await storage
      .ref()
      .child(`images/covers/${name}`)
      .put(blob);
  };

  onFormSubmit = () => {
    console.log("ici");
    this.setState({ animating: true }, () => {
      const formData = this.state.formData;
      const name = "cover_" + new Date().valueOf();
      const { cover, ...data } = formData;
      const { uri, cancelled, type, ...restCover } = cover;

      if (cover) {
        this._uploadImg(cover.uri, name)
          .then(p => {
            p.ref.getDownloadURL().then(uri => {
              const newField = {
                ...data,
                date: moment(data.date).format("DD-MM-YYYY"),
                createdAt: moment(new Date()).format("DD-MM-YYYY"),
                img: { ...restCover, uri }
              };
              db.push("events", {
                data: {
                  ...newField
                },
                then: err => {
                  console.log(err);
                  this.setState({ animating: false });
                }
              });
              console.log(...newField);
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({ animating: false });
          });
      }
    });
  };

  onInputChange = (name, rest) => {
    const { formData } = this.state;
    formData[name] = rest[0];

    this.setState({ formData });
  };

  generateForm = el => {
    const struct = this.state.formStructure;
    const keys = Object.keys(struct);

    const data = keys.map(key => {
      const el = struct[key];
      const { type, placeholder, label, children, data, row } = el;
      const _type = type || "text";
      const _formField = (
        <FormField
          key={key}
          {...{ [_type]: true }}
          data={data}
          placeholder={placeholder}
          label={label}
          name={key}
          change={this.onInputChange}
          value={this.state.formData[key]}
        >
          {/* {children && this.generateForm(children)} */}
        </FormField>
      );
      const _output = row ? <Grid style={{ ...rnFill }} /> : _formField;

      return _output;
    });

    return data;
  };
}

export default AddEvent;

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: "ws",
    color: textColor,
    fontSize: 14
  },
  textAreaStyle: {
    fontFamily: "ws",
    color: textColor,
    backgroundColor: bgLight,
    borderWidth: null,
    ...rnSetPadding(10),
    fontSize: 14
  },
  labelStyle: {
    fontFamily: "ws",
    color: textDark,
    fontSize: 15,
    ...rnSetPadding(5, "vertical")
  },
  imageSytle: {
    elevation: null
  }
});

{
  /* <FormField label="Event Prices" container>
  <Grid style={{ ...rnFill }}>
    <Col>
      <FormField
        placeholder="Ticket Type"
        picker
        data={db.ticketType}
      />
    </Col>
    <Col>
      <FormField
        placeholder="Ticket Price"
        keyboardType="numeric"
      />
    </Col>
    <Col style={{ width: 45 }}>
      <Button
        onPress={() => alert("clicked btn")}
        style={{ marginTop: 10 }}
        transparent
        rounded
        full
      >
        <Feather name="trash" size={16} color="#FF5555" />
      </Button>
    </Col>
  </Grid>
</FormField>
  <Button
    onPress={() => alert("clicked btn")}
    style={{ marginBottom: BASE_SPACE }}
    full
    bordered
  >
    <Icon name="plus" type="Feather" fontSize={14} />
    <Text>Add Price</Text>
  </Button> */
}
