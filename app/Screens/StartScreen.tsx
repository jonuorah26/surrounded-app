import { StyleSheet, View } from "react-native";
import Button from "../Components/Button";
import PlaceholderLogo from "../Components/PlaceholderLogo";
import { generic } from "../Constants/GenericStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "./_layout";
import { useUserTypeContext } from "../Context/UserTypeContext";
import { NAVIGATION_LABELS } from "../Constants/Navigation";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { useEffect } from "react";
import { scaleHeight } from "../Constants";
import Logo from "../Components/Logo";
const CREATE = "create-party";
const JOIN = "join-party";

export default function Start() {
  const { navigate } = useNavigation<StackNavigation>();
  const { setUserType } = useUserTypeContext();
  const party = useSelector((state: RootState) => state.party);
  const participant = useSelector((state: RootState) => state.participant);

  useEffect(() => {
    console.log("Party Reducer:", party);
    console.log("Participant Reducer:", participant);
  }, [party, participant]);

  const handlePress = (id: typeof JOIN | typeof CREATE) => {
    if (id === CREATE) {
      setUserType("moderator");
      navigate(NAVIGATION_LABELS.ChooseFlagSystem);
    } else {
      setUserType("participant");
      navigate(NAVIGATION_LABELS.EnterCode);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.containerButtons}>
        <Button text="Create A Party" onPress={() => handlePress(CREATE)} />
        <Button text="Join A Party" onPress={() => handlePress(JOIN)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...generic.container,
    justifyContent: "space-evenly",
    //gap: scaleHeight(20),
  },
  containerButtons: {
    //bottom: "4%",
  },
  logo: {
    //bottom: "11%",
  },
});
