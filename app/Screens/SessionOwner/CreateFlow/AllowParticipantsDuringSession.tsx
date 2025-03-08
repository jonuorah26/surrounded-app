import Button from "@/app/Components/Button";
import ContinueButton from "@/app/Components/ContinueButton";
import FlagIndicator from "@/app/Components/FlagIndicator";
import { Colors } from "@/app/Constants/Colors";
import { generic } from "@/app/Constants/GenericStyles";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigation } from "../../_layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/Store/Store";
import { updateAllowParticipantsDuringSessionOption } from "@/app/Store/ModeratorReducer";

function AllowParticipantsDuringSession() {
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch<AppDispatch>();

  const handleContinue = (option: boolean) => {
    dispatch(updateAllowParticipantsDuringSessionOption(option));
    navigate("Threshold");
  };
  return (
    <View style={generic.container}>
      <FlagIndicator color={Colors.red} useRounded={false} />

      <View>
        <Text style={styles.title}>
          Allow More Particiapnts During Session?
        </Text>
        <View>
          <Button text="No" onPress={() => handleContinue(false)} />
          <Button text="Yes" onPress={() => handleContinue(true)} />
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
