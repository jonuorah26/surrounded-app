import { NavigationIndependentTree } from "@react-navigation/native";

import { RootStack } from "./Screens/_layout";
import { View, StyleSheet } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserTypeProvider } from "./Context/UserTypeContext";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { LoadingToastProvider } from "./Context/LoadingToastContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <UserTypeProvider>
            <LoadingToastProvider>
              <SafeAreaProvider>
                <NavigationIndependentTree>
                  <RootStack />
                </NavigationIndependentTree>
              </SafeAreaProvider>
            </LoadingToastProvider>
          </UserTypeProvider>
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
