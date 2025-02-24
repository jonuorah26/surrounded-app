import { StyleSheet, View } from "react-native";
import Button from "../Components/Button";
import PlaceholderLogo from "../Components/PlaceholderLogo";
import { generic } from "../Constants/GenericStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "./_layout";
import { useUserTypeContext } from "../Context/UserTypeContext";

export default function Start() {
  const { navigate } = useNavigation<StackNavigation>();
  const {setUserType} = useUserTypeContext();
  const handlePress = (id: string) => {
    if (id === "create-session") {
      setUserType("moderator");
      navigate("ChooseFlagSystem");
    } else {
      setUserType("participant");
      navigate("EnterCode");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <PlaceholderLogo />
      </View>
      <View style={styles.containerButtons}>
        <Button
          text="Create A Session"
          onPress={() => handlePress("create-session")}
        />
        <Button
          text="Join A Session"
          onPress={() => handlePress("join-session")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...generic.container,
  },
  containerButtons: {
    bottom: "4%",
  },
  logo: {
    bottom: "11%",
  },
});
