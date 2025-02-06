import React from "react";
import Button from "./Button";
import { StyleSheet } from "react-native";

type Props = {
  onPress: () => void;
};

function ContinueButton({ onPress }: Props) {
  return (
    <Button
      text="Continue"
      onPress={onPress}
      styles={{ button: styles.button, buttonText: styles.buttonText }}
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
