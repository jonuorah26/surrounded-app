import { Colors } from "@/app/Constants/Colors";
import {
  scaleArea,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "@/app/Constants/Dimensions";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type DrawerNavProps = DrawerNavigationProp<any>;
function ParticipantScreen() {
  const { openDrawer } = useNavigation<DrawerNavProps>();
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    openDrawer();
  };
  return (
    <View style={generic.container}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: -1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: !insets.bottom ? scaleHeight(20) : undefined,
          }}
        >
          <View
            style={{
              flex: -1,
              left: scaleWidth(10),
            }}
          >
            <View style={styles.fractionContainer}>
              <View style={{ top: -scaleHeight(10) }}>
                <Text style={styles.number}>08</Text>
              </View>
              <View style={{ transform: [{ rotate: "20deg" }] }}>
                <Text style={[styles.number]}>/</Text>
              </View>
              <View style={{ top: scaleHeight(10) }}>
                <Text style={styles.number}>30</Text>
              </View>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: fontStyles.xsmall.fontSize,
                  color: Colors.culturedWhite,
                  fontWeight: "600",
                }}
              >
                Flags Raised
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", right: scaleWidth(-12) }}>
            <Text
              style={[
                styles.whosInSeatText,
                {
                  paddingBottom: scaleWidth(10),
                  //marginLeft: scaleWidth(5),
                  width: "90%",
                },
              ]}
            >
              Who's in The Seat?
            </Text>
            <Ionicons
              name="person-outline"
              size={scaleWidth(40)}
              color="black"
            />
            <Text style={styles.whosInSeatText}>Arthur28</Text>
          </View>
        </View>
        <View style={{ flex: -1 }}>
          <View
            style={{
              flex: -1,
              alignSelf: "flex-end",
              top: scaleHeight(20),
              zIndex: 2,
              elevation: 2,
            }}
          >
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
        </View>
        <View style={{ flex: -1 }}>
          <View
            style={{
              width: "200%",
              left: scaleWidth(30),
              bottom: scaleWidth(130),
            }}
          >
            <Entypo
              name="cross"
              size={scaleWidth(350)}
              color={Colors.disabledGray}
            />
          </View>
          <View
            style={{
              alignSelf: "center",
              bottom: insets.bottom
                ? -scaleHeight(insets.bottom * 4.2)
                : -scaleHeight(20),
              left: scaleWidth(10),
            }}
          >
            <Entypo name="flag" size={scaleWidth(150)} color={Colors.red} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ParticipantScreen;

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
    width: scaleWidth(50),
    height: scaleWidth(50),
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontWeight: fontStyles.large.fontWeight,
    //fontSize: scaleFont(55),
    fontSize: scaleWidth(80) * 0.24,
    //fontSize: (scaleArea(200) * 0.45) / Math.sqrt(12 / 2),
  },
  fractionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.culturedWhite,
    width: scaleWidth(80), // Ensure square dimensions
    height: scaleWidth(80),
    borderRadius: scaleWidth(40), // Half of width/height for a perfect circle
    //padding: scaleHeight(20), // Ensures spacing within the circle
    alignItems: "center",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: scaleHeight(10) }, // Subtle drop shadow
    shadowOpacity: 0.1, // Low opacity for a soft effect
    shadowRadius: scaleHeight(12), // Smooth shadow edges
    elevation: 5, // Required for Android
    left: scaleWidth(5),
  },

  whosInSeatText: {
    ...fontStyles.xsmall,
    // fontSize: scaleFont(16),
    fontSize: scaleWidth(16),
    textAlign: "center",
    width: "90%",
  },
});
