import { Platform, StyleSheet, TextStyle } from "react-native";
import { Colors } from "./Colors";
import { rem, scaleFont } from "./Dimensions";
import { MOBILE_OS } from ".";

const basic: TextStyle = {
  color: Colors.white,
  fontWeight: "600",
};

export const fontStyles = StyleSheet.create({
  xlarge: {
    ...basic,
    fontSize: scaleFont(55),
  },
  large: {
    ...basic,
    fontSize: scaleFont(33),
  },
  medium: {
    ...basic,
    fontSize: scaleFont(28),
  },
  small: {
    ...basic,
    fontSize: scaleFont(23),
  },
  xsmall: {
    ...basic,
    fontSize: scaleFont(18),
  },
  xxsmall: {
    ...basic,
    fontSize: scaleFont(13),
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

export const OVERLAY_Z_INDEX = 10;
export const OVERLAY_INTERRUPT_Z_INDEX = OVERLAY_Z_INDEX + 5;
