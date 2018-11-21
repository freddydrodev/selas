import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ImagePicker } from "expo";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import {
  Text,
  Button,
  Item,
  Input,
  Label,
  Textarea,
  Picker,
  View,
  DatePicker
} from "native-base";
import {
  textDark,
  textColor,
  rnSetPadding,
  BASE_SPACE,
  bgLight,
  textLight
} from "../../tools";

class FormField extends Component {
  state = {
    imageSelected: false
  };
  render() {
    const {
      _key,
      label,
      data,
      placeholder,
      children,
      change,
      value,
      type,
      secure,
      ...args
    } = this.props;
    const { imageSelected } = this.state;

    _imgPicker = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        type: "image"
      });

      if (!result.cancelled) {
        this.setState({ imageSelected: true });
        this.props.change(this.props._key, result);
      }
    };

    const { inputStyle, labelStyle, textAreaStyle, imageSytle } = styles;
    let Inp = null;

    switch (type) {
      case "textarea":
        Inp = (
          <React.Fragment>
            {label && <Label style={labelStyle}>{label}</Label>}
            <Textarea
              style={textAreaStyle}
              rowSpan={5}
              keyboardAppearance="light"
              value={value}
              onChangeText={value => change(_key, value)}
            />
          </React.Fragment>
        );
        break;
      case "picker":
        Inp = data ? (
          <React.Fragment>
            {label && <Label style={labelStyle}>{label}</Label>}
            <Item picker>
              <Picker
                itemTextStyle={inputStyle}
                mode="dialog"
                placeholder="Select your a category"
                textStyle={inputStyle}
                selectedValue={value}
                onValueChange={value => change(_key, value)}
              >
                {data.map(e => (
                  <Picker.Item label={e} value={e} key={e} />
                ))}
              </Picker>
            </Item>
          </React.Fragment>
        ) : (
          <Text>data is required</Text>
        );
        break;
      case "date":
        Inp = (
          <React.Fragment>
            {label && <Label style={labelStyle}>{label}</Label>}
            <DatePicker
              value={!!value ? value : new Date()}
              defaultDate={!!value ? value : new Date()}
              minimumDate={new Date()}
              locale={"en"}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: textColor, fontFamily: "font" }}
              placeHolderTextStyle={{ color: textLight }}
              onDateChange={value => change(_key, value)}
            />
          </React.Fragment>
        );
        break;
      case "image":
        Inp = (
          <React.Fragment>
            {label && <Label style={labelStyle}>{label}</Label>}
            <Button full light style={imageSytle} onPress={_imgPicker}>
              <Feather
                _key={imageSelected ? "check" : "download"}
                color={textColor}
                size={14}
              />
              <Text style={inputStyle}>
                {imageSelected ? "Image Selected" : "Select an Image..."}
              </Text>
            </Button>
          </React.Fragment>
        );
        break;
      default:
        Inp = (
          <Item stackedLabel={!!label} style={{ marginLeft: null }}>
            {label && <Label style={labelStyle}>{label}</Label>}
            <Input
              style={inputStyle}
              autoCapitalize="words"
              placeholder={placeholder}
              keyboardAppearance="light"
              value={value}
              secureTextEntry={secure}
              onChangeText={value => change(_key, value)}
            />
          </Item>
        );
        break;
    }

    //case container
    // if (container) {
    //   Inp = (
    //     <React.Fragment>
    //       {label && <Label style={labelStyle}>{label}</Label>}
    //       {children}
    //     </React.Fragment>
    //   );
    // }

    return (
      <View ref={`${_key}`} style={{ marginBottom: BASE_SPACE }}>
        {Inp}
      </View>
    );
  }
}

export default FormField;

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

FormField.propTypes = {
  type: PropTypes.string,
  _key: PropTypes.string.isRequired,
  label: PropTypes.string,
  data: PropTypes.array,
  placeholder: PropTypes.string,
  change: PropTypes.func.isRequired
};
