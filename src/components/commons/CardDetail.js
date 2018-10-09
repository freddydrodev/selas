import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Icon } from "native-base";
import { textLight, linkActive, textDark, textColor } from "../../tools";

const CardDetail = ({ type, name, title }) => (
  <View style={{ flexDirection: "row" }}>
    <Icon type={type || "Feather"} name={name} style={styles.detailIconStyle} />
    <Text style={styles.detailTitleStyle}>{title}</Text>
  </View>
);

export default CardDetail;

const styles = StyleSheet.create({
  fromStyle: { fontFamily: "ws_light", color: textLight, fontSize: 12 },
  priceStyle: { fontFamily: "ws_sBold", color: linkActive, fontSize: 24 },
  detailIconStyle: { color: textDark, marginRight: 5, fontSize: 12 },
  detailTitleStyle: { fontFamily: "ws", color: textColor, fontSize: 12 }
});
