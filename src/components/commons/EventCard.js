import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { View, H3 } from "native-base";
import { withNavigation } from "react-navigation";
import {
  BASE_SPACE,
  bgLight,
  rnSquare,
  rnSetMargin,
  rnFill,
  textDark,
  TITLE_SPACE,
  IMG_1
} from "../../tools";
import CardDetail from "./CardDetail";
import StarList from "./StarList";

const GreyView = ({ width, height, style }) => {
  return (
    <View
      style={{
        backgroundColor: bgLight,
        marginBottom: 5,
        width,
        height,
        ...style
      }}
    />
  );
};

const Ghost = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: BASE_SPACE,
        ...rnSetMargin(BASE_SPACE, "horizontal")
      }}
    >
      <GreyView style={{ ...rnSquare(100), marginRight: BASE_SPACE }} />
      <View>
        <GreyView width={200} height={15} />
        <GreyView width={150} height={10} />
        <GreyView width={150} height={10} />
        <GreyView width={150} height={10} />
        <GreyView width={50} height={10} />
        <GreyView width={50} height={30} />
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        />
      </View>
    </View>
  );
};

class EventCard extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    const {
      key,
      name,
      location,
      date,
      price,
      rank,
      category,
      img
    } = this.props.data;
    return this.state.loaded ? (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("eventDetail", { id: key })
        }
        style={{
          flexDirection: "row",
          marginBottom: BASE_SPACE,
          paddingBottom: BASE_SPACE,
          ...rnSetMargin(BASE_SPACE, "horizontal"),
          borderBottomColor: bgLight,
          borderBottomWidth: 1
        }}
      >
        <View
          style={{
            ...rnSquare(100),
            ...rnSetMargin(BASE_SPACE),
            borderRadius: 5,
            elevation: 10,
            borderRadius: 5
          }}
        >
          <Image
            uri={img.uri}
            resizeMode="cover"
            style={{ ...rnFill, borderRadius: 5 }}
          />
        </View>
        <View style={{ marginTop: BASE_SPACE }}>
          <H3
            style={{
              fontFamily: "font_light",
              color: textDark,
              marginBottom: TITLE_SPACE
            }}
          >
            {name}
          </H3>
          <CardDetail name="folder" title={`in ${category}`} />
          <CardDetail name="map-pin" title={location} />
          <CardDetail name="calendar" title={date} />
          <CardDetail name="money" type="FontAwesome" title={price} />
          <StarList rank={rank} />
        </View>
      </TouchableOpacity>
    ) : (
      <Ghost />
    );
  }
}

export default withNavigation(EventCard);
