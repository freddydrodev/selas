import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native-expo-image-cache";
import UIStepper from "react-native-ui-stepper";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  H3,
  View,
  Button,
  Row,
  Col
} from "native-base";
import {
  textDark,
  rnFill,
  textLight,
  linkActive,
  rnSetPadding,
  rnSetPosition,
  TITLE_SPACE,
  bgLight,
  primaryColor,
  bgColor,
  DANGER_COLOR
} from "../tools";
import LoadingScreen from "../components/LoadingScreen";
import CardDetail from "../components/commons/CardDetail";
import StarList from "../components/commons/StarList";
import { DB, AUTH } from "../config/base";
import generateID from "../tools/generateID";
import Alert from "../components/commons/Alert";

const PriceSection = ({ basePrice }) => (
  <React.Fragment>
    <Text style={styles.fromStyle}>Price</Text>
    <Text style={styles.priceStyle}>{basePrice}$</Text>
  </React.Fragment>
);

class EventDetail extends Component {
  static navigationOptions = {
    headerStyle: { elevation: 0 },
    headerTitle: "Event Details",
    headerTitleStyle: {
      fontFamily: "font",
      fontWeight: "normal",
      color: textDark
    }
  };

  state = {
    id: "-LRSJxuhw7k6uqbZZ9ak",
    event: null,
    errorMessage: null,
    qty: 0,
    added: false
  };

  componentDidMount() {
    const { cart } = this.props.currentUser;

    const _ev = this.props.events.filter(
      ev => ev.key === this.props.navigation.getParam("id", "undefined")
    );

    if (_ev[0]) {
      this.setState({ event: _ev[0] }, () => {
        if (cart) {
          this.setState({ added: !!cart[this.state.event.key] });
        }
      });
    }
  }

  addToCart = () => {
    const { event, qty } = this.state;
    const { currentUser } = this.props;
    const { uid } = currentUser;
    const cart = currentUser.cart || {};
    cart[event.key] = {
      eventId: event.key,
      name: event.name,
      price: event.price,
      date: event.date,
      location: event.location,
      createdAt: new Date(),
      quantity: qty,
      imgURI: event.img.uri,
      total: event.price * qty,
      qrcode: generateID(21)
    };

    if (qty > 0) {
      const data = { ...currentUser, cart };

      DB.post(`users/${uid}`, { data }).then(() => {
        this.setState({ added: true, errorMessage: null });
      });
    } else {
      this.setState({ errorMessage: "Increase the quantity first" });
    }
  };

  removeFromCart = () => {
    const { event, added } = this.state;
    const { currentUser } = this.props;
    const { uid, cart } = currentUser;

    if (added) {
      delete cart[event.key];
    }

    const data = { ...currentUser, cart };

    DB.post(`users/${uid}`, { data }).then(() => {
      this.setState({ added: false });
    });
  };

  render() {
    const {
      imageStyle,
      detailStyle,
      boxSeparatorStyle,
      titleStyle,
      simpleTextStyle,
      boldTextStyle
    } = styles;
    const { event, qty, added, errorMessage } = this.state;
    return event ? (
      <Container>
        <Content>
          <View style={imageStyle}>
            <Image
              uri={event.img.uri}
              preview={{ uri: event.img.cached }}
              resizeMode="cover"
              style={{ ...rnFill }}
            />
          </View>
          <View style={detailStyle}>
            <View style={boxSeparatorStyle}>
              <H3 style={titleStyle}>{event.name}</H3>
              <StarList rank={event.rank} />
            </View>
            <View style={boxSeparatorStyle}>
              <View>
                <CardDetail name="folder" title={`in ${event.category}`} />
                <CardDetail name="map-pin" title={event.location} />
                <CardDetail name="calendar" title={event.date} />
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <PriceSection basePrice={event.price} />
              </View>
            </View>
          </View>
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: bgLight,
              marginVertical: 10
            }}
          >
            <Text style={simpleTextStyle}>{event.description}</Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <H3
              style={{
                fontFamily: "font_light",
                color: textDark,
                marginBottom: 20
              }}
            >
              Buy Ticket
            </H3>
            <Row>
              <Col>
                <Text style={simpleTextStyle}>Price</Text>
              </Col>
              <Col style={{ alignItems: "center" }}>
                <Text style={simpleTextStyle}>Quantity</Text>
              </Col>
              <Col style={{ alignItems: "flex-end" }}>
                <Text style={simpleTextStyle}>Total</Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text style={boldTextStyle}>{event.price}$</Text>
              </Col>
              <Col style={{ alignItems: "center" }}>
                <UIStepper
                  displayValue
                  height={30}
                  onValueChange={value => this.setState({ qty: value })}
                  value={qty}
                />
              </Col>
              <Col style={{ alignItems: "flex-end" }}>
                <Text style={boldTextStyle}>{event.price * qty}$</Text>
              </Col>
            </Row>
            {errorMessage && <Alert msg={errorMessage} />}
            <Button
              rounded
              full
              style={{
                marginVertical: 20,
                backgroundColor: !added ? primaryColor : DANGER_COLOR,
                elevation: 0
              }}
              danger={added}
              onPress={!added ? this.addToCart : this.removeFromCart}
            >
              <Text style={{ fontFamily: "font" }}>
                {added ? "Remove from" : "Add to"} cart
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    ) : (
      <LoadingScreen />
    );
  }
}

const mstp = ({ events, currentUser }) => ({
  events,
  currentUser
});
export default connect(mstp)(EventDetail);

const styles = StyleSheet.create({
  fromStyle: { fontFamily: "font_light", color: textLight, fontSize: 12 },
  priceStyle: { fontFamily: "font_sBold", color: linkActive, fontSize: 24 },
  imageStyle: {
    ...rnFill,
    height: 220,
    elevation: 10,
    marginBottom: 10,
    overflow: "hidden"
  },
  simpleTextStyle: { fontFamily: "font", marginBottom: 10 },
  boldTextStyle: { fontFamily: "font_light", fontSize: 30 },
  detailStyle: {
    ...rnSetPadding(10),
    borderRadius: 5
  },
  boxSeparatorStyle: {
    flexDirection: "row",
    width: null,
    flex: 1,
    ...rnSetPosition("top", "row"),
    justifyContent: "space-between"
  },
  titleStyle: {
    fontFamily: "font_light",
    color: textDark,
    marginBottom: TITLE_SPACE
  }
});
