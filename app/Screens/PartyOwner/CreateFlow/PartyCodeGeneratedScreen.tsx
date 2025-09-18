import Button from "@/app/Components/Button";
import FlagIndicator from "@/app/Components/FlagIndicator";
import { Colors } from "@/app/Constants/Colors";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import useBlinkingElipses from "@/app/Hooks/useBlinkingElipses";
import { AppDispatch, RootState } from "@/app/Store/Store";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackNavigation } from "../../_layout";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { usePartyListener } from "@/app/Hooks/usePartyListener";
import { startParty } from "@/app/Firebase/FirestoreService";
import {
  startParty as reduxStartParty,
  updateModeratorPushToken,
} from "@/app/Store/PartyReducer";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import * as Clipboard from "expo-clipboard";
import { saveLastPartyData } from "@/app/Hooks";
import { registerForPushNotificationsAsync } from "@/app/Firebase/Notifications";

function PartyCodeGeneratedScreen() {
  usePartyListener();
  const elipses = useBlinkingElipses(1000);
  const { navigate, reset: navReset } = useNavigation<StackNavigation>();
  const {
    partyData: { partyCode, minParticipants, participantCount, id: partyId },
  } = useSelector((state: RootState) => state.party);
  const proceedDisabled = participantCount < minParticipants;
  const dispatch = useDispatch<AppDispatch>();
  const { setLoadingText, setToastMessage } = useLoadingToast();

  useEffect(() => {
    if (!partyId) return;

    saveLastPartyData({
      role: "moderator",
      partyId: partyId,
      lastPage: "partyCodeGenerated",
    });
  }, [partyId]);

  const handleProceed = async () => {
    try {
      setLoadingText("Starting...");
      setToastMessage("");

      await startParty(partyId);
      dispatch(reduxStartParty());
      navReset({
        index: 0,
        routes: [{ name: NAVIGATION_LABELS.ModeratorScreen }],
      });
    } catch (err) {
      setToastMessage("Error occured. Failed to start party.");
    }
    setLoadingText("");
  };

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
    <View style={generic.container}>
      <View style={{ flex: 8 }}>
        <FlagIndicator color={Colors.red} useRounded={false} />
      </View>
      <View style={[styles.content, { flex: 30 }]}>
        <View style={[styles.codeSection, { flex: 2 }]}>
          <Text style={[styles.partyCodeHeader, { flex: 1 }]}>Party Code</Text>
          <View
            style={{
              alignItems: "center",
              width: "100%",
              flex: 4,
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
            <View style={{ paddingVertical: "2%" }} /*codeHelperText*/>
              <Text style={styles.codeHelperText}>
                Tap the clipboard icon to copy the code. Share this code with
                your participants so that they can join your party.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.participantsSection,
            { flex: 2, justifyContent: "center" },
          ]}
        >
          <View style={{ flex: -1, marginBottom: "3.5%" }}>
            <Text style={styles.waitingForParticipantsText}>
              Waiting For Participants{elipses}
            </Text>
          </View>
          <View style={{ flex: -1 }}>
            <Text style={styles.participantsJoinedNum}>{participantCount}</Text>
          </View>
          <View style={{ flex: -1 }}>
            <Text style={styles.participantsJoinedText}>
              Participants Joined
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 5, justifyContent: "flex-start" }}>
        <Button
          text="Enter Session"
          onPress={handleProceed}
          sizeVariant="medium"
          styles={{
            button: {
              ...styles.proceedButton,
              opacity: proceedDisabled ? 0.5 : 1,
            },
          }}
          disabled={proceedDisabled}
        />
      </View>
    </View>
  );
}

export default PartyCodeGeneratedScreen;
const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    //bottom: "12%",
    zIndex: 2,
    elevation: 2,
  },
  partyCodeHeader: {
    ...generic.title,
    //bottom: "13%",
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
    //width: "100%",
    alignItems: "center",
  },
  codeText: {
    fontSize: fontStyles.large.fontSize + 5,
    fontWeight: fontStyles.large.fontWeight,
    //marginRight: 10,
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
    //alignSelf: "center",
    top: "8%",
    fontSize: fontStyles.xsmall.fontSize,
    marginHorizontal: "10%",
    //fontWeight: "600",
  },

  participantsSection: {
    //top: 160,
    alignItems: "center",
  },
  waitingForParticipantsText: {
    color: Colors.white,
    fontSize: fontStyles.medium.fontSize,
    fontWeight: fontStyles.medium.fontWeight,
    //marginBottom: 20,
  },
  participantsJoinedNum: {
    color: Colors.white,
    fontSize: fontStyles.large.fontSize,
    fontWeight: fontStyles.medium.fontWeight,
    //marginBottom: 10,
  },
  participantsJoinedText: {
    color: Colors.white,
    fontSize: fontStyles.medium.fontSize,
    fontWeight: fontStyles.medium.fontWeight,
  },

  proceedButton: {
    alignSelf: "flex-end",
    //top: "20%",
  },
});
