import Button from "@/app/Components/Button";
import { Colors } from "@/app/Constants/Colors";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ChooseFlagSystem() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Choose A Flag System</Text>
      </View>
      <View>
        <Button
          text="Red Flag"
          id="red-flag"
          onPress={() => {}}
          styles={{ button: styles.redButton }}
        />
        <Button
          text="Green Flag"
          id="green-flag"
          onPress={() => {}}
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
    ...fontStyles.large,
    color: Colors.white,
    bottom: 40,
    alignSelf: "center",
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
