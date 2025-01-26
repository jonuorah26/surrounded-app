import Button from "@/app/Components/Button";
import { Colors } from "@/app/Constants/Colors";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

function ChooseFlagSystem() {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
    bottom: 40,
  },
  redButton: {
    backgroundColor: Colors.red,
  },
  greenButton: {
    backgroundColor: Colors.green,
  },
  containerButtons: {
    bottom: 40,
  },
  logo: {
    bottom: 100,
  },
});

export default ChooseFlagSystem;
