import { StyleSheet, TextStyle } from "react-native";
import { Colors } from "./Colors";

export const generic = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.blue,
  },
});

export const fontStyles = StyleSheet.create({
  large: {
    fontSize: 30,
    fontWeight: "bold",
  },
  medium: {
    fontSize: 25,
    fontWeight: "bold",
  },
  small: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
