import React, { useEffect } from "react";
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
  const { dbCollectionId: participantId } = useSelector(
    (state: RootState) => state.participant
  );
  const {
    partyData: { participantInSeat },
    dbCollectionId: partyId,
  } = useSelector((state: RootState) => state.party);
  const showOverlay = participantId === participantInSeat?.id;
  const { setLoadingText, setToastMessage } = useLoadingToast();
  //console.log(participantId, "===", participantInSeat?.id); //99

  const handleRemoveFromSeat = async () => {
    try {
      setLoadingText("Leaving seat...");
      setToastMessage("");
      await RemoveFromSeat(partyId);
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
