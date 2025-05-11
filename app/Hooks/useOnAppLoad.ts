// src/hooks/useLastPartyStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { NAVIGATION_LABELS } from "../Constants/Navigation";
import { useLoadingToast } from "../Context/LoadingToastContext";
import { fetchParticipant, fetchParty } from "../Firebase/FirestoreService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/Store";
import { update } from "firebase/database";
import {
  updateParty,
  updatePartyId as updatePartyId,
} from "../Store/PartyReducer";
import { useUserTypeContext } from "../Context/UserTypeContext";
import {
  updateParticipant,
  updateParticipantId,
} from "../Store/ParticipantReducer";

export const STORAGE_KEY = "lastSavedPartyData";

export type LastSavedPartyData = {
  role: "participant" | "moderator";
  partyId: string;
  participantId?: string;
  lastPage?: "partyCodeGenerated" | "moderatorControls";
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
    // await saveLastPartyData({
    //   role: "participant",
    //   partyId: "party_vf9zKWicM7quBUT7VfhW",
    //   participantId: "p_lmcdsT2pghsrsec6Jfvl",
    // });
    setToastMessage("");
    try {
      debugger;
      const lastSavedPartyData = await loadLastPartyData();
      console.log("lastSavedPartyData:", lastSavedPartyData);
      if (lastSavedPartyData) {
        const { partyData } = await fetchParty(lastSavedPartyData.partyId);
        //dispatch(updateParty(partyData));
        const role = lastSavedPartyData.role;

        if (role === "participant") {
          const { participantData } = await fetchParticipant(
            lastSavedPartyData.partyId,
            lastSavedPartyData.participantId ?? ""
          );
          dispatch(updateParty(partyData));
          dispatch(updatePartyId(lastSavedPartyData.partyId));
          dispatch(updateParticipant(participantData));
          dispatch(updateParticipantId(lastSavedPartyData.participantId ?? ""));
          setUserType("participant");
          setInitialRoute(NAVIGATION_LABELS.ParticipantScreen);
        } else {
          dispatch(updateParty(partyData));
          dispatch(updatePartyId(lastSavedPartyData.partyId));
          setUserType("moderator");
          switch (lastSavedPartyData.lastPage) {
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
