import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "../Constants/Dimensions";
import Svg, { Polygon } from "react-native-svg";
import { shadow } from "react-native-paper";

type Props = {
  color: string;
  style?: StyleProp<ViewStyle>;
  absolute?: boolean;
  roundedBorderSide?: "left" | "right";
  useRounded?: boolean;
};
function FlagIndicator({
  color,
  style = {},
  absolute = true,
  roundedBorderSide = "left",
  useRounded = true,
}: Props) {
  var baseStyle: ViewStyle = {};
  if (useRounded) {
    baseStyle = {
      ...styles.stickyBox,
      ...{ backgroundColor: color },
    };
  } else {
    baseStyle = {
      alignItems: "flex-start",
      flex: -1,
      width: scaleArea(150),
      zIndex: 1,
      elevation: 1,
    };
  }

  if (absolute) {
    baseStyle = {
      ...baseStyle,
      ...{ position: "absolute", top: scaleHeight(45), right: "0%" },
    };
  }
  if (useRounded) {
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
  }

  const flagWidth = scaleArea(200);
  const flagHeight = scaleArea(100);

  const points = `
  ${flagWidth * 0.75},${flagHeight} 
  0,${flagHeight} 
  ${flagWidth * 0.2},${flagHeight * 0.5} 
  0,0 
  ${flagWidth * 0.75},0
`;

  return useRounded ? (
    <View style={[baseStyle, style]}></View>
  ) : (
    <View style={[baseStyle, style]}>
      <Svg
        height={scaleArea(100)}
        width={scaleArea(200)}
        style={styles.shadow}
        //style={{ transform: [{ rotateZ: "180deg" }] }}
      >
        <Polygon points={points} fill={Colors.red} />
      </Svg>
    </View>
  );
}

export default FlagIndicator;

const stickyBoxArea = scaleArea(160) * scaleArea(90);
const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.black, // Add a subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow below the button
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 6,
  },
  stickyBox: {
    width: scaleArea(160),
    height: scaleArea(90),
    zIndex: 1,
    elevation: 1,
    shadowColor: Colors.black, // Add a subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow below the button
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 6,
  },
});
