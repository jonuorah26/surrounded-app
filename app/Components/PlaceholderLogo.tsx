import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../Constants/Colors";
import { fontStyles } from "../Constants/GenericStyles";
import { scaleArea, scaleHeight, scaleWidth } from "../Constants/Dimensions";

function PlaceholderLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.circle} />
      </View>
      <View>
        <Text style={styles.logoText}>Surrounded</Text>
      </View>
    </View>
  );
}

export default PlaceholderLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    //paddingVertical: 10,
    paddingVertical: "3%",
  },
  circle: {
    //width: 200, // Diameter of the circle
    //height: 200, // Diameter of the circle
    width: scaleArea(250),
    height: scaleArea(250),
    borderRadius: scaleArea(250) / 2, // Half of the width/height to make it a perfect circle
    backgroundColor: Colors.yellow, // Placeholder color
  },
  logoText: {
    fontSize: fontStyles.large.fontSize,
    color: Colors.yellow,
    textTransform: "uppercase",
  },
});
