import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  GestureResponderEvent,
} from "react-native";
import { Colors } from "../Constants/Colors";

type Props = {
  text: string;
  id: string;
  onPress: (id: string) => void;
  color?: string;
};

function Button({ text, onPress, id }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={() => onPress(id)}
    >
      <Text style={styles.buttonText}>{text}</Text>
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
    fontSize: 25, // Slightly smaller, more modern
    fontWeight: "600", // Less bold for a refined appearance
    textTransform: "uppercase", // Modern touch
    letterSpacing: 1, // Cleaner spacing between letters
    textAlign: "center", // Center-align text
  },
});

export default Button;
