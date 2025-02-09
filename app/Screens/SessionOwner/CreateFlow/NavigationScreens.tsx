import React from "react";
import { StackNavigation } from "../../_layout";
import { useNavigation } from "@react-navigation/native";
import { Alert, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { Colors } from "@/app/Constants/Colors";
import AddParticipants from "./AddParticipants";
import AllowParticipantsDuringSession from "./AllowParticipantsDuringSession";
import ChooseFlagSystem from "./ChooseFlagSystem";
import ThresholdScreen from "./RedFlag/ThresholdScreen";
import SessionKeyGeneratedScreen from "./SessionKeyGeneratedScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const CreateFlowScreens = () => [
  <Stack.Screen
    key="ChooseFlagSystem"
    name="ChooseFlagSystem"
    component={ChooseFlagSystem}
  />,
  <Stack.Screen
    key="AddParticipants"
    name="AddParticipants"
    component={AddParticipants}
  />,
  <Stack.Screen
    name={"AllowParticipantsDuringSession"}
    component={AllowParticipantsDuringSession}
    key="AllowParticipantsDuringSession"
  />,
  <Stack.Screen key="Threshold" name="Threshold" component={ThresholdScreen} />,
  <Stack.Screen
    name="SessionKeyGenerated"
    key="SessionKeyGenerated"
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
  />,
];

export default CreateFlowScreens;
