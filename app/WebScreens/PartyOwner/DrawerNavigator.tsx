import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ModeratorScreen from "./ModeratorScreen";
import DrawerContent from "./DrawerContent";
import { scaleWidth } from "@/app/Constants/Dimensions";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import ViewParticipantsScreen from "./DrawerScreens/ViewParticipantsScreen";
import { Colors } from "@/app/Constants/Colors";

const Drawer = createDrawerNavigator();

export default function ModeratorDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName={NAVIGATION_LABELS.Drawer_ModeratorScreen}
      drawerContent={(props) => <DrawerContent {...props} />} // Optional custom drawer
      screenOptions={{
        headerShown: false, // Hide header if you don't want it
        drawerStyle: {
          backgroundColor: Colors.drawerBackgroundColor,
          width: scaleWidth(320),
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#aaa",
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen
        name={NAVIGATION_LABELS.Drawer_ModeratorScreen}
        component={ModeratorScreen}
      />
      <Drawer.Screen
        name={NAVIGATION_LABELS.Drawer_ViewParticipants}
        options={{ swipeEnabled: false }}
        component={ViewParticipantsScreen}
      />
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
}
