import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import StartScreen from "./StartScreen";
import ChooseFlagSystem from "./SessionOwner/CreateFlow/ChooseFlagSystem";
import AddParticipants from "./SessionOwner/CreateFlow/AddParticipants";
import ThresholdScreen from "./SessionOwner/CreateFlow/RedFlag/ThresholdScreen";
import { Colors } from "../Constants/Colors";
import SessionKeyGeneratedScreen from "./SessionOwner/CreateFlow/SessionKeyGeneratedScreen";
import AllowParticipantsDuringSession from "./SessionOwner/CreateFlow/AllowParticipantsDuringSession";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { fontStyles } from "../Constants/GenericStyles";
import { Alert, TouchableOpacity } from "react-native";
import ModeratorScreen from "./SessionOwner/ModeratorScreen";
import ModeratorDrawerNavigator from "./SessionOwner/DrawerNavigator";
import CreateFlowNavigationScreens from "./SessionOwner/CreateFlow/NavigationScreens";

export const Stack = createNativeStackNavigator();
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
        name="ModeratorScreen"
        component={ModeratorDrawerNavigator}
      />
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ gestureEnabled: false, headerBackVisible: false }}
      />
      <Stack.Screen name="CreateFlow" component={CreateFlowNavigationScreens} />
    </Stack.Navigator>
  );
}
