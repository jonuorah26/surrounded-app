import Button from "@/app/Components/Button";
import { Colors } from "@/app/Constants/Colors";
import { generic } from "@/app/Constants/GenericStyles";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { StackNavigation } from "../../_layout";
import { AppDispatch } from "@/app/Store/Store";
import { useDispatch } from "react-redux";
import { updateFlagSystem } from "@/app/Store/PartyReducer";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";

function ChooseFlagSystem() {
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = (id: string) => {
    if (id === "red-flag") {
      dispatch(updateFlagSystem("red"));
    } else {
      dispatch(updateFlagSystem("green"));
      return;
    }
    navigate(NAVIGATION_LABELS.AddParticipants);
  };

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  //     .then(async (token) => {
  //       console.log(`token: ${token}`);
  //       await updateTestToken(token);
  //     })
  //     .catch((err) => {
  //       console.log("registering failed");
  //       console.error(err);
  //     });
  // }, []);

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
    //bottom: 40,
    bottom: "110%",
  },
  redButton: {
    backgroundColor: Colors.red,
  },
  greenButton: {
    backgroundColor: Colors.green,
  },
});

export default ChooseFlagSystem;
