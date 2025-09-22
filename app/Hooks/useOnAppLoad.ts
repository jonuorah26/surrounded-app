// src/hooks/useLastPartyStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { NAVIGATION_LABELS } from "../Constants/Navigation";
import { useLoadingToast } from "../Context/LoadingToastContext";
import {
  fetchParticipant,
  fetchParty,
  updatePushToken,
} from "../Firebase/FirestoreService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/Store";
import { update } from "firebase/database";
import {
  updateParty,
  updatePartyId as updatePartyId,
} from "../Store/PartyReducer";
import { UserType, useUserTypeContext } from "../Context/UserTypeContext";
import {
  updateParticipant,
  updateParticipantId,
} from "../Store/ParticipantReducer";

import { registerForPushNotificationsAsync } from "../Firebase/Notifications";
import { Platform } from "react-native";

export const STORAGE_KEY = "lastSavedPartyData";

export type LastSavedPartyData =
  | {
      role: "moderator";
      partyId: string;
      lastPage: "partyCodeGenerated" | "moderatorControls";
    }
  | {
      role: "participant";
      partyId: string;
      participantId: string;
    };

const testLastSaved: LastSavedPartyData = {
  role: "moderator",
  partyId: "", //enter partyId,
  lastPage: "moderatorControls",
};

export const saveLastPartyData = async (data: LastSavedPartyData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    console.log("AsyncStorage.getItem(STORAGE_KEY):", json);
  } catch (e) {
    //console.error("Error saving party data:", e);
    throw e;
  }
};

export const loadLastPartyData =
  async (): Promise<LastSavedPartyData | null> => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : null;
    } catch (e) {
      // console.error("Error loading party data:", e);
      // return null;
      throw e;
    }
  };

export const clearLastPartyData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    //console.error("Error clearing party data:", e);
    throw e;
  }
};

export const useOnAppLoad = () => {
  const [initialRoute, setInitialRoute] = useState<
    (typeof NAVIGATION_LABELS)[keyof typeof NAVIGATION_LABELS] | null
  >(null);
  const { setToastMessage } = useLoadingToast();
  const dispatch = useDispatch<AppDispatch>();
  const { setUserType } = useUserTypeContext();

  const handleAppLoad = async () => {
    setToastMessage("");
    try {
      //to test, enter partyData below that you want to be load
      // await saveLastPartyData({
      //   role: "moderator",
      //   lastPage: "moderatorControls",
      //   partyId: "party_E0iL46qItXBw1ZUfz7Ef",
      // });
      //await clearLastPartyData();

      const lastSavedPartyData = await loadLastPartyData();
      console.log("lastSavedPartyData:", lastSavedPartyData);

      if (lastSavedPartyData) {
        const pushToken = await registerForPushNotificationsAsync();

        const { role, partyId } = lastSavedPartyData;
        const { partyData } = await fetchParty(partyId);

        if (role === "participant") {
          const { participantId } = lastSavedPartyData;
          const { participantData } = await fetchParticipant(
            partyId,
            participantId ?? ""
          );
          await updatePushToken(pushToken, partyId, participantId);
          dispatch(updateParty(partyData));
          dispatch(updatePartyId(partyId));
          dispatch(updateParticipant(participantData));
          dispatch(updateParticipantId(participantId ?? ""));
          setUserType("participant");
          setInitialRoute(NAVIGATION_LABELS.ParticipantScreen);
        } else {
          await updatePushToken(pushToken, partyId);

          const { lastPage } = lastSavedPartyData;
          dispatch(updateParty(partyData));
          dispatch(updatePartyId(partyId));
          setUserType("moderator");
          switch (lastPage) {
            case "partyCodeGenerated":
              setInitialRoute(NAVIGATION_LABELS.PartyCodeGenerated);
              break;
            case "moderatorControls":
              setInitialRoute(NAVIGATION_LABELS.ModeratorScreen);
              break;
          }
        }
      } else {
        setInitialRoute(NAVIGATION_LABELS.Start);
      }
    } catch (err) {
      //setToastMessage(err.message);
      //console.error(err.message);
      setInitialRoute(NAVIGATION_LABELS.Start);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    //   handleAppLoad();
    // }, 8000);
    handleAppLoad();
  }, []);

  return { initialRoute };
};
