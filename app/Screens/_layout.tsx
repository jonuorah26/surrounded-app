import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import StartScreen from "./StartScreen";

import { Colors } from "../Constants/Colors";

import { ParamListBase } from "@react-navigation/native";

import ModeratorDrawerNavigator from "./SessionOwner/DrawerNavigator";
import JoinFlowScreens from "./SessionParticipants/JoinFlow/Navigation";
import CreateFlowScreens from "./SessionOwner/CreateFlow/NavigationScreens";
import ParticipantDrawerNavigator from "./SessionParticipants/DrawerNavigator";
import { NAVIGATION_LABELS } from "../Constants/Navigation";

const Stack = createNativeStackNavigator();
export type StackNavigation = NativeStackNavigationProp<ParamListBase>;

export function RootStack() {
  return (
    <Stack.Navigator
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
        //options={{ gestureEnabled: false, headerBackVisible: false }}
      />
      <Stack.Screen
        name={NAVIGATION_LABELS.ModeratorScreen}
        key={NAVIGATION_LABELS.ModeratorScreen}
        component={ModeratorDrawerNavigator}
        //TODO: uncomment below 'options' later. Just commented out for ease of testing
        //options={{ gestureEnabled: false, headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}
