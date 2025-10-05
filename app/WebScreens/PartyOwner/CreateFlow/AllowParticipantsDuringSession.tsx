import Button from "@/app/Components/Button";
import ContinueButton from "@/app/Components/ContinueButton";
import FlagIndicator from "@/app/Components/FlagIndicator";
import { Colors } from "@/app/Constants/Colors";
import { generic } from "@/app/Constants/GenericStyles";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigation } from "../../RootStack";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/Store/Store";
import { updateAllowParticipantsDuringSessionOption } from "@/app/Store/PartyReducer";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { rem } from "@/app/Constants";

function AllowParticipantsDuringSession() {
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch<AppDispatch>();

  const handleContinue = (option: boolean) => {
    dispatch(updateAllowParticipantsDuringSessionOption(option));
    navigate(NAVIGATION_LABELS.Threshold);
  };
  return (
    <View style={[generic.container]}>
      <FlagIndicator
        color={Colors.red}
        useRounded={false}
        id="flag-indicator-allow"
      />

      <View>
        <Text style={styles.title}>
          Allow More Participants During Session?
        </Text>
        <View>
          <Button
            styles={{ button: styles.button }}
            text="No"
            onPress={() => handleContinue(false)}
          />
          <Button
            styles={{ button: styles.button }}
            text="Yes"
            onPress={() => handleContinue(true)}
          />
        </View>
      </View>
    </View>
  );
}

export default AllowParticipantsDuringSession;

const styles = StyleSheet.create({
  title: {
    ...generic.title,
    fontSize: rem(3),
    textAlign: "center",
    bottom: 40,
  },
  button: {
    width: "100%",
    alignSelf: "center",
    maxWidth: "1000px" as any,
  },
});
