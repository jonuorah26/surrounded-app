import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors } from "../Constants/Colors";
import { fontStyles } from "../Constants/GenericStyles";

type Props = {
  text: string;
  id: string;
  onPress: (id: string) => void;
  color?: string;
  styles?: { button?: StyleProp<ViewStyle>; buttonText?: StyleProp<TextStyle> };
};

function Button({
  text,
  onPress,
  id,
  styles: customStyles = { button: {}, buttonText: {} },
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, customStyles.button]}
      activeOpacity={0.7}
      onPress={() => onPress(id)}
    >
      <Text style={[styles.buttonText, customStyles.buttonText]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: -1,
    margin: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 50, // Softer corners
    shadowColor: Colors.black, // Add a subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow below the button
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 6,
    elevation: 5, // For Android shadow
    paddingHorizontal: 30, // Wider button for a sleek look
    paddingVertical: 15, // Adjust height
  },
  buttonText: {
    color: Colors.white,
    fontSize: fontStyles.medium.fontSize, // Slightly smaller, more modern
    fontWeight: "600", // Less bold for a refined appearance
    textTransform: "uppercase", // Modern touch
    letterSpacing: 1, // Cleaner spacing between letters
    textAlign: "center", // Center-align text
  },
});

export default Button;
