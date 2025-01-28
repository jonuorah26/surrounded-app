import { StyleSheet, TextStyle } from "react-native";
import { Colors } from "./Colors";

export const fontStyles = StyleSheet.create({
  large: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "600",
  },
  medium: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: "600",
  },
  small: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "600",
  },
  xsmall: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
  xxsmall: {
    color: Colors.white,
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
