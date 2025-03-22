import React from "react";
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
import { reset as partyReset } from "@/app/Store/PartyReducer";
import { reset as participantReset } from "@/app/Store/ParticipantReducer";

export default function DrawerContent(props: DrawerContentComponentProps) {
  const partyId = useSelector((state: RootState) => state.party.dbCollectionId);
  const participantId = useSelector(
    (state: RootState) => state.participant.dbCollectionId
  );
  const dispatch = useDispatch<AppDispatch>();

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
          onPress={() => {
            Alert.alert("Alert", "Are you sure you want to leave the party?", [
              {
                text: "Yes",
                onPress: () => {
                  //reset entire state
                  dispatch(partyReset());
                  dispatch(participantReset());

                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: NAVIGATION_LABELS.Start }],
                  });
                },
                style: "destructive",
              },
              {
                text: "No",
                style: "cancel",
              },
            ]);
          }}
        >
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
