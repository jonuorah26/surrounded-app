import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import StartScreen from "./StartScreen";

import { Colors } from "../Constants/Colors";

import { ParamListBase } from "@react-navigation/native";

import ModeratorDrawerNavigator from "./PartyOwner/DrawerNavigator";
import JoinFlowScreens from "./PartyParticipants/JoinFlow/Navigation";
import CreateFlowScreens from "./PartyOwner/CreateFlow/NavigationScreens";
import ParticipantDrawerNavigator from "./PartyParticipants/DrawerNavigator";
import { NAVIGATION_LABELS } from "../Constants/Navigation";
import { useCallback, useEffect, useState } from "react";
import Toast from "../Components/Toast";
import LoadingOverlay from "../Components/LoadingOverlay";
import { useOnAppLoad } from "../Hooks";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

const Stack = createNativeStackNavigator();
export type StackNavigation = NativeStackNavigationProp<ParamListBase>;

export function RootStack() {
  const { initialRoute } = useOnAppLoad();

  const onLayoutRootView = useCallback(async () => {
    if (initialRoute) {
      await SplashScreen.hideAsync();
    }
  }, [initialRoute]);

  if (!initialRoute) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerTransparent: true,
          title: "",
          headerBackButtonDisplayMode: "minimal", // Show a minimal back button
          headerTintColor: Colors.yellow,
        }}
      >
        <Stack.Screen
          name={NAVIGATION_LABELS.Start}
          key={NAVIGATION_LABELS.Start}
          component={StartScreen}
          options={{ gestureEnabled: false, headerBackVisible: false }}
        />
        {CreateFlowScreens()}
        {JoinFlowScreens()}
        <Stack.Screen
          key={NAVIGATION_LABELS.ParticipantScreen}
          name={NAVIGATION_LABELS.ParticipantScreen}
          component={ParticipantDrawerNavigator}
          //TODO: uncomment below 'options' later. Just commented out for ease of testing
          options={{ gestureEnabled: false, headerBackVisible: false }}
        />
        <Stack.Screen
          name={NAVIGATION_LABELS.ModeratorScreen}
          key={NAVIGATION_LABELS.ModeratorScreen}
          //TODO: uncomment below 'options' later. Just commented out for ease of testing
          options={{ gestureEnabled: false, headerBackVisible: false }}
          component={ModeratorDrawerNavigator}
        />
      </Stack.Navigator>
    </View>
  );
}
