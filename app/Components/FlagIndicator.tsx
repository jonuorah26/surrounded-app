import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../Constants/Colors";
import { scaleHeight, scaleWidth } from "../Constants/Dimensions";

type Props = {
  color: string;
  style?: StyleProp<ViewStyle>;
  absolute?: boolean;
  roundedBorderSide?: "left" | "right";
};
function FlagIndicator({
  color,
  style = {},
  absolute = true,
  roundedBorderSide = "left",
}: Props) {
  var baseStyle: ViewStyle = {
    ...styles.stickyBox,
    ...{ backgroundColor: color },
  };

  if (absolute) {
    baseStyle = {
      ...baseStyle,
      ...{ position: "absolute", top: scaleHeight(50), right: "0%" },
    };
  }

  if (roundedBorderSide === "left") {
    baseStyle = {
      ...baseStyle,
      ...{
        borderTopLeftRadius: stickyBoxArea / 2,
        borderBottomLeftRadius: stickyBoxArea / 2,
      },
    };
  } else {
    baseStyle = {
      ...baseStyle,
      ...{
        borderTopRightRadius: stickyBoxArea / 2,
        borderBottomRightRadius: stickyBoxArea / 2,
      },
    };
  }

  return (
    <View style={[baseStyle, style]}></View>
    // </View>
  );
}

export default FlagIndicator;
const stickyBoxArea = scaleWidth(160) * scaleHeight(90);
const styles = StyleSheet.create({
  stickyBox: {
    width: scaleWidth(160),
    height: scaleHeight(90),
    zIndex: 1,
    elevation: 1,
    shadowColor: Colors.black, // Add a subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow below the button
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 6,
  },
  stickyBoxNoAbsolute: {
    width: scaleWidth(160),
    height: scaleHeight(90),
    zIndex: 1,
    elevation: 1,
    shadowColor: Colors.black, // Add a subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow below the button
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 6,
  },
});
