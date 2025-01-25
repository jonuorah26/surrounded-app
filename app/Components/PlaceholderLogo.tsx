import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../Constants/Colors";

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
    paddingVertical: 10,
  },
  circle: {
    width: 200, // Diameter of the circle
    height: 200, // Diameter of the circle
    borderRadius: 100, // Half of the width/height to make it a perfect circle
    backgroundColor: "#ffcc00", // Placeholder color
  },
  logoText: {
    fontSize: 30,
    color: Colors.yellow,
    textTransform: "uppercase",
  },
});
