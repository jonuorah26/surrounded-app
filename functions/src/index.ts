import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import { Expo, ExpoPushMessage } from "expo-server-sdk";
import {
  ParticipantData,
  PARTIES,
  PartyData,
  VoteOutThresholdType,
} from "./types";

admin.initializeApp();
const db = admin.firestore();
const expo = new Expo();

type TestTrigger = {
  trigger: boolean;
  token: string;
};

export const sendTestNotification = onDocumentUpdated(
  "testing/testNotification",
  async (event) => {
    const before = event.data?.before?.data() as TestTrigger;
    const after = event.data?.after?.data() as TestTrigger;
    // const partyId = event.params.partyId;

    if (!before || !after) return;

    // console.log(`Test notification triggered for party ${partyId}`);

    const message: ExpoPushMessage = {
      to: after.token,
      sound: "default",
      title: "Test",
      body: "This is a test notifcation from the cloud function",
      channelId: "default",
    };

    try {
      const ticketChunk = await expo.sendPushNotificationsAsync([message]);
      return { success: true, ticketChunk };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to send notification");
    }
  }
);

export const sendThresholdReachedNotification = onDocumentUpdated(
  "Parties/{partyId}",
  async (event) => {
    const before = event.data?.before?.data() as PartyData;
    const after = event.data?.after?.data() as PartyData;
    const partyId = event.params.partyId;

    if (!before || !after) return;

    if (
      before.flagsRaisedCount === after.flagsRaisedCount &&
      before.flagSystem === after.flagSystem
    ) {
      return;
    }

    const voteOutThresholdType =
      after.voteOutThresholdType as VoteOutThresholdType;
    let threshold = null;
    switch (voteOutThresholdType) {
      case "all":
        threshold = after.participantCount - 1;
        break;
      case "custom":
        threshold = after.customVoteOutThreshold ?? 0;
        break;
      case "majority":
        threshold = after.participantCount - 1;
        threshold = Math.floor(threshold / 2) + 1;
        break;
    }
    if (threshold === 0 || threshold === null) return;

    try {
      const notifcationSent = after.notifications.thresholdReachedSent;

      if (after.flagsRaisedCount < threshold) {
        if (notifcationSent) {
          await db.collection(PARTIES).doc(partyId).update({
            "notifications.thresholdReachedSent": false,
          });
        }

        return;
      } else {
        if (notifcationSent) {
          return;
        }
      }

      const participantsSnap = await db
        .collection("Parties")
        .doc(partyId)
        .collection("Participants")
        .get();

      const message: Partial<ExpoPushMessage> = {
        sound: "default",
        title: "‼️Threshold Reached‼️",
        body: "The flag threshold has been reached!",
        channelId: "default",
      };

      const messages: ExpoPushMessage[] = [];

      messages.push({
        to: after.moderatorPushToken,
        ...message,
      });

      participantsSnap.forEach((doc) => {
        const token = (doc.data() as ParticipantData).pushToken;
        if (Expo.isExpoPushToken(token)) {
          messages.push({
            to: token,
            ...message,
          });
        }
      });

      const chunks = expo.chunkPushNotifications(messages);
      let sent = false;
      for (const chunk of chunks) {
        try {
          await expo.sendPushNotificationsAsync(chunk);
          sent = true;
        } catch (error) {
          console.error("Error sending notification chunk:", error);
        }
      }

      await db.collection(PARTIES).doc(partyId).update({
        "notifications.thresholdReachedSent": sent,
      });

      return null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
