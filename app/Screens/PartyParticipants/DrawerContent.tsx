import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Colors } from "@/app/Constants/Colors";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import Divider from "@/app/Components/Divider";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/Store";
import {
  ParticipantInSeat,
  reset as partyReset,
} from "@/app/Store/PartyReducer";
import { reset as participantReset } from "@/app/Store/ParticipantReducer";
import { enterSeat, leaveParty } from "@/app/Firebase/FirestoreService";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import { AppError } from "@/app/Firebase/Types";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavProps } from "@/app/Types";
import { clearLastPartyData } from "@/app/Hooks";

export default function DrawerContent(props: DrawerContentComponentProps) {
  const partyId = useSelector((state: RootState) => state.party.partyData.id);
  const {
    participantData: { participantName, id: participantId },
  } = useSelector((state: RootState) => state.participant);
  const dispatch = useDispatch<AppDispatch>();
  const {
    navigation: { reset: navReset, closeDrawer },
  } = props;
  const { setLoadingText, setToastMessage } = useLoadingToast();

  const handleLeaveParty = () => {
    Alert.alert("Alert", "Are you sure you want to leave the party?", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            setLoadingText("Leaving party...");
            setToastMessage("");
            await leaveParty(partyId, participantId);
            //reset entire state
            dispatch(partyReset());
            dispatch(participantReset());
            clearLastPartyData();
            navReset({
              index: 0,
              routes: [{ name: NAVIGATION_LABELS.Start }],
            });
          } catch (err) {
            setToastMessage(
              "Error occured attempting to leaving party. Please try again."
            );
          }
          setLoadingText("");
        },
        style: "destructive",
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  const handleEnterSeat = async () => {
    try {
      setLoadingText("Entering seat...");
      setToastMessage("");
      let participantInSeat: ParticipantInSeat = {
        name: participantName,
        id: participantId,
      };
      await enterSeat(partyId, {
        seatFilled: true,
        lastInSeat: participantInSeat,
        lastChangeBy: "participant",
      });
      closeDrawer();
    } catch (err) {
      if (err instanceof AppError) {
        setToastMessage(err.message);
        closeDrawer();
      } else {
        setToastMessage(
          "An error ocurred trying to enter the seat. Please try again."
        );
      }
    }
    setLoadingText("");
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ paddingBottom: scaleHeight(54) }}>
        <Text
          style={{
            fontSize: fontStyles.large.fontSize,
            color: Colors.culturedWhite,
          }}
        >
          Menu
        </Text>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable onPress={handleEnterSeat}>
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.culturedWhite,
              alignSelf: "center",
            }}
          >
            Enter Seat
          </Text>
        </Pressable>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable onPress={handleLeaveParty}>
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.red,
              alignSelf: "center",
            }}
          >
            Leave Party
          </Text>
        </Pressable>
      </View>
      <Divider />
    </DrawerContentScrollView>
  );
}
