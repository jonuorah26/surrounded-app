import React from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "../Constants/Dimensions";
import Svg, { Polygon } from "react-native-svg";
import { shadow } from "react-native-paper";
import { MOBILE_OS } from "../Constants";

type Props = {
  color: string;
  style?: StyleProp<ViewStyle>;
  absolute?: boolean;
  roundedBorderSide?: "left" | "right";
  useRounded?: boolean;
  platform?: "web" | "mobile";
  id?: string;
};
function FlagIndicator({
  color,
  style = {},
  absolute = true,
  roundedBorderSide = "left",
  useRounded = true,
  id = "flag-indicator",
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
      {Platform.OS in MOBILE_OS ? (
        <Svg
          height={scaleArea(100)}
          width={scaleArea(200)}
          style={styles.shadow}
        >
          <Polygon points={points} fill={Colors.red} />
        </Svg>
      ) : (
        <svg
          width={flagWidth}
          height={flagHeight}
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id={`shadow-${id}`}>
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="6"
                floodColor="black"
                floodOpacity="0.4"
              />
            </filter>
          </defs>
          <polygon
            points={points}
            fill={Colors.red}
            filter={`url(#shadow-${id})`}
          />
        </svg>
      )}
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
