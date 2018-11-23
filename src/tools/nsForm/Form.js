import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";

const FormGroup = props => {
  return (
    <View
      style={{
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 3,
        padding: 10
      }}
    >
      <Text style={{ opacity: 0.3 }}>label</Text>
      <TextInput />
    </View>
  );
};

class Form extends Component {
  render() {
    return (
      <View>
        <FormGroup />
      </View>
    );
  }
}

export default Form;
