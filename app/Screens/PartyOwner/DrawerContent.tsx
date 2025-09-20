import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Colors } from "@/app/Constants/Colors";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import Divider from "../../Components/Divider";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/Store";
import { endParty } from "@/app/Firebase/FirestoreService";
import { reset } from "@/app/Store/PartyReducer";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import { clearLastPartyData } from "@/app/Hooks";
import PartyCodePopUp from "@/app/Components/Moderator/PartyCodePopUp";

export default function DrawerContent(props: DrawerContentComponentProps) {
  const partyId = useSelector((state: RootState) => state.party.partyData.id);
  const dispatch = useDispatch<AppDispatch>();
  const {
    navigation: { reset: navReset, navigate },
  } = props;
  const { setLoadingText, setToastMessage } = useLoadingToast();
  const [seePartyCode, setSeePartyCode] = useState(false);

  const handleEndParty = () => {
    Alert.alert("Alert", "Are you sure you want to end the party?", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            setLoadingText("Ending Party...");
            setToastMessage("");
            await endParty(partyId);
            //reset entire state
            dispatch(reset());
            clearLastPartyData();
            navReset({
              index: 0,
              routes: [{ name: NAVIGATION_LABELS.Start }],
            });
          } catch (err) {
            setToastMessage(
              "Error occured attempting to end party. Please try again."
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
        <Pressable
          onPress={() => navigate(NAVIGATION_LABELS.Drawer_ViewParticipants)}
        >
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.culturedWhite,
              alignSelf: "center",
            }}
          >
            View Participants
          </Text>
        </Pressable>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable onPress={() => setSeePartyCode(true)}>
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.culturedWhite,
              alignSelf: "center",
            }}
          >
            See Party Code
          </Text>
        </Pressable>
        <PartyCodePopUp open={seePartyCode} setOpen={setSeePartyCode} />
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable
          onPress={() =>
            Alert.alert(
              "Working on it!",
              "Feature not available yet, but coming soon!"
            )
          }
        >
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.culturedWhite,
              alignSelf: "center",
            }}
          >
            Edit Vote Out Threshold
          </Text>
        </Pressable>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable
          onPress={() =>
            Alert.alert(
              "Working on it!",
              "Feature not available yet, but coming soon!"
            )
          }
        >
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.culturedWhite,
              alignSelf: "center",
            }}
          >
            Edit Party Capacity
          </Text>
        </Pressable>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable onPress={handleEndParty}>
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.red,
              alignSelf: "center",
            }}
          >
            End Party
          </Text>
        </Pressable>
      </View>
      <Divider />
    </DrawerContentScrollView>
  );
}
