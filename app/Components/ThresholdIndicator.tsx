import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "../Constants/Dimensions";
import { fontStyles } from "../Constants/GenericStyles";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

type Props = {
  color: string;
};
function ThresholdIndicator({ color }: Props) {
  return (
    <View style={{ ...styles.stickyBox, backgroundColor: color }}>
      <AutoSizeText
        style={styles.text}
        mode={ResizeTextMode.max_lines}
        numberOfLines={2}
        fontSize={fontStyles.medium.fontSize}
      >
        Threshold: 134
      </AutoSizeText>
    </View>
  );
}

export default ThresholdIndicator;
const stickyBoxArea = scaleArea(210) * scaleArea(90);
const styles = StyleSheet.create({
  stickyBox: {
    width: scaleArea(220),
    height: scaleArea(90),
    borderTopRightRadius: stickyBoxArea / 2,
    borderBottomRightRadius: stickyBoxArea / 2,
    zIndex: 1,
    elevation: 1,
    shadowColor: Colors.black, // Add a subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow below the button
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 6,
    flex: -1,
    justifyContent: "center",
  },
  text: {
    ...fontStyles.medium,
    paddingLeft: scaleArea(10),
    paddingRight: scaleArea(10),
  },
});
