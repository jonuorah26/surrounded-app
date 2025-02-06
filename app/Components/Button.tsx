import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";
import { Colors } from "../Constants/Colors";
import { fontStyles } from "../Constants/GenericStyles";

const sizes: {
  large: {
    button: ViewStyle;
    text: TextStyle;
  };
  medium: {
    button: ViewStyle;
    text: TextStyle;
  };
} = {
  large: {
    button: {
      paddingHorizontal: 30, // Wider button for a sleek look
      paddingVertical: 15, // Adjust height
    },
    text: {
      ...fontStyles.medium,
    },
  },
  medium: {
    button: {
      paddingHorizontal: 15,
      paddingVertical: 12,
    },
    text: {
      ...fontStyles.small,
    },
  },
};

type SizeVariant = "large" | "medium";

type Props = {
  text: string;
  onPress: () => void;
  color?: string;
  styles?: { button?: StyleProp<ViewStyle>; buttonText?: StyleProp<TextStyle> };
  sizeVariant?: SizeVariant;
  disabled?: boolean;
};

function Button({
  text,
  onPress,
  sizeVariant = "large",
  styles: customStyles = { button: {}, buttonText: {} },
  disabled = false,
}: Props) {
  return (
    <Pressable
      // style={[styles.button, sizes[sizeVariant].button, customStyles.button]}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.button,
        sizes[sizeVariant].button,
        customStyles.button,
      ]}
      //activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          sizes[sizeVariant].text,
          customStyles.buttonText,
        ]}
      >
        {text}
      </Text>
    </Pressable>
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
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600", // Less bold for a refined appearance
    textTransform: "uppercase", // Modern touch
    letterSpacing: 1, // Cleaner spacing between letters
    textAlign: "center", // Center-align text
  },
});

export default Button;
