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
  bgColor
} from "../tools";
import LoadingScreen from "../components/LoadingScreen";
import CardDetail from "../components/commons/CardDetail";
import StarList from "../components/commons/StarList";
import { DB } from "../config/base";

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
    qty: 0
  };

  componentDidMount() {
    const _ev = this.props.events.filter(
      ev => ev.key === this.props.navigation.getParam("id", "undefined")
    );

    if (_ev[0]) {
      this.setState({ event: _ev[0] });
    }
  }

  addToCart = () => {};

  render() {
    const {
      imageStyle,
      detailStyle,
      boxSeparatorStyle,
      titleStyle,
      simpleTextStyle,
      boldTextStyle
    } = styles;
    const { event, qty } = this.state;
    console.log(event);
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

            <Button
              rounded
              full
              style={{
                marginVertical: 20,
                backgroundColor: primaryColor,
                elevation: 0
              }}
              onClick={this.addToCart}
            >
              <Text style={{ fontFamily: "font" }}>Add to cart</Text>
            </Button>
          </View>
        </Content>
      </Container>
    ) : (
      <LoadingScreen />
    );
  }
}

const mstp = ({ events }) => ({
  events
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
