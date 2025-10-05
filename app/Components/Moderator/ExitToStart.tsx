import { MOBILE_OS, rem, scaleArea, scaleWidth } from "@/app/Constants";
import { Colors } from "@/app/Constants/Colors";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { NAVIGATION_LABELS } from "@/app/Constants/Navigation";
import { useDialog } from "@/app/Context/DialogContext";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
import { endParty } from "@/app/Firebase/FirestoreService";
import { clearLastPartyData } from "@/app/Hooks";
import { StackNavigation } from "@/app/Screens/_layout";
import { reset } from "@/app/Store/PartyReducer";
import { AppDispatch, RootState } from "@/app/Store/Store";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Alert, Platform, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const ExitToStart = () => {
  const router = useNavigation<StackNavigation>();
  const partyId = useSelector((state: RootState) => state.party.partyData.id);
  const dispatch = useDispatch<AppDispatch>();
  const { setLoadingText, setToastMessage, showAd } = useLoadingToast();
  const { dialog } = useDialog();
  const alert = Platform.OS in MOBILE_OS ? Alert.alert : dialog;
  const sz = Platform.OS in MOBILE_OS ? scaleArea(40) : rem(4.5);

  const handleExit = () => {
    alert(
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

              showAd(() => {
                router.reset({
                  index: 0,
                  routes: [{ name: NAVIGATION_LABELS.Start }],
                });
                setLoadingText("");
              });
            } catch (err) {
              setToastMessage("Error occured. Failed to end party.");
              setLoadingText("");
            }
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
        size={sz}
        color={Colors.yellow}
        s
        style={{
          width: sz,
          height: sz,
          paddingTop: Platform.OS in MOBILE_OS ? 0 : rem(0.5),
        }}
      />
    </TouchableOpacity>
  );
};
