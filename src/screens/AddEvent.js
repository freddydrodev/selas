import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Permissions } from "expo";
import moment from "moment";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  Footer,
  Button,
  FooterTab,
  Form
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
import { STORAGE, DB } from "../config/base";
import LoadingScreen from "../components/LoadingScreen";
import addEventFormStructure from "../config/addEventFormStructure";

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
    animating: false,
    isReady: true,
    formData: {},
    categories: [],
    ticketTypes: ["1", "2"],
    formStructure: {}
  };

  async componentDidMount() {
    const callCam = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (callCam === "granted") {
      const { categories } = this.props;

      const formStructure = addEventFormStructure(
        categories,
        this.state.ticketTypes
      );

      this.setState({ formStructure }, () => {
        Object.keys(this.state.formStructure).map(key => {
          const formData = this.state.formData;
          formData[key] = null;
          this.setState(formData);
        });
      });
    }
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
              <Text style={{ fontFamily: "font", color: bgColor }}>Create</Text>
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

    return await STORAGE.ref()
      .child(`images/covers/${name}`)
      .put(blob);
  };

  onFormSubmit = () => {
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
              DB.push("events", {
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
  }
});

{
  /* <FormField label="Event Prices" container>
  <Grid style={{ ...rnFill }}>
    <Col>
      <FormField
        placeholder="Ticket Type"
        picker
        data={DB.ticketType}
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
