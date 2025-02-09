import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
// import SettingsScreen from "@/app/Screens/SettingsScreen"; // Example screen for the drawer
//import CustomDrawerContent from "@/app/Components/CustomDrawerContent"; // If you want a custom drawer UI
import { scaleWidth } from "@/app/Constants/Dimensions";
import ParticipantScreen from "./ParticipantScreen";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

export default function ParticipantDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Participant"
      drawerContent={(props) => <DrawerContent {...props} />} // Optional custom drawer
      screenOptions={{
        headerShown: false, // Hide header if you don't want it
        drawerStyle: { backgroundColor: "#222", width: scaleWidth(320) },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#aaa",
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen name="Participant" component={ParticipantScreen} />
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
}
