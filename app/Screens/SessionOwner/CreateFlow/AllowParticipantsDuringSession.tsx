import Button from "@/app/Components/Button";
import ContinueButton from "@/app/Components/ContinueButton";
import FlagIndicator from "@/app/Components/FlagIndicator";
import { Colors } from "@/app/Constants/Colors";
import { generic } from "@/app/Constants/GenericStyles";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigation } from "../../_layout";

function AllowParticipantsDuringSession() {
  const { navigate } = useNavigation<StackNavigation>();
  const handleContinue = () => {
    navigate("Threshold");
  };
  return (
    <View style={generic.container}>
      <FlagIndicator color={Colors.red} />

      <View>
        <Text style={styles.title}>
          Allow More Particiapnts During Session?
        </Text>
        <View>
          <Button text="No" onPress={handleContinue} />
          <Button text="Yes" onPress={handleContinue} />
        </View>
      </View>
    </View>
  );
}

export default AllowParticipantsDuringSession;

const styles = StyleSheet.create({
  title: {
    ...generic.title,
    bottom: 40,
  },
});
