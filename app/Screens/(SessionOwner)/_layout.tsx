import { Stack } from "expo-router";

export default function Layout() {
  return (
    // <Stack screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="StartScreen" />
    // </Stack>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(CreateFlow)" />
    </Stack>
  );
}
