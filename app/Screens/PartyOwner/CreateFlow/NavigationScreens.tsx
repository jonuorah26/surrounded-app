import React from "react";
import { StackNavigation } from "../../_layout";
import { useNavigation } from "@react-navigation/native";
import { Alert, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { Colors } from "@/app/Constants/Colors";
import AddParticipants from "./AddParticipants";
import AllowParticipantsDuringSession from "./AllowParticipantsDuringSession";
import ChooseFlagSystem from "./ChooseFlagSystem";
import ThresholdScreen from "./RedFlag/ThresholdScreen";
import PartyCodeGeneratedScreen from "./PartyCodeGeneratedScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { endParty } from "@/app/Firebase/FirestoreService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/Store";
import { reset } from "@/app/Store/PartyReducer";

const Stack = createNativeStackNavigator();
const CreateFlowScreens = () => [
  <Stack.Screen
    key={NAVIGATION_LABELS.ChooseFlagSystem}
    name={NAVIGATION_LABELS.ChooseFlagSystem}
    component={ChooseFlagSystem}
  />,
  <Stack.Screen
    key={NAVIGATION_LABELS.AddParticipants}
    name={NAVIGATION_LABELS.AddParticipants}
    component={AddParticipants}
  />,
  <Stack.Screen
    name={NAVIGATION_LABELS.AllowParticipantsDuringSession}
    component={AllowParticipantsDuringSession}
    key={NAVIGATION_LABELS.AllowParticipantsDuringSession}
  />,
  <Stack.Screen
    key={NAVIGATION_LABELS.Threshold}
    name={NAVIGATION_LABELS.Threshold}
    component={ThresholdScreen}
  />,
  <Stack.Screen
    name={NAVIGATION_LABELS.PartyCodeGenerated}
    key={NAVIGATION_LABELS.PartyCodeGenerated}
    component={PartyCodeGeneratedScreen}
    options={{
      headerLeft: () => {
        const router = useNavigation<StackNavigation>();
        const dbCollectionId = useSelector(
          (state: RootState) => state.party.dbCollectionId
        );
        const dispatch = useDispatch<AppDispatch>();

        const handleExit = () => {
          Alert.alert(
            "Alert",
            "Exiting will end the party. Are you sure you want to leave?",
            [
              {
                text: "Yes",
                onPress: () => {
                  endParty(dbCollectionId, false);
                  dispatch(reset());
                  router.reset({
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
            ]
          );
        };

        return (
          <TouchableOpacity onPress={handleExit}>
            <MaterialIcons
              name="exit-to-app"
              size={fontStyles.large.fontSize + 2}
              color={Colors.yellow}
            />
          </TouchableOpacity>
        );
      },
      gestureEnabled: false,
    }}
  />,
];

export default CreateFlowScreens;
