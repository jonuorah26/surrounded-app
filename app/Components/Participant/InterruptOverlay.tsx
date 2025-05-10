import React, { useEffect, useState } from "react";
import Overlay from "../Overlay";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/Store";
import { StackNavigation } from "@/app/Screens/_layout";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { reset as partyReset } from "@/app/Store/PartyReducer";
import { reset as participantReset } from "@/app/Store/ParticipantReducer";
import { OVERLAY_INTERRUPT_Z_INDEX } from "@/app/Constants/GenericStyles";
import { clearLastPartyData } from "@/app/Hooks";

const COUNTDOWN = 10;

export function InterruptOverlay() {
  const [headerText, setHeaderText] = useState("");
  const [subText, setSubText] = useState("");
  const [subText2, setSubText2] = useState("");
  const [countdown, setCountdown] = useState(COUNTDOWN);
  const { isEnded, isPaused, isStarted } = useSelector(
    (state: RootState) => state.party.partyData
  );
  const {
    participantData: { isDisabled },
    isDeleted,
  } = useSelector((state: RootState) => state.participant);
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useNavigation<StackNavigation>();

  useEffect(() => {
    if (isDeleted) {
      setHeaderText("You are no longer part of this party");
      setSubText(
        `You might have been removed by the moderator, please check with them. You will be redirected now in...`
      );
      setSubText2(`${countdown}`);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          --prev;
          setSubText2(`${prev}`);
          return prev;
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        setCountdown(COUNTDOWN);
        setSubText("");
        setSubText2("");
        dispatch(partyReset());
        dispatch(participantReset());
        clearLastPartyData();
        navigate(NAVIGATION_LABELS.Start);
      }, COUNTDOWN * 1000);
    } else if (isEnded) {
      setHeaderText("Party Ended");
      setSubText(
        `The moderator has ended the session. You will be redirected now in...`
      );
      setSubText2(`${countdown}`);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          --prev;
          setSubText2(`${prev}`);
          return prev;
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        setCountdown(COUNTDOWN);
        setSubText("");
        setSubText2("");
        dispatch(partyReset());
        dispatch(participantReset());
        clearLastPartyData();
        navigate(NAVIGATION_LABELS.Start);
      }, COUNTDOWN * 1000);
    } else if (!isStarted) {
      setHeaderText("Waiting on Host");
      setSubText("Waiting on the moderator to start the session.");
    } else if (isPaused) {
      setHeaderText("Paused");
      setSubText("Session paused. Please wait for moderator to unpause.");
    } else if (isDisabled) {
      setHeaderText("Disabled");
      setSubText("The moderator has disabled your device.");
    } else {
      setHeaderText("");
      setSubText("");
    }
  }, [isEnded, isStarted, isPaused, isDisabled, isDeleted]);
  return (
    <>
      {headerText !== "" && (
        <Overlay
          headerText={headerText}
          subText={subText}
          subText2={subText2}
          overlayLevel={OVERLAY_INTERRUPT_Z_INDEX}
        />
      )}
    </>
  );
}
