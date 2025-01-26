import { StyleSheet, View, GestureResponderEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../Components/Button";
import PlaceholderLogo from "../Components/PlaceholderLogo";
import { useRouter } from "expo-router";
import { fontStyles, generic } from "../Constants/GenericStyles";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../Constants/Colors";

export default function Start() {
  //const { push, navigate } = useRouter();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handlePress = (id: string) => {
    if (id === "create-session") {
      // navigate("/Screens/(SessionOwner)/(CreateFlow)/ChooseFlagSystem");
      navigate("ChooseFlagSystem");
    } else {
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
    bottom: 30,
  },
  logo: {
    bottom: 90,
  },
});
