import Button from "@/app/Components/Button";
import { Colors } from "@/app/Constants/Colors";
import { generic } from "@/app/Constants/GenericStyles";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { StackNavigation } from "../../RootStack";
import { AppDispatch } from "@/app/Store/Store";
import { useDispatch } from "react-redux";
import { updateFlagSystem } from "@/app/Store/PartyReducer";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { useDialog } from "@/app/Context/DialogContext";
import { rem } from "@/app/Constants";

function ChooseFlagSystem() {
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch<AppDispatch>();
  const { dialog } = useDialog();

  const handlePress = (id: string) => {
    if (id === "red-flag") {
      dispatch(updateFlagSystem("red"));
    } else {
      dispatch(updateFlagSystem("green"));
      dialog("Working on it!", "Feature not available yet, but coming soon!");
      return;
    }
    navigate(NAVIGATION_LABELS.AddParticipants);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Choose A Flag System</Text>
      </View>
      <View>
        <Button
          text="Red Flag"
          onPress={() => handlePress("red-flag")}
          styles={{ button: styles.redButton }}
        />
        <Button
          text="Green Flag"
          onPress={() => handlePress("green-flag")}
          styles={{ button: styles.greenButton }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...generic.container,
  },
  title: {
    ...generic.title,
    fontSize: rem(2.8),
    textAlign: "center",
    bottom: "110%",
  },
  redButton: {
    backgroundColor: Colors.red,
    width: "100%",
    alignSelf: "center",
    maxWidth: "1000px" as any,
  },
  greenButton: {
    backgroundColor: Colors.green,
    width: "100%",
    alignSelf: "center",
    maxWidth: "1000px" as any,
  },
});

export default ChooseFlagSystem;
