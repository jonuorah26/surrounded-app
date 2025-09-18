//import BackgroundTimer from "react-native-background-timer";
import { ref, remove, update } from "firebase/database";
import { rtDb } from "./FirebaseConfig";
import { PARTICIPANTS, PARTIES } from "../Constants/DbConstants";
import { ParticipantPresence } from "../Types";

// let presenceInterval: number | null = null;
let presenceInterval: NodeJS.Timeout | null = null;

/**
 * Updates the lastActive timestamp in the Realtime Database.
 */
const updateLastActive = async (partyId: string, participantId: string) => {
  const now = Date.now();

  try {
    await update(
      ref(rtDb, `${PARTIES}/${partyId}/${PARTICIPANTS}/${participantId}`),
      {
        lastActive: now,
      } as ParticipantPresence
    );
  } catch (err) {
    console.error(`Failed to update lastActive for ${participantId}:`, err);
  }
};

/**
 * Starts periodically updating lastActive every 10 seconds.
 */
export const startPresenceUpdates = (
  partyId: string,
  participantId: string
) => {
  // Immediately do one update
  updateLastActive(partyId, participantId);

  presenceInterval = setInterval(() => {
    updateLastActive(partyId, participantId);
  }, 10000);
};

/**
 * Stops the presence update loop.
 */
export const stopPresenceUpdates = () => {
  if (presenceInterval)
    //BackgroundTimer.stopBackgroundTimer();
    clearInterval(presenceInterval);
};

export const removeParticipantPresenceTracking = async (
  partyId: string,
  participantId: string
) => {
  try {
    const rtdbParticipantRef = ref(
      rtDb,
      `${PARTIES}/${partyId}/${PARTICIPANTS}/${participantId}`
    );
    await remove(rtdbParticipantRef);
  } catch (err) {
    throw err;
  }
};

//below functions are/were for testing

export const updateTestToken = async (token: string | null) => {
  try {
    await update(ref(rtDb), {
      token,
    });
  } catch (err) {}
};
