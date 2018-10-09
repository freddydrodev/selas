import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { View, Text, H3 } from "native-base";
import {
  rnFill,
  TITLE_SPACE,
  BASE_SPACE,
  textDark,
  textLight,
  linkActive,
  rnSetPadding,
  rnSetPosition
} from "../../tools";
import CardDetail from "../commons/CardDetail";
import StarList from "../commons/StarList";

const PriceSection = ({ basePrice }) => (
  <React.Fragment>
    <Text style={styles.fromStyle}>From</Text>
    <Text style={styles.priceStyle}>{basePrice}$</Text>
  </React.Fragment>
);

const CarouselItem = ({
  id,
  name,
  location,
  date,
  hour,
  basePrice,
  rank,
  category,
  img
}) => {
  const { imageStyle, detailStyle, boxSeparatorStyle, titleStyle } = styles;
  return (
    <TouchableOpacity
      onPress={() => alert(`Clicked Event ID: ${id}`)}
      style={{ ...rnSetPadding(BASE_SPACE, "horizontal") }}
    >
      <View style={imageStyle}>
        <Image
          source={{ uri: img.uri }}
          style={{ ...rnFill, resizeMode: "cover" }}
        />
      </View>
      <View style={detailStyle}>
        <View style={boxSeparatorStyle}>
          <H3 style={titleStyle}>{name}</H3>
          <StarList rank={rank} />
        </View>
        <View style={boxSeparatorStyle}>
          <View>
            <CardDetail name="folder" title={`in ${category}`} />
            <CardDetail name="map-pin" title={location} />
            <CardDetail name="calendar" title={`${date} / ${hour}`} />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <PriceSection basePrice={basePrice} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarouselItem;

// const star
const styles = StyleSheet.create({
  fromStyle: { fontFamily: "ws_light", color: textLight, fontSize: 12 },
  priceStyle: { fontFamily: "ws_sBold", color: linkActive, fontSize: 24 },
  imageStyle: {
    ...rnFill,
    height: 150,
    borderRadius: 5,
    elevation: 10,
    marginBottom: 10,
    overflow: "hidden"
  },
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
    fontFamily: "ws_light",
    color: textDark,
    marginBottom: TITLE_SPACE
  }
});
