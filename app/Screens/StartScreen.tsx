import { StyleSheet, View, Text, GestureResponderEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../Components/Button";
import PlaceholderLogo from "../Components/PlaceholderLogo";
import { useRouter } from "expo-router";
import { generic } from "../Constants/GenericStyles";

export default function Start() {
  const { push, navigate } = useRouter();
  const handlePress = (id: string) => {
    if (id === "create-session") {
      push("/Screens/(SessionOwner)/(CreateFlow)/ChooseFlagSystem");
    } else {
    }
  };
  return (
    <View style={generic.container}>
      <View style={styles.logo}>
        <PlaceholderLogo />
      </View>
      <View style={styles.containerButtons}>
        <Button
          text="Create A Session"
          id={"create-session"}
          onPress={handlePress}
        />
        <Button
          text="Join A Session"
          id={"join-session"}
          onPress={handlePress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButtons: {
    bottom: 40,
  },
  logo: {
    bottom: 100,
  },
});
