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
      <Stack.Screen name="ModeratorScreen" component={ModeratorScreen} />
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ gestureEnabled: false, headerBackVisible: false }}
      />
      <Stack.Screen name="ChooseFlagSystem" component={ChooseFlagSystem} />
      <Stack.Screen name="AddParticipants" component={AddParticipants} />
      <Stack.Screen
        name={"AllowParticipantsDuringSession"}
        component={AllowParticipantsDuringSession}
      />
      <Stack.Screen name="Threshold" component={ThresholdScreen} />
      <Stack.Screen
        name="SessionKeyGenerated"
        component={SessionKeyGeneratedScreen}
        options={{
          headerLeft: () => {
            const router = useNavigation<StackNavigation>();

            const handleExit = () => {
              Alert.alert(
                "Alert",
                "Exiting will end the session. Are you sure you want to leave?",
                [
                  {
                    text: "Yes",
                    onPress: () => router.navigate("Start"),
                    style: "destructive",
                  },
                  {
                    text: "No",
                    style: "cancel",
                  },
                ]
              );
            };

            return (
              <TouchableOpacity onPress={handleExit}>
                <MaterialIcons
                  name="exit-to-app"
                  size={fontStyles.large.fontSize + 2}
                  color={Colors.yellow}
                />
              </TouchableOpacity>
            );
          },
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
