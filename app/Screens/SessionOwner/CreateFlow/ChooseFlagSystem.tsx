import Button from "@/app/Components/Button";
import { Colors } from "@/app/Constants/Colors";
import { generic } from "@/app/Constants/GenericStyles";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StackNavigation } from "../../_layout";
import { useUserTypeContext } from "@/app/Context/UserTypeContext";

function ChooseFlagSystem() {
  const { navigate } = useNavigation<StackNavigation>();
  const { userType } = useUserTypeContext();

  // useEffect(() => {
  //   console.log("userType:", userType);
  // }, []);

  const handlePress = (id: string) => {
    if (id === "red-flag") {
      navigate("AddParticipants");
    } else {
    }
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
