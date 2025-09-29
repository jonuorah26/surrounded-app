import { NavigationIndependentTree } from "@react-navigation/native";

import { RootStack } from "./Screens/_layout";
import { RootStack as WebRootStack } from "./WebScreens/RootStack";
import { View, StyleSheet, Platform } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserTypeProvider } from "./Context/UserTypeContext";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { LoadingToastProvider } from "./Context/LoadingToastContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { Colors, MOBILE_OS } from "./Constants";
import { DialogProvider } from "./Context/DialogContext";

// 👇 Call here, not inside a component
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore if already hidden */
});

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
  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowBanner: true, // 👈 show alert/banner even in foreground
  //     shouldPlaySound: true,
  //     shouldSetBadge: false,
  //     shouldShowList: false,
  //   }),
  // });

  const NavStack =
    Platform.OS in MOBILE_OS ? (
      <NavigationIndependentTree>
        <RootStack />
      </NavigationIndependentTree>
    ) : (
      <DialogProvider>
        <WebRootStack />
      </DialogProvider>
    );

  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <UserTypeProvider>
            <LoadingToastProvider>
              <SafeAreaProvider>{NavStack}</SafeAreaProvider>
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
    backgroundColor: Colors.blue,
    ...StyleSheet.absoluteFillObject,
  },
});
