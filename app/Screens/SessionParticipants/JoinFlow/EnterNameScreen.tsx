import ContinueButton from "@/app/Components/ContinueButton";
import { Colors } from "@/app/Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import { generic } from "@/app/Constants/GenericStyles";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import { StackNavigation } from "../../_layout";

function EnterNameScreen() {
  const [name, setName] = useState("");
  const { navigate } = useNavigation<StackNavigation>();

  const handleContinue = () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    //navigate("EnterName");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "flex-end", gap: scaleHeight(50) }}
        >
          <View style={{}}>
            <Text style={styles.title}>Enter A Name To Use</Text>
          </View>
          <View style={{}}>
            <TextInput
              mode="outlined"
              keyboardType="ascii-capable"
              style={styles.textInput}
              outlineStyle={styles.InputBorder}
              autoCorrect={false}
              value={name}
              onChangeText={(e) => setName(e)}
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
            text="Enter Session"
            onPress={handleContinue}
            useDefaultStyles={false}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default EnterNameScreen;

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
