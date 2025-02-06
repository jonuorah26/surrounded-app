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
import { Avatar } from "react-native-paper";
//import { Pressable } from "react-native-gesture-handler";

function ModeratorScreen() {
  const handlePress = () => {};

  return (
    <View style={[generic.container, { justifyContent: "flex-start" }]}>
      <SafeAreaView style={{ flex: 1, gap: scaleHeight(30) }}>
        <View style={{ flex: 1 }} /*Flag, hamburger button, Threshold  */>
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
          style={{ flexDirection: "row", flex: 2 }}
        >
          <View
            style={{
              flex: 1.1,
              alignSelf: "flex-start",
              bottom: scaleHeight(65),
              paddingLeft: scaleWidth(10),
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={[
                  styles.whosInSeatText,
                  { paddingBottom: scaleWidth(10) },
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
          <View style={{ flex: 3, alignSelf: "flex-start" }}>
            <View style={styles.fractionContainer}>
              <View style={{ top: -scaleHeight(20) }}>
                <Text style={styles.number}>08</Text>
              </View>
              <View style={{ transform: [{ rotate: "20deg" }] }}>
                <Text style={[styles.number]}>/</Text>
              </View>
              <View style={{ top: scaleHeight(20) }}>
                <Text style={styles.number}>25</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }} /* control buttons */></View>
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
    fontSize: scaleArea(200) * 0.28,
  },
  fractionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F3F3F3",
    width: scaleArea(200), // Ensure square dimensions
    height: scaleArea(200),
    borderRadius: scaleArea(100), // Half of width/height for a perfect circle
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
    textAlign: "left",
  },
});
