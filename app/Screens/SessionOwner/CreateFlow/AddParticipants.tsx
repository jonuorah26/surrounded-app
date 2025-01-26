import { Colors } from "@/app/Constants/Colors";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "@/app/Components/Button";
import { preventAutoHideAsync } from "expo-splash-screen";
import FlagIndicator from "@/app/Components/FlagIndicator";

function AddParticipants() {
  const [checked, setChecked] = useState<"checked" | "unchecked">("unchecked");
  const [maxInputDisabled, setMaxInputDisabled] = useState(false);
  const [values, setValues] = useState<{
    min: undefined | string;
    max: undefined | string;
  }>({ min: undefined, max: undefined });

  const handleCheck = () => {
    if (checked === "checked") {
      setChecked("unchecked");
      setMaxInputDisabled(false);
    } else {
      setChecked("checked");
      setMaxInputDisabled(true);
      setValues((prev) => ({ ...prev, max: prev.min }));
    }
  };

  const handleTextInput = (text: string, inputType: "min" | "max") => {
    switch (inputType) {
      case "min":
        setValues((prev) => ({
          ...prev,
          min: text,
          max: checked === "checked" ? text : prev.max,
        }));
        break;
      case "max":
        setValues((prev) => ({ ...prev, max: text }));
    }
  };

  const handleContinue = () => {
    if (!values.min) {
      alert("Please enter a minimum participant count");
    } else if (!values.max) {
      alert(
        'Please enter a maximum participant count or check "Same as Minimum"'
      );
    } else if (parseInt(values.max) < parseInt(values.min)) {
      alert("Minimum participant count cannot be greater than the maximum");
    }
  };

  return (
    <View style={generic.container}>
      <FlagIndicator color={Colors.red} />
      <View style={{ flex: 1, zIndex: 2, elevation: 2 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          extraScrollHeight={20} // Ensures extra spacing for inputs near the keyboard
          enableOnAndroid={true} // Smooth behavior on Android
          keyboardShouldPersistTaps="handled" // Allows taps even when the keyboard is open
        >
          <View style={styles.container}>
            <View style={styles.section}>
              <Text style={styles.title}>
                Enter Minimum Number of Participants
              </Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={styles.textInput}
                outlineStyle={styles.InputBorder}
                value={values.min}
                onChangeText={(e) => handleTextInput(e, "min")}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Maximum Participants Allowed</Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                style={styles.textInput}
                outlineStyle={styles.InputBorder}
                disabled={maxInputDisabled}
                value={values.max}
                onChangeText={(e) => handleTextInput(e, "max")}
              />
              <Checkbox.Item
                label="Same as Minimum"
                status={checked}
                color={Colors.yellow}
                mode={"android"}
                labelVariant="bodyLarge"
                labelStyle={{
                  color:
                    checked === "checked" ? Colors.yellow : Colors.disabledGray,
                  fontWeight: "600",
                }}
                position="leading"
                onPress={handleCheck}
              />
            </View>
          </View>
          <Button
            text="Continue"
            onPress={handleContinue}
            styles={{ button: styles.button, buttonText: styles.buttonText }}
            sizeVariant="medium"
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 50,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    ...generic.title,
    alignSelf: "flex-start",
    margin: 25,
  },
  section: {
    flex: -1,
    marginBottom: 40,
    alignItems: "center",
  },
  textInput: {
    marginHorizontal: 20,
    width: "40%",
    alignSelf: "center",
  },

  InputBorder: {
    borderColor: Colors.yellow,
    borderRadius: 20,
  },
  button: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 700,
    right: 10,
  },
  buttonText: {},
});

export default AddParticipants;
