import { scaleArea, scaleWidth } from "@/app/Constants";
import { Colors } from "@/app/Constants/Colors";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import { endParty } from "@/app/Firebase/FirestoreService";
import { clearLastPartyData } from "@/app/Hooks";
import { StackNavigation } from "@/app/Screens/_layout";
import { reset } from "@/app/Store/PartyReducer";
import { AppDispatch, RootState } from "@/app/Store/Store";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Alert, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const ExitToStart = () => {
  const router = useNavigation<StackNavigation>();
  const partyId = useSelector((state: RootState) => state.party.partyData.id);
  const dispatch = useDispatch<AppDispatch>();
  const { setLoadingText, setToastMessage } = useLoadingToast();

  const handleExit = () => {
    Alert.alert(
      "Alert",
      "Exiting will end the party. Are you sure you want to leave?",
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              setLoadingText("Ending Party...");
              setToastMessage("");
              await endParty(partyId);
              dispatch(reset());
              clearLastPartyData();
              router.reset({
                index: 0,
                routes: [{ name: NAVIGATION_LABELS.Start }],
              });
            } catch (err) {
              setToastMessage("Error occured. Failed to end party.");
            }
            setLoadingText("");
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
    <TouchableOpacity onPress={handleExit} hitSlop={scaleArea(40)}>
      <MaterialIcons
        name="exit-to-app"
        size={fontStyles.large.fontSize + 8}
        color={Colors.yellow}
        style={{ width: "100%", height: "200%", marginLeft: scaleWidth(10) }}
      />
    </TouchableOpacity>
  );
};
