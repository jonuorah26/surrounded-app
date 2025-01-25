import Button from "@/app/Components/Button";
import { Colors } from "@/app/Constants/Colors";
import { generic } from "@/app/Constants/GenericStyles";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ChooseFlagSystem() {
  return (
    <View style={[generic.container]}>
      <View>
        <Text>Choose A Flag System</Text>
      </View>
      <View>
        <Button text="Red Flag" id="red-flag" onPress={() => {}} />
        <Button text="Green Flag" id="red-flag" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  containerButtons: {
    bottom: 40,
  },
  logo: {
    bottom: 100,
  },
});

export default ChooseFlagSystem;
