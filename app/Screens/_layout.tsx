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
        name="Start"
        component={StartScreen}
        options={{ gestureEnabled: false, headerBackVisible: false }}
      />
      {CreateFlowScreens()}
      {JoinFlowScreens()}
      <Stack.Screen
        name="ModeratorScreen"
        key="ModeratorScreen"
        component={ModeratorDrawerNavigator}
      />
    </Stack.Navigator>
  );
}
