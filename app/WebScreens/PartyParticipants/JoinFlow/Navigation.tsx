import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EnterCodeScreen from "./EnterCodeScreen";
import EnterNameScreen from "./EnterNameScreen";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";

const Stack = createNativeStackNavigator();

const JoinFlowScreens = () => [
  <Stack.Screen
    key={NAVIGATION_LABELS.EnterCode}
    name={NAVIGATION_LABELS.EnterCode}
    component={EnterCodeScreen}
  />,
  <Stack.Screen
    key={NAVIGATION_LABELS.EnterName}
    name={NAVIGATION_LABELS.EnterName}
    component={EnterNameScreen}
  />,
];

export default JoinFlowScreens;
