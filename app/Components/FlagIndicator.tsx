import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../Constants/Colors";

type Props = {
  color: string;
};
function FlagIndicator({ color }: Props) {
  return <View style={{ ...styles.stickyBox, backgroundColor: color }}></View>;
}

export default FlagIndicator;

const styles = StyleSheet.create({
  stickyBox: {
    position: "absolute",
    top: 50,
    right: 0,
    width: 150,
    height: 80,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: 1,
    elevation: 1,
    shadowColor: Colors.black, // Add a subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow below the button
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 6,
  },
});
