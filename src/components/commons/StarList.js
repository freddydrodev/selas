import React from "react";
import { View, Icon } from "native-base";
import { STAR_COLOR, textLight, bgLight, rnSetPadding } from "../../tools";

const Star = ({ active }) => (
  <Icon
    type="Entypo"
    name="star"
    style={{
      color: active ? STAR_COLOR : textLight,
      fontSize: 12
    }}
  />
);

const StarList = ({ rank }) => {
  const _ = Math.ceil(rank);
  const ar = [...Array(5)].map(
    (e, i) => (_ > i ? <Star key={i} active /> : <Star key={i} />)
  );

  return (
    <View
      style={{
        flexDirection: "row",
        width: 70,
        ...rnSetPadding(5),
        backgroundColor: bgLight,
        borderRadius: 2
      }}
    >
      {ar}
    </View>
  );
};

export default StarList;
