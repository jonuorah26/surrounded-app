import React, { useEffect, useRef } from "react";
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

  // useEffect(() => {
  //   if (!participantId) return;

  //   if (participantInSeat) {
  //     lastInSeatRef.current = {
  //       id: participantInSeat.id,
  //       manuallyLeft: false,
  //     };
  //   } else {
  //     if (
  //       lastInSeatRef.current.id === participantId &&
  //       !lastInSeatRef.current.manuallyLeft
  //     ) {
  //       setToastMessage("You have been removed from the seat.");
  //     }
  //     lastInSeatRef.current = {
  //       id: "",
  //       manuallyLeft: false,
  //     };
  //   }
  // }, [participantId, participantInSeat]);

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
