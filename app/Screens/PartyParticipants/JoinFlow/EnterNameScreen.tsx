import ContinueButton from "@/app/Components/ContinueButton";
import { Colors } from "@/app/Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import { generic } from "@/app/Constants/GenericStyles";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import { StackNavigation } from "../../_layout";
import { AppDispatch, RootState } from "@/app/Store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateParticipantId,
  updateParticipantName,
} from "@/app/Store/ParticipantReducer";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import Toast from "@/app/Components/Toast";
import LoadingOverlay from "@/app/Components/LoadingOverlay";
import { addParticipantToParty } from "@/app/Firebase/FirestoreService";
import { updateParticipantCount } from "@/app/Store/PartyReducer";
import { AppError } from "@/app/Firebase/Types";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import { registerForPushNotificationsAsync } from "@/app/Firebase/Notifications";

function EnterNameScreen() {
  const [name, setName] = useState("");
  const { setLoadingText, setToastMessage } = useLoadingToast();
  const { navigate, reset: navReset } = useNavigation<StackNavigation>();
  const dispatch = useDispatch<AppDispatch>();
  const partyId = useSelector((state: RootState) => state.party.partyData.id);

  const handleContinue = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    if (name.length > 30) {
      alert("Please enter a name of 30 character or less");
      return;
    }

    try {
      setLoadingText("Joining Party...");
      setToastMessage("");
      const token = await registerForPushNotificationsAsync();
      const result = await addParticipantToParty(name, partyId, token);

      dispatch(updateParticipantName(name));
      dispatch(updateParticipantId(result.participantId));
      dispatch(updateParticipantCount(result.participantCount));
      navReset({
        index: 0,
        routes: [{ name: NAVIGATION_LABELS.ParticipantScreen }],
      });
    } catch (err) {
      if (err instanceof AppError) {
        setToastMessage(err.message);
      } else {
        setToastMessage("Error ocurred. Failed to join party.");
      }
    }
    setLoadingText("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            gap: scaleHeight(50),
          }}
        >
          <View style={{}}>
            <Text style={styles.title}>Enter A Name To Use</Text>
          </View>
          <View style={{}}>
            <TextInput
              mode="outlined"
              keyboardType="ascii-capable"
              style={styles.textInput}
              outlineStyle={styles.InputBorder}
              autoCorrect={false}
              value={name}
              onChangeText={(e) => setName(e)}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            bottom: scaleHeight(25),
          }}
        >
          <ContinueButton
            text="Enter Session"
            onPress={handleContinue}
            useDefaultStyles={false}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default EnterNameScreen;

const styles = StyleSheet.create({
  container: {
    ...generic.container,
    justifyContent: "space-evenly",
  },
  title: {
    ...generic.title,
  },
  textInput: {
    width: scaleWidth(200),
    alignSelf: "center",
    textAlign: "center",
  },
  InputBorder: {
    borderColor: Colors.yellow,
    borderRadius: scaleArea(20),
  },
});
