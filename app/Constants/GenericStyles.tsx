import { StyleSheet, TextStyle } from "react-native";
import { Colors } from "./Colors";

export const fontStyles = StyleSheet.create({
  large: {
    fontSize: 30,
    fontWeight: "600",
  },
  medium: {
    fontSize: 25,
    fontWeight: "600",
  },
  small: {
    fontSize: 20,
    fontWeight: "600",
  },
  xsmall: {
    fontSize: 15,
    fontWeight: "600",
  },
  xxsmall: {
    fontSize: 10,
    fontWeight: "600",
  },
});

export const generic = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.blue,
  },
  title: {
    ...fontStyles.large,
    color: Colors.white,
    alignSelf: "center",
  },
});
