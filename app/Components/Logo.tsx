import React from "react";
import { View, StyleSheet, Text, Image, Platform } from "react-native";
import { Colors } from "../Constants/Colors";
import { fontStyles } from "../Constants/GenericStyles";
import {
  rem,
  VA,
  scaleArea,
  scaleHeight,
  scaleWidth,
  VW,
} from "../Constants/Dimensions";
import { MOBILE_OS, TITLE } from "../Constants";

function Logo() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logoWithText.png")}
        style={styles.logo}
      />
    </View>
  );
}

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    //width: 200, // Diameter of the circle
    //height: 200, // Diameter of the circle
    width: scaleArea(400),
    height: scaleArea(400),
    //width: Platform.OS in MOBILE_OS ? scaleArea(350) : rem(32),
    //height: Platform.OS in MOBILE_OS ? scaleArea(350) : rem(32),
  },
  logoText: {
    fontSize: fontStyles.large.fontSize,
    color: Colors.yellow,
    textTransform: "uppercase",
  },
});
