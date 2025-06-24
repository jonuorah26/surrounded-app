import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Modal, Portal } from "react-native-paper";
import {
  Colors,
  fontStyles,
  generic,
  scaleArea,
  scaleHeight,
  scaleWidth,
} from "@/app/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import * as Clipboard from "expo-clipboard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Store/Store";
import Toast from "../Toast";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function PartyCodePopUp({ open, setOpen }: Props) {
  // Temporarily set true to always show
  const [toastMessage, setToastMessage] = useState("");
  const partyCode = useSelector(
    (state: RootState) => state.party.partyData.partyCode
  );

  const handleCopyCode = async () => {
    try {
      //setLoadingText("Copying code...");
      setToastMessage("");
      await Clipboard.setStringAsync(partyCode);
      //setLoadingText("");
      setToastMessage("Party code copied!");
    } catch (err) {
      setToastMessage("Error occured copying code. Please try again.");
    }
  };

  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={() => setOpen(false)}
        contentContainerStyle={styles.modalContainer}
        style={{ justifyContent: "center" }}
      >
        <View style={styles.innerContainer}>
          <View style={[styles.codeSection, { gap: scaleHeight(20) }]}>
            <Text style={[styles.partyCodeHeader, { flex: -1 }]}>
              Party Code
            </Text>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                flex: -1,
                gap: scaleHeight(15),
              }}
            >
              <View style={styles.codeContainer} /*white code container*/>
                <Text style={styles.codeText}>{partyCode}</Text>
                <TouchableOpacity
                  onPress={handleCopyCode}
                  style={styles.copyButton}
                >
                  <MaterialIcons
                    name="content-copy"
                    size={fontStyles.large.fontSize + 5}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.codeHelperText}>
                Tap the clipboard icon to copy the code. Share this code with
                your participants so that they can join your party.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <Toast message={toastMessage} setMessage={setToastMessage} />
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.drawerBackgroundColor,
    padding: scaleArea(24),
    marginHorizontal: scaleWidth(32),
    borderRadius: 8,
  },
  innerContainer: {
    alignItems: "center",
  },
  partyCodeHeader: {
    ...generic.title,
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "2%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: "center",
  },
  codeSection: {
    alignItems: "center",
  },
  codeText: {
    fontSize: fontStyles.large.fontSize + 5,
    fontWeight: fontStyles.large.fontWeight,
    marginRight: "4%",
    borderRightWidth: 2,
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  copyButton: {
    paddingRight: "4%",
  },
  codeHelperText: {
    color: Colors.white,
    fontSize: fontStyles.xsmall.fontSize,
    textAlign: "center",
  },
});
