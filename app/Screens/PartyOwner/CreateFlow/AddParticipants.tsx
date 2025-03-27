import { Colors } from "@/app/Constants/Colors";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import React, { useEffect, useState } from "react";
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
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ContinueButton from "@/app/Components/ContinueButton";
import { Switch } from "react-native-switch";
import { StackNavigation } from "../../_layout";
import { scaleHeight } from "@/app/Constants/Dimensions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/Store";
import {
  updateMaxParticipants,
  updateMaxSameAsMinOption,
  updateMinParticipants,
} from "@/app/Store/PartyReducer";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";

function AddParticipants() {
  const [checked, setChecked] = useState<"checked" | "unchecked">("unchecked");
  const [maxInputDisabled, setMaxInputDisabled] = useState(false);
  const [values, setValues] = useState<{
    min: undefined | string;
    max: undefined | string;
  }>({ min: undefined, max: undefined });
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch<AppDispatch>();
  const [maxOn, setMaxOn] = useState(false);

  // const flagType = useSelector(
  //   (state: RootState) => state.moderator.flagSystem
  // );

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
      return;
    } else if (parseInt(values.min) < 2) {
      alert("Minimum participant count must be at least 2");
      return;
    } else if (maxOn) {
      if (!values.max) {
        alert(
          'Please enter a maximum participant count with the "Maximum" option enabled'
        );
        return;
      } else if (parseInt(values.max) < parseInt(values.min)) {
        alert("Maximum participant count cannot be less than the minimum");
        return;
      }
    }

    dispatch(updateMinParticipants(parseInt(values.min)));
    if (maxOn && values.max) {
      dispatch(updateMaxSameAsMinOption(checked === "checked"));
      dispatch(updateMaxParticipants(parseInt(values.max)));
    }

    if (maxOn && values.max && parseInt(values.max) === parseInt(values.min)) {
      navigate(NAVIGATION_LABELS.Threshold);
    } else {
      navigate(NAVIGATION_LABELS.AllowParticipantsDuringSession);
    }
  };

  return (
    <View style={[generic.container]}>
      <FlagIndicator color={Colors.red} useRounded={false} />
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.title, styles.title2]}>
                  Set Maximum Participants Allowed
                </Text>
                <View style={{ width: "30%", marginRight: 25 }}>
                  <Switch
                    value={maxOn}
                    onValueChange={setMaxOn}
                    activeText={"YES"}
                    inActiveText={"NO"}
                    circleSize={35}
                    barHeight={40}
                    circleBorderWidth={0}
                    backgroundActive={Colors.yellow}
                    backgroundInactive={Colors.disabledGray}
                    circleActiveColor={Colors.white}
                    circleInActiveColor={Colors.white}
                    changeValueImmediately={true}
                    switchWidthMultiplier={2.2}
                    renderActiveText={false}
                    renderInActiveText={false}
                  />
                </View>
              </View>
              {maxOn && (
                <>
                  <TextInput
                    mode="outlined"
                    keyboardType="number-pad"
                    style={styles.textInput}
                    outlineStyle={{
                      ...styles.InputBorder,
                      borderColor: maxInputDisabled
                        ? Colors.disabledGray
                        : Colors.yellow,
                    }}
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
                        checked === "checked"
                          ? Colors.yellow
                          : Colors.disabledGray,
                      fontWeight: "600",
                    }}
                    position="leading"
                    onPress={handleCheck}
                  />
                </>
              )}
            </View>
          </View>
          <ContinueButton onPress={handleContinue} />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: "5%",
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    ...generic.title,
    alignSelf: "flex-start",
    //margin: 25,
    margin: "8%",
  },
  title2: {
    width: "70%",
    paddingLeft: 40,
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
    textAlign: "center",
  },
  InputBorder: {
    borderColor: Colors.yellow,
    borderRadius: 20,
  },
});

export default AddParticipants;
