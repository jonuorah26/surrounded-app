import React, { useEffect, useRef, useState } from "react";
import Overlay from "../Overlay";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Store/Store";
import { Colors } from "@/app/Constants/Colors";
import { View } from "react-native";
import Button from "../Button";
import { scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import { RemoveFromSeat } from "@/app/Firebase/FirestoreService";
import { AppError } from "@/app/Firebase/Types";
import { CLICK_SPAM_TIMEOUT } from "@/app/Constants";

export default function InSeatOverlay() {
  const { id: participantId } = useSelector(
    (state: RootState) => state.participant.participantData
  );
  const {
    partyData: { participantInSeat, id: partyId },
  } = useSelector((state: RootState) => state.party);
  // const showOverlay = participantId === participantInSeat?.id;
  const showOverlay =
    participantInSeat.seatFilled &&
    participantId === participantInSeat.lastInSeat?.id;
  const { setLoadingText, setToastMessage } = useLoadingToast();

  const lastInSeatRef = useRef({
    id: "",
    manuallyLeft: false,
  });

  const clickDataRef = useRef<{
    count: number;
    timeoutRef: NodeJS.Timeout | number;
  }>({
    count: 0,
    timeoutRef: 0,
  });

  const handleRemoveFromSeat = async () => {
    try {
      setLoadingText("Leaving seat...");
      setToastMessage("");
      await RemoveFromSeat(partyId, "participant");
      //lastInSeatRef.current.manuallyLeft = true;
      setToastMessage("You have left the seat!");
    } catch (err) {
      if (err instanceof AppError) {
        setToastMessage(err.message);
      } else {
        setToastMessage(
          "Error occured attempting to leave seat. Please try again."
        );
      }
    }
    setLoadingText("");
  };

  const handeleTapSpam = () => {
    const clickData = clickDataRef.current;

    ++clickData.count;
    console.log("count:", clickData.count);
    if (clickData.count === 1) {
      clickData.timeoutRef = setTimeout(() => {
        clickData.count = 0;
      }, CLICK_SPAM_TIMEOUT);
    } else if (clickData.count > 3) {
      alert(`Press and hold to leave the seat`);
      clickData.count = 0;
      clearTimeout(clickData.timeoutRef);
    }
  };

  return (
    showOverlay && (
      <View
        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <Overlay
          headerText="You are in the seat"
          overlayColor={Colors.inSeatOverlay}
        />
        <Button
          text="Leave Seat"
          onLongPress={handleRemoveFromSeat}
          onPress={handeleTapSpam}
          styles={{
            button: {
              zIndex: 10,
              top: scaleHeight(700),
              alignSelf: "center",
            },
          }}
        />
      </View>
    )
  );
}
