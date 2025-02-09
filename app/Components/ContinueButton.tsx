import React from "react";
import Button from "./Button";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type Props = {
  onPress: () => void;
  useDefaultStyles?: boolean;
  style?: ViewStyle;
  text?: string;
};

function ContinueButton({
  onPress,
  useDefaultStyles = true,
  style = {},
  text = "Continue",
}: Props) {
  var styling: ViewStyle = { ...style };

  if (useDefaultStyles) {
    styling = { ...styles.button, ...styling };
  }

  return (
    <Button
      text={text}
      onPress={onPress}
      styles={{ button: styling, buttonText: styles.buttonText }}
      sizeVariant="medium"
    />
  );
}

export default ContinueButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    position: "absolute",
    top: "89%",
    right: "1%",
  },
  buttonText: {},
});
