import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Colors } from "../Constants/Colors";
import { fontStyles } from "../Constants/GenericStyles";
import { scaleArea, scaleHeight, scaleWidth } from "../Constants/Dimensions";
import { TITLE } from "../Constants";

function Logo() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.logoContainer}>
        <View style={styles.circle} />
      </View> */}
      <Image
        source={require("../../assets/images/logoWithText.png")}
        style={styles.logo}
      />
      {/* <View>
        <Text style={styles.logoText}>{TITLE}</Text>
      </View> */}
    </View>
  );
}

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: scaleHeight(10),
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
  logo: {
    //width: 200, // Diameter of the circle
    //height: 200, // Diameter of the circle
    width: scaleArea(350),
    height: scaleArea(350),
  },
  logoText: {
    fontSize: fontStyles.large.fontSize,
    color: Colors.yellow,
    textTransform: "uppercase",
  },
});
