import FlagIndicator from "@/app/Components/FlagIndicator";
import ThresholdIndicator from "@/app/Components/ThresholdIndicator";
import { Colors } from "@/app/Constants/Colors";
import {
  scaleArea,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "@/app/Constants/Dimensions";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { View, StyleSheet, Pressable, SafeAreaView, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
//import { Pressable } from "react-native-gesture-handler";

type DrawerNavProps = DrawerNavigationProp<any>;
function ModeratorScreen() {
  const { openDrawer } = useNavigation<DrawerNavProps>();

  const handlePress = () => {
    openDrawer();
  };
  const insets = useSafeAreaInsets();
  return (
    <View style={[generic.container, { justifyContent: "flex-start" }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 3 }} /*Flag, hamburger button, Threshold  */>
          <View style={styles.flagAndHamburgerRow}>
            <FlagIndicator
              color={Colors.red}
              absolute={false}
              roundedBorderSide="right"
            />
            <View style={styles.hamburger}>
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.5 : 1 },
                  styles.hamburgerButton,
                ]}
                onPress={handlePress}
              >
                <FontAwesome6
                  name="bars"
                  size={fontStyles.large.fontSize}
                  color={Colors.yellow}
                />
              </Pressable>
            </View>
          </View>
          <View style={{ flex: -1, alignSelf: "flex-end" }}>
            <ThresholdIndicator color={Colors.yellow} />
          </View>
        </View>
        <View /* "Who's in Seat" and Flag raise count */
          style={{ flexDirection: "row", flex: 5 }}
        >
          <View
            style={{
              flex: 1.2,
              alignSelf: "flex-start",
              bottom: scaleHeight(100),
              left: scaleWidth(10),
              paddingLeft: scaleWidth(10),
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={[
                  styles.whosInSeatText,
                  {
                    paddingBottom: scaleWidth(10),
                    marginLeft: scaleWidth(5),
                    width: "150%",
                  },
                ]}
              >
                Who's in The Seat?
              </Text>
              <Ionicons
                name="person-outline"
                size={scaleArea(50)}
                color="black"
              />
              <Text style={styles.whosInSeatText}>Arthur28</Text>
            </View>
          </View>
          <View
            style={{
              flex: 5,
              alignSelf: "flex-start",
              alignItems: "center",
              right: scaleWidth(45),
            }}
          >
            <View style={styles.fractionContainer}>
              <View style={{ top: -scaleHeight(20) }}>
                <Text style={styles.number}>08</Text>
              </View>
              <View style={{ transform: [{ rotate: "20deg" }] }}>
                <Text style={[styles.number]}>/</Text>
              </View>
              <View style={{ top: scaleHeight(20) }}>
                <Text style={styles.number}>30</Text>
              </View>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: fontStyles.large.fontSize,
                  color: Colors.culturedWhite,
                }}
              >
                Flags Raised
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }} /* control buttons */
        >
          <View
            style={{
              flexDirection: "row",
              bottom: insets.bottom || scaleHeight(70),
              //bottom: scaleHeight(20),
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
              >
                <View style={styles.controlButtons}>
                  <FontAwesome5
                    name="redo"
                    size={scaleArea(50)}
                    color={Colors.black}
                  />
                </View>
              </Pressable>
              <Text style={styles.controlButtonLabel}>Reset Flags</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
              >
                <View style={styles.controlButtons}>
                  <Feather
                    name="pause"
                    size={scaleArea(50)}
                    color={Colors.black}
                  />
                </View>
              </Pressable>

              <Text style={styles.controlButtonLabel}>Pause</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
              >
                <View style={styles.controlButtons}>
                  <Entypo
                    name="flag"
                    size={scaleArea(50)}
                    color={Colors.black}
                  />
                </View>
              </Pressable>

              <Text style={styles.controlButtonLabel}>Toggle Participants</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ModeratorScreen;

const styles = StyleSheet.create({
  hamburger: {
    alignSelf: "flex-start",
    marginRight: scaleWidth(24),
  },
  hamburgerButton: {
    flex: -1,
    backgroundColor: Colors.disabledGray,
    borderRadius: 50, // Softer corners
    shadowColor: Colors.black, // Add a subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow below the button
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 6,
    elevation: 5,
    width: scaleArea(50),
    height: scaleArea(50),
    justifyContent: "center",
    alignItems: "center",
  },
  flagAndHamburgerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  number: {
    fontWeight: fontStyles.large.fontWeight,
    //fontSize: scaleFont(55),
    fontSize: scaleArea(200) * 0.32,
    //fontSize: (scaleArea(200) * 0.45) / Math.sqrt(12 / 2),
  },
  fractionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.culturedWhite,
    width: scaleArea(250), // Ensure square dimensions
    height: scaleArea(250),
    borderRadius: scaleArea(125), // Half of width/height for a perfect circle
    //padding: scaleHeight(20), // Ensures spacing within the circle
    alignItems: "center",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: scaleHeight(10) }, // Subtle drop shadow
    shadowOpacity: 0.1, // Low opacity for a soft effect
    shadowRadius: scaleHeight(12), // Smooth shadow edges
    elevation: 5, // Required for Android
  },

  whosInSeatText: {
    ...fontStyles.xsmall,
    textAlign: "center",
    width: "100%",
  },
  controlButtons: {
    backgroundColor: Colors.yellow,
    borderRadius: 50, // Softer corners
    shadowColor: Colors.black, // Add a subtle shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow below the button
    shadowOpacity: 0.2, // Subtle shadow
    shadowRadius: 6,
    elevation: 5,
    width: scaleArea(85),
    height: scaleArea(85),
    justifyContent: "center",
    alignItems: "center",
  },
  controlButtonLabel: {
    fontSize: fontStyles.small.fontSize,
    color: Colors.culturedWhite,
    alignSelf: "center",
    width: "90%",
    textAlign: "center",
  },
});
