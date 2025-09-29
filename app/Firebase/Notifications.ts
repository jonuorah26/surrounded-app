import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { MOBILE_OS } from "../Constants";

export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  if (
    !(Platform.OS in MOBILE_OS) ||
    !Device.isDevice ||
    Platform.OS ===
      "ios" /* FIXME: remove ios condition once iOS notifications implemented */
  ) {
    return "N/A";
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
