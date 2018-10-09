import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ImagePicker } from "expo";
import { Feather } from "@expo/vector-icons";
import {
  Text,
  Button,
  Item,
  Input,
  Label,
  Textarea,
  Picker,
  View
} from "native-base";
import {
  textDark,
  textColor,
  rnSetPadding,
  BASE_SPACE,
  bgLight
} from "../../tools";

class FormField extends Component {
  state = {
    imageSelected: false
  };
  render() {
    const {
      name,
      label,
      textarea,
      picker,
      image,
      data,
      placeholder,
      container,
      children,
      change,
      value,
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
        this.props.change(this.props.name, [result]);
      } else {
        this.setState({ imageSelected: false });
        this.props.change(this.props.name, [null]);
      }
    };

    const { inputStyle, labelStyle, textAreaStyle, imageSytle } = styles;
    let Inp = (
      <Item stackedLabel={!!label} style={{ marginLeft: null }}>
        {label && <Label style={labelStyle}>{label}</Label>}
        <Input
          style={inputStyle}
          autoCapitalize="words"
          placeholder={placeholder}
          keyboardAppearance="light"
          value={value}
          onChangeText={(...rest) => change(name, rest)}
        />
      </Item>
    );

    //case textArea
    if (textarea) {
      Inp = (
        <React.Fragment>
          {label && <Label style={labelStyle}>{label}</Label>}
          <Textarea
            style={textAreaStyle}
            rowSpan={5}
            keyboardAppearance="light"
            value={value}
            onChangeText={(...rest) => change(name, rest)}
          />
        </React.Fragment>
      );
    }

    //case picker
    if (picker) {
      Inp =
        data || data.length <= 0 ? (
          <React.Fragment>
            {label && <Label style={labelStyle}>{label}</Label>}
            <Item picker>
              <Picker
                itemTextStyle={inputStyle}
                mode="dialog"
                placeholder="Select your a category"
                textStyle={inputStyle}
                itemStyle={{ backgroundColor: "red" }}
                selectedValue={value}
                onValueChange={(...rest) => change(name, rest)}
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
    }

    if (image) {
      Inp = (
        <React.Fragment>
          {label && <Label style={labelStyle}>{label}</Label>}
          <Button full light style={imageSytle} onPress={_imgPicker}>
            <Feather
              name={imageSelected ? "check" : "download"}
              color={textColor}
              size={14}
            />
            <Text style={inputStyle}>
              {imageSelected ? "Image Selected" : "Select an Image..."}
            </Text>
          </Button>
        </React.Fragment>
      );
    }

    if (container) {
      Inp = (
        <React.Fragment>
          {label && <Label style={labelStyle}>{label}</Label>}
          {children}
        </React.Fragment>
      );
    }

    return (
      <View ref={`${name}`} style={{ marginBottom: BASE_SPACE }}>
        {Inp}
      </View>
    );
  }
}

export default FormField;

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
