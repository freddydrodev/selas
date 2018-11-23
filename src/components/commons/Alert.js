import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ALERT_DANGER_COLOR, ALERT_DANGER_BORDER_COLOR } from "../../tools";

const Alert = ({ msg }) => (
  <View style={style.alertContainer}>
    <Text style={style.alertMsg}>{msg}</Text>
  </View>
);

export default Alert;

const style = StyleSheet.create({
  alertContainer: {
    padding: 5,
    borderRadius: 3,
    backgroundColor: ALERT_DANGER_COLOR,
    borderColor: ALERT_DANGER_BORDER_COLOR,
    borderWidth: 1,
    borderStyle: "solid",
    marginVertical: 5
  },
  alertMsg: {
    fontFamily: "font",
    color: ALERT_DANGER_BORDER_COLOR,
    fontSize: 13
  }
});
