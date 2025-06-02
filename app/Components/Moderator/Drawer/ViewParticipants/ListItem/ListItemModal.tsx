import { Colors, scaleHeight } from "@/app/Constants";
import { RootState } from "@/app/Store/Store";
import { ParticipantItem } from "@/app/Types";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

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
            onPress={() => {
              /* do something */
            }}
            textColor={item.isDisabled ? Colors.green : Colors.buzzerRed}
          >
            {item.isDisabled ? "Enable" : "Disable"}
          </Button>
          <Button
            onPress={() => {
              /* do something */
            }}
          >
            {item.flagRaised ? "Lower Flag" : "Raise Flag"}
          </Button>
          <Button
            onPress={() => {
              /* do something */
            }}
          >
            {participantInSeat.seatFilled &&
            participantInSeat.lastInSeat?.id === item.id
              ? "Remove from Seat"
              : "Put in Seat"}
          </Button>
          <Button onPress={() => setOpen(false)} textColor={Colors.cancelGray}>
            Cancel
          </Button>
        </View>
      </Modal>
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
