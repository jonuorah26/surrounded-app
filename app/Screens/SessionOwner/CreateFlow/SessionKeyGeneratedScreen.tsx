import Button from "@/app/Components/Button";
import FlagIndicator from "@/app/Components/FlagIndicator";
import { Colors } from "@/app/Constants/Colors";
import { SW } from "@/app/Constants/Dimensions";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import useBlinkingElipses from "@/app/Hooks/useBlinkingElipses";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function SessionKeyGeneratedScreen() {
  const elipses = useBlinkingElipses(1000);
  const [proceedDisabled, setProceedDisabled] = useState(true);
  return (
    <View style={generic.container}>
      <View style={{ flex: 8 }}>
        <FlagIndicator color={Colors.red} useRounded={false} />
      </View>
      <View style={[styles.content, { flex: 30 }]}>
        <View style={[styles.codeSection, { flex: 2 }]}>
          <Text style={[styles.sessionCodeHeader, { flex: 1 }]}>
            Session Code
          </Text>
          <View
            style={{
              alignItems: "center",
              width: "100%",
              flex: 4,
            }}
          >
            <View style={styles.codeContainer} /*white code container*/>
              <Text style={styles.codeText}>{"4W56HW87"}</Text>
              <TouchableOpacity onPress={() => {}} style={styles.copyButton}>
                <MaterialIcons
                  name="content-copy"
                  size={fontStyles.large.fontSize + 5}
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingVertical: "2%" }} /*codeHelperText*/>
              <Text style={styles.codeHelperText}>
                Tap the clipboard icon to copy the code. Share this code with
                your participants so that they can join your session.
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
            <Text style={styles.participantsJoinedNum}>24</Text>
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
          text="Proceed To Room"
          onPress={() => {}}
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

export default SessionKeyGeneratedScreen;
const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    //bottom: "12%",
    zIndex: 2,
    elevation: 2,
  },
  sessionCodeHeader: {
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
