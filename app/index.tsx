import { NavigationIndependentTree } from "@react-navigation/native";

import { RootStack } from "./Screens/_layout";
import { View, StyleSheet } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    red: "tomato",
    yellow: "gold",
    blue: "dodgerblue",
    white: "#ffffff",
    black: "black",
    green: "green",
  },
};

export default function Index() {
  return (
    <View style={styles.container}>
      <PaperProvider theme={theme}>
        <NavigationIndependentTree>
          <RootStack />
        </NavigationIndependentTree>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
