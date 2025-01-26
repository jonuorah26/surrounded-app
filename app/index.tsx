import { NavigationIndependentTree } from "@react-navigation/native";

import { RootStack } from "./Screens/_layout";
import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <NavigationIndependentTree>
        <RootStack />
      </NavigationIndependentTree>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
