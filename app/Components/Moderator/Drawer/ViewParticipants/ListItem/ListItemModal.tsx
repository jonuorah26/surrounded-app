import LoadingOverlay from "@/app/Components/LoadingOverlay";
import Toast from "@/app/Components/Toast";
import { Colors, scaleHeight } from "@/app/Constants";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import {
  enterSeat,
  modifyDisable,
  modifyFlag,
  RemoveFromSeat,
} from "@/app/Firebase/FirestoreService";
import { AppError } from "@/app/Firebase/Types";
import { ParticipantSeatData } from "@/app/Store/PartyReducer";
import { RootState } from "@/app/Store/Store";
import { ParticipantItem } from "@/app/Types";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

/**
 * NOTE: Modals will need their own loadingOverlay and Toast
 * instead of using useLoadingToast()
 */

type Props = {
  item: ParticipantItem;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ListItemModal({ item, open, setOpen }: Props) {
  const { id: partyId, participantInSeat } = useSelector(
    (state: RootState) => state.party.partyData
  );
  const { bottom } = useSafeAreaInsets();
  const [toastMsg, setToastMessage] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const isInSeat =
    participantInSeat.seatFilled &&
    participantInSeat.lastInSeat?.id === item.id;

  const handleDisable = async (isDisabled: boolean) => {
    try {
      setToastMessage("");
      setLoadingText(`${isDisabled ? "Disabling" : "Enabling"} participant`);
      await modifyDisable(partyId, item.id, isDisabled);
      // await new Promise<void>((resolve) => {
      //   setTimeout(() => resolve(), 8000);
      // });

      setToastMessage(`Participant ${isDisabled ? "disabled" : "enabled"}`);
    } catch (err) {
      if (err instanceof AppError) {
        setToastMessage(err.message);
      } else {
        setToastMessage(
          `Error occured ${isDisabled ? "disabling" : "enabling"} participant`
        );
      }
    } finally {
      setLoadingText("");
    }
  };

  const handleFlag = async (raised: boolean) => {
    try {
      setToastMessage("");
      setLoadingText(`${raised ? "Raising" : "Lowering"} participant's flag`);
      await modifyFlag(partyId, item.id, { raised, lastChangeBy: "moderator" });
      // await new Promise<void>((resolve) => {
      //   setTimeout(() => resolve(), 8000);
      // });

      setToastMessage(`Participant's flag ${raised ? "raised" : "lowered"}`);
    } catch (err) {
      if (err instanceof AppError) {
        setToastMessage(err.message);
      } else {
        setToastMessage(
          `Error occured ${raised ? "raising" : "lowering"} participant's flag`
        );
      }
    } finally {
      setLoadingText("");
    }
  };

  const handleSeat = async (action: "enter" | "remove") => {
    try {
      setToastMessage("");
      switch (action) {
        case "enter":
          setLoadingText("Putting participant in seat");
          const participantInSeat: ParticipantSeatData = {
            lastChangeBy: "moderator",
            lastInSeat: {
              id: item.id,
              name: item.name,
            },
            seatFilled: true,
          };
          await enterSeat(partyId, participantInSeat, true);
          setToastMessage("Participant is in the seat!");
          break;
        case "remove":
          setLoadingText("Removing participant from seat");
          await RemoveFromSeat(partyId, "moderator");
          setToastMessage("Participant removed from the seat!");
          break;
      }
    } catch (err) {
      if (err instanceof AppError) {
        setToastMessage(err.message);
      } else {
        setToastMessage(
          `Error occured ${
            action === "enter"
              ? "putting participant in seat"
              : "removing participant from seat"
          }`
        );
      }
    } finally {
      setLoadingText("");
    }
  };

  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={() => setOpen(false)}
        contentContainerStyle={[
          styles.modalContainer,
          { bottom: bottom ? -bottom : 0 },
        ]}
      >
        <View>
          <Text style={styles.modalHeader}>Participant Actions</Text>
        </View>
        <View>
          <Button
            onPress={() => handleDisable(!item.isDisabled)}
            textColor={item.isDisabled ? Colors.green : Colors.buzzerRed}
          >
            {item.isDisabled ? "Enable" : "Disable"}
          </Button>
          <Button
            onPress={() => handleFlag(!item.flagRaised)}
            textColor={Colors.yellow}
            disabled={isInSeat}
          >
            {item.flagRaised ? "Lower Flag" : "Raise Flag"}
          </Button>
          <Button
            onPress={() => handleSeat(isInSeat ? "remove" : "enter")}
            textColor={Colors.yellow}
          >
            {isInSeat ? "Remove from Seat" : "Put in Seat"}
          </Button>
          <Button onPress={() => setOpen(false)} textColor={Colors.cancelGray}>
            Cancel
          </Button>
        </View>
      </Modal>
      <>
        <Toast message={toastMsg} setMessage={setToastMessage} />
        <LoadingOverlay loadingText={loadingText} />
      </>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.drawerBackgroundColor,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
    gap: scaleHeight(5),
  },
  modalHeader: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
    color: Colors.culturedWhite,
  },
});
