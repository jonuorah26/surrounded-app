import React from "react";
import AddParticipants from "./AddParticipants";
import AllowParticipantsDuringSession from "./AllowParticipantsDuringSession";
import ChooseFlagSystem from "./ChooseFlagSystem";
import ThresholdScreen from "./RedFlag/ThresholdScreen";
import PartyCodeGeneratedScreen from "./PartyCodeGeneratedScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { ExitToStart } from "@/app/Components";

const Stack = createNativeStackNavigator();
const CreateFlowScreens = () => [
  <Stack.Screen
    key={NAVIGATION_LABELS.ChooseFlagSystem}
    name={NAVIGATION_LABELS.ChooseFlagSystem}
    component={ChooseFlagSystem}
  />,
  <Stack.Screen
    key={NAVIGATION_LABELS.AddParticipants}
    name={NAVIGATION_LABELS.AddParticipants}
    component={AddParticipants}
  />,
  <Stack.Screen
    name={NAVIGATION_LABELS.AllowParticipantsDuringSession}
    component={AllowParticipantsDuringSession}
    key={NAVIGATION_LABELS.AllowParticipantsDuringSession}
  />,
  <Stack.Screen
    key={NAVIGATION_LABELS.Threshold}
    name={NAVIGATION_LABELS.Threshold}
    component={ThresholdScreen}
  />,
  <Stack.Screen
    name={NAVIGATION_LABELS.PartyCodeGenerated}
    key={NAVIGATION_LABELS.PartyCodeGenerated}
    options={{
      headerLeft: () => <ExitToStart />,
      gestureEnabled: false,
    }}
    component={PartyCodeGeneratedScreen}
  />,
];

export default CreateFlowScreens;
