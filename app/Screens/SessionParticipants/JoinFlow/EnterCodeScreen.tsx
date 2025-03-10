import ContinueButton from "@/app/Components/ContinueButton";
import { Colors } from "@/app/Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import { generic } from "@/app/Constants/GenericStyles";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import { StackNavigation } from "../../_layout";
import { useUserTypeContext } from "@/app/Context/UserTypeContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/Store/Store";
import { updatePartyCode } from "@/app/Store/ModeratorReducer";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";

function EnterCodeScreen() {
  const [code, setCode] = useState("");
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch<AppDispatch>();

  const handleContinue = () => {
    if (!code) {
      alert("Please enter the party code");
      return;
    }

    dispatch(updatePartyCode(code));
    navigate(NAVIGATION_LABELS.EnterName);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "flex-end", gap: scaleHeight(50) }}
        >
          <View style={{}}>
            <Text style={styles.title}>Enter Session Code</Text>
          </View>
          <View style={{}}>
            <TextInput
              mode="outlined"
              keyboardType="default"
              style={styles.textInput}
              outlineStyle={styles.InputBorder}
              autoCapitalize="characters"
              autoCorrect={false}
              value={code}
              onChangeText={(e) => setCode(e)}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            bottom: scaleHeight(25),
          }}
        >
          <ContinueButton
            onPress={handleContinue}
            useDefaultStyles={false}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default EnterCodeScreen;

const styles = StyleSheet.create({
  container: {
    ...generic.container,
    justifyContent: "space-evenly",
  },
  title: {
    ...generic.title,
  },
  textInput: {
    width: scaleWidth(200),
    alignSelf: "center",
    textAlign: "center",
  },
  InputBorder: {
    borderColor: Colors.yellow,
    borderRadius: scaleArea(20),
  },
});
