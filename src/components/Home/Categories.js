import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import HomeSection from "./HomeSection";
import {
  rnSetPadding,
  rnSetMargin,
  BASE_SPACE,
  borderTag,
  primaryColor,
  bgTag
} from "../../tools";

const PopularEvents = ({ categories }) => {
  return (
    <HomeSection
      title="Categories"
      subtitle="Browse in our categories and find the events that suit you."
    >
      <View
        style={{
          ...rnSetPadding(BASE_SPACE, "hosrizontal"),
          flexDirection: "row",
          width: null,
          flex: 1,
          flexWrap: "wrap"
        }}
      >
        {categories.map(cat => {
          return (
            <TouchableOpacity
              onPress={() => alert(cat)}
              key={cat}
              style={{
                ...rnSetPadding(15, "horizontal"),
                ...rnSetPadding(5, "vertical"),
                borderRadius: 5,
                marginRight: 5,
                marginBottom: 5,
                borderWidth: 1,
                borderColor: borderTag,
                backgroundColor: bgTag
              }}
            >
              <Text
                style={{ fontFamily: "ws", fontSize: 12, color: primaryColor }}
              >
                {cat.toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </HomeSection>
  );
};

export default PopularEvents;
