import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
// import SettingsScreen from "@/app/Screens/SettingsScreen"; // Example screen for the drawer
//import CustomDrawerContent from "@/app/Components/CustomDrawerContent"; // If you want a custom drawer UI
import { scaleWidth } from "@/app/Constants/Dimensions";
import ParticipantScreen from "./ParticipantScreen";
import DrawerContent from "./DrawerContent";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import LoadingOverlay from "@/app/Components/LoadingOverlay";
import Toast from "@/app/Components/Toast";

const Drawer = createDrawerNavigator();

export default function ParticipantDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={NAVIGATION_LABELS.Drawer_ParticipantScreen}
      drawerContent={(props) => <DrawerContent {...props} />} // Optional custom drawer
      screenOptions={{
        headerShown: false, // Hide header if you don't want it
        drawerStyle: { backgroundColor: "#222", width: scaleWidth(320) },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#aaa",
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen
        name={NAVIGATION_LABELS.Drawer_ParticipantScreen}
        component={ParticipantScreen}
      />
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
}
