import { Stack } from "expo-router";

export default function Layout() {
  return (
    // <Stack screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="StartScreen" />
    // </Stack>
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "default",
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartScreen" />
      <Stack.Screen name="(SessionOwner)" />
    </Stack>
  );
}
