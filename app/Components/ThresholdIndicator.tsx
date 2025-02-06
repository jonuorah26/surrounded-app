import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "../Constants/Dimensions";
import { fontStyles } from "../Constants/GenericStyles";

type Props = {
  color: string;
};
function ThresholdIndicator({ color }: Props) {
  return (
    <View style={{ ...styles.stickyBox, backgroundColor: color }}>
      <Text style={styles.text}>Threshold: 13</Text>
    </View>
  );
}

export default ThresholdIndicator;
const stickyBoxArea = scaleWidth(210) * scaleHeight(90);
const styles = StyleSheet.create({
  stickyBox: {
    width: scaleWidth(210),
    height: scaleHeight(90),
    borderTopLeftRadius: stickyBoxArea / 2,
    borderBottomLeftRadius: stickyBoxArea / 2,
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
    paddingLeft: "11%",
  },
});
