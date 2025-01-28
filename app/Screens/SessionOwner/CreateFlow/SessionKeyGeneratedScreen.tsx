import ContinueButton from "@/app/Components/ContinueButton";
import FlagIndicator from "@/app/Components/FlagIndicator";
import { Colors } from "@/app/Constants/Colors";
import { generic } from "@/app/Constants/GenericStyles";
import React from "react";
import { View } from "react-native";

function SessionKeyGeneratedScreen() {
  return (
    <View style={generic.container}>
      <FlagIndicator color={Colors.red} />

      <ContinueButton onPress={() => {}} />
    </View>
  );
}

export default SessionKeyGeneratedScreen;
