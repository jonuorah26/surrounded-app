import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EnterCodeScreen from "./EnterCodeScreen";
import { Colors } from "@/app/Constants/Colors";
import EnterNameScreen from "./EnterNameScreen";
import ParticipantDrawerNavigator from "../DrawerNavigator";

const Stack = createNativeStackNavigator();

const JoinFlowScreens = () => [
  <Stack.Screen key="EnterCode" name="EnterCode" component={EnterCodeScreen} />,
  <Stack.Screen key="EnterName" name="EnterName" component={EnterNameScreen} />,
];

export default JoinFlowScreens;
