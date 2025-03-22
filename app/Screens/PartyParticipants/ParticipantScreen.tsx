import { Colors } from "@/app/Constants/Colors";
import {
  scaleArea,
  scaleFont,
  scaleHeight,
  scaleWidth,
  SH,
} from "@/app/Constants/Dimensions";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/Store";
import InterruptOverlay from "@/app/Components/Participant/InterruptOverlay";
import { updateFlag } from "@/app/Store/ParticipantReducer";
import Toast from "@/app/Components/Toast";
import { modifyFlag } from "@/app/Firebase/FirestoreService";
import LoadingOverlay from "@/app/Components/LoadingOverlay";
import { usePartyListener } from "@/app/Hooks/usePartyListener";
import { AppError } from "@/app/Firebase/Types";

type DrawerNavProps = DrawerNavigationProp<any>;

function ParticipantScreen() {
  usePartyListener();
  const { openDrawer } = useNavigation<DrawerNavProps>();
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const {
    partyData: { participantCount, flagsRaisedCount },
    dbCollectionId: partyId,
  } = useSelector((state: RootState) => state.party);
  const {
    participantData: {
      participantName,
      flag: { raised: flagRaised },
    },
    dbCollectionId: participantId,
  } = useSelector((state: RootState) => state.participant);
  const dispatch = useDispatch<AppDispatch>();

  const getFontSize = () => {
    const baseSize = scaleWidth(80) * 0.24;

    const raisedStr = flagsRaisedCount.toString().padStart(2, "0");
    const totalStr = participantCount.toString().padStart(2, "0");

    const maxLen = Math.max(raisedStr.length, totalStr.length);
    return baseSize / Math.max(1, maxLen * 0.4); // Adjust divisor for fine-tuning
  };

  const X_POSITION = -scaleHeight(475) - scaleHeight(insets.bottom * 1.2);
  const POSITION_0 = 0;

  const handlePress = () => {
    openDrawer();
  };

  const translateY = useSharedValue(POSITION_0);

  useEffect(() => {
    if (flagRaised && translateY.value !== X_POSITION) {
      translateY.value = withSpring(X_POSITION);
    } else if (!flagRaised && translateY.value !== POSITION_0) {
      translateY.value = withSpring(POSITION_0);
    }
  }, [flagRaised]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY;
    })
    .onEnd(async (event) => {
      if (Math.abs(event.translationY) >= Math.abs(X_POSITION)) {
        try {
          setToastMessage("");
          setLoading(true);
          await modifyFlag(partyId, participantId, {
            raised: true,
            lastChangeBy: "participant",
          });
          dispatch(updateFlag({ raised: true, lastChangeBy: "participant" }));
          translateY.value = withSpring(X_POSITION);
        } catch (err) {
          if (err instanceof AppError) {
            setToastMessage(err.message);
          } else {
            setToastMessage("Error occured trying to raise flag");
          }
          translateY.value = withSpring(POSITION_0);
        }
        setLoading(false);
        return;
      }
      translateY.value = withSpring(POSITION_0); // Reset to initial position with spring animation
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={generic.container}>
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: !insets.bottom ? scaleHeight(20) : undefined,
              }}
            >
              <View
                style={{
                  left: scaleWidth(10),
                }}
              >
                <View style={styles.fractionContainer}>
                  <View style={{ top: -scaleHeight(10) }}>
                    <Text style={[styles.number, { fontSize: getFontSize() }]}>
                      {flagsRaisedCount.toString().padStart(2, "0")}
                    </Text>
                  </View>
                  <View style={{ transform: [{ rotate: "20deg" }] }}>
                    <Text style={[styles.number, { fontSize: getFontSize() }]}>
                      /
                    </Text>
                  </View>
                  <View style={{ top: scaleHeight(10) }}>
                    <Text style={[styles.number, { fontSize: getFontSize() }]}>
                      {participantCount.toString().padStart(2, "0")}
                    </Text>
                  </View>
                </View>
                <View>
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
              <View
                style={{
                  alignItems: "center",
                  right: scaleWidth(-12),
                  //backgroundColor: "orange",
                  width: "35%",
                }}
              >
                <Text
                  style={[
                    styles.whosInSeatText,
                    {
                      paddingBottom: scaleWidth(10),
                    },
                  ]}
                >
                  Who's in The Seat?
                </Text>
                <Ionicons
                  name="person-outline"
                  size={scaleWidth(40)}
                  color="black"
                  style={{ paddingRight: scaleWidth(20) }}
                />

                <AutoSizeText
                  style={styles.whosInSeatText}
                  mode={ResizeTextMode.max_lines}
                  numberOfLines={2}
                  fontSize={fontStyles.xsmall.fontSize}
                >
                  {participantName}
                </AutoSizeText>
              </View>
            </View>
            <View>
              <View
                style={{
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
            <View>
              <View
                style={{
                  left: scaleWidth(30),
                  bottom: scaleWidth(130),
                }}
              >
                <Entypo
                  name="cross"
                  size={scaleWidth(350)}
                  color={flagRaised ? Colors.buzzerRed : Colors.disabledGray}
                />
              </View>
              <View
                style={{
                  alignSelf: "center",
                  bottom: insets.bottom
                    ? -scaleHeight(insets.bottom * 4.2)
                    : -scaleHeight(10),
                  left: scaleWidth(10),
                  pointerEvents: flagRaised ? "none" : "auto",
                }}
                onLayout={(e) => {
                  console.log(
                    insets.bottom ? "X: " : "SE: ",
                    e.nativeEvent.layout.y
                  );
                }}
              >
                <GestureDetector gesture={panGesture}>
                  <Animated.View style={[animatedStyle]}>
                    <Entypo
                      name="flag"
                      size={scaleWidth(160)}
                      color={Colors.red}
                    />
                  </Animated.View>
                </GestureDetector>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </GestureHandlerRootView>

      <Toast message={toastMessage} />
      {loading && (
        <LoadingOverlay loadingText="Flag raised. Letting moderator know..." />
      )}
      <InterruptOverlay />
    </>
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
    //fontSize: scaleWidth(80) * 0.24,
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
    paddingRight: scaleWidth(20),
  },
});
