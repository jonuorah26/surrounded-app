import ContinueButton from "@/app/Components/ContinueButton";
import FlagIndicator from "@/app/Components/FlagIndicator";
import { Colors } from "@/app/Constants/Colors";
import { scaleHeight, scaleWidth, SH } from "@/app/Constants/Dimensions";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { StackNavigation } from "@/app/Screens/_layout";
import {
  updateCustomVoteOutThreshold,
  updateVoteOutThresholdType,
  VoteOutThresholdType,
} from "@/app/Store/ModeratorReducer";
import { AppDispatch, RootState } from "@/app/Store/Store";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RadioButton, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

function ThresholdScreen() {
  const [value, setValue] = useState<VoteOutThresholdType>("");
  const [custom, setCustom] = useState<string | undefined>();
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch<AppDispatch>();
  const minParticipants = useSelector(
    (state: RootState) => state.moderator.minParticipants
  );

  const handleValueChange = (newValue: VoteOutThresholdType) => {
    setValue(newValue);

    if (newValue === "majority") {
      setCustom("");
    }
  };

  const handleContinue = () => {
    if (value === "") {
      alert("Please select an option.");
      return;
    } else if (value === "custom") {
      if (!!custom === false) {
        alert('Please enter a value if using "Custom" option.');
        return;
      } else if (parseInt(custom) === 0) {
        alert('"Custom" value cannot be less than 1');
        return;
      } else if (parseInt(custom) > minParticipants - 1) {
        alert(
          '"Custom" value must be less than the minimum number of participants minus 1\n\n(You may change this later IF more participants join passed the minimum)'
        );
        return;
      }
      dispatch(updateCustomVoteOutThreshold(parseInt(custom)));
    }
    dispatch(updateVoteOutThresholdType(value));

    navigate(NAVIGATION_LABELS.PartyCodeGenerated);
  };

  return (
    <View style={[generic.container]}>
      <View style={{ flex: 1 }}>
        <FlagIndicator color={Colors.red} useRounded={false} />
      </View>
      <View style={{ flex: 20, zIndex: 2, elevation: 2 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          enableOnAndroid={true} // Smooth behavior on Android
          keyboardShouldPersistTaps="handled" // Allows taps even when the keyboard is open
          extraScrollHeight={20} // Ensures extra spacing for inputs near the keyboard
        >
          <View style={[styles.container, { flex: 1 }]}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.title}>Vote Out Threshold</Text>
            </View>
            <View style={{ flex: 2 }}>
              <RadioButton.Group
                onValueChange={(newValue) =>
                  handleValueChange(newValue as VoteOutThresholdType)
                }
                value={value}
              >
                <View style={styles.radioContainer}>
                  <RadioButton.Item
                    label="Majority of Participants"
                    value="majority"
                    color={Colors.yellow}
                    labelStyle={styles.label}
                    style={styles.radioItem}
                    mode="android"
                    position="leading"
                  />
                  <RadioButton.Item
                    label="All Participants"
                    value="all"
                    color={Colors.yellow}
                    labelStyle={styles.label}
                    style={styles.radioItem}
                    mode="android"
                    position="leading"
                  />
                  <View>
                    <RadioButton.Item
                      label="Custom"
                      value="custom"
                      color={Colors.yellow}
                      style={styles.radioItem}
                      labelStyle={styles.label}
                      mode="android"
                      position="leading"
                    />
                    <TextInput
                      mode="outlined"
                      keyboardType="number-pad"
                      style={styles.textInput}
                      outlineStyle={{
                        ...styles.InputBorder,
                        borderColor:
                          value === "custom"
                            ? Colors.yellow
                            : Colors.disabledGray,
                      }}
                      disabled={value !== "custom"}
                      value={custom}
                      onChangeText={(text) => setCustom(text)}
                    />
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <ContinueButton onPress={handleContinue} />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

export default ThresholdScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    ...generic.title,
    //bottom: 80,
    //bottom: "30%",
    //bottom: scaleHeight(140),
    //bottom: SH(0.14),
  },
  label: {
    ...fontStyles.medium,
    fontSize: fontStyles.large.fontSize - 3,
    //margin: 10,
    //margin: "3%",
    margin: scaleHeight(10),
    textAlign: "left",
    //padding: 10,
    //padding: "2%",
    padding: scaleHeight(8),
    //top: "5%",
    top: scaleHeight(4),
    marginLeft: 0,
  },
  radioItem: {},
  radioContainer: {
    alignItems: "center",
    //gap: 20,
    gap: scaleHeight(5),
  },
  textInput: {
    //width: 100,
    width: scaleWidth(100),
    alignSelf: "center",
    left: "5%",
    textAlign: "center",
  },
  InputBorder: {
    borderColor: Colors.yellow,
    borderRadius: 20,
  },
});
