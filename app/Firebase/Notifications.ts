import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  if (Platform.OS === "ios" || !Device.isDevice) {
    return "MockTocken"; //FIXME: remove once iOS notifications implemented
  }

  let token: string | null = null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.warn("Failed to get push token");
    return null;
  }
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  token = (
    await Notifications.getExpoPushTokenAsync({
      projectId,
    })
  ).data;
  console.log("Expo push token:", token);

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}
