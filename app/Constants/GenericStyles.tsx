import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const generic = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blue,
    ...StyleSheet.absoluteFillObject,
  },
});
