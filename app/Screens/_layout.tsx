// import { Stack } from "expo-router";
// import { Colors } from "../Constants/Colors";
// import { View } from "react-native";
// import { generic } from "../Constants/GenericStyles";

// export default function Layout() {
//   return (
//     // <Stack screenOptions={{ headerShown: false }}>
//     //   <Stack.Screen name="StartScreen" />
//     // </Stack>
//     <Stack
//       screenOptions={{
//         headerBackButtonDisplayMode: "default",
//         headerShown: false,
//         headerStyle: {
//           backgroundColor: "transparent",
//         },
//         contentStyle: { flex: 1, backgroundColor: "transparent" },
//       }}
//     >
//       <Stack.Screen name="StartScreen" />
//       <Stack.Screen name="(SessionOwner)" />
//     </Stack>
//   );
// }

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./StartScreen";
import ChooseFlagSystem from "./SessionOwner/CreateFlow/ChooseFlagSystem";
import AddParticipants from "./SessionOwner/CreateFlow/AddParticipants";

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        title: "",
        headerBackButtonDisplayMode: "minimal", // Show a minimal back button
      }}
    >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="ChooseFlagSystem" component={ChooseFlagSystem} />
      <Stack.Screen name="AddParticipants" component={AddParticipants} />
    </Stack.Navigator>
  );
}
