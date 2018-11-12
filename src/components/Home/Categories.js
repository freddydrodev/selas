import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
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

const PopularEvents = ({ categories, navigation }) => {
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
        {categories.map((category, i) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("events", { selectedPage: i + 1 })
              }
              key={category}
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
                style={{
                  fontFamily: "font",
                  fontSize: 12,
                  color: primaryColor
                }}
              >
                {category.toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </HomeSection>
  );
};

export default withNavigation(PopularEvents);
