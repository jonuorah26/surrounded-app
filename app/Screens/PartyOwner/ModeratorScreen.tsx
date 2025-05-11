import FlagIndicator from "@/app/Components/FlagIndicator";
import ThresholdIndicator from "@/app/Components/ThresholdIndicator";
import { Colors } from "@/app/Constants/Colors";
import { scaleArea, scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";
import { fontStyles, generic } from "@/app/Constants/GenericStyles";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Text,
  Dimensions,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import Popover from "react-native-popover-view";
import { Placement } from "react-native-popover-view/dist/Types";
import OpacityPressable from "@/app/Components/OpacityPressable";
import Divider from "@/app/Components/Divider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Store/Store";
import { usePartyListener } from "@/app/Hooks/usePartyListener";
import Toast from "@/app/Components/Toast";
import LoadingOverlay from "@/app/Components/LoadingOverlay";
import { useModeratorControls } from "@/app/Hooks/useModeratorControls";
import { AppError } from "@/app/Firebase/Types";
import { saveLastPartyData, useThreshold } from "@/app/Hooks";
import { DrawerNavProps } from "@/app/Types";
import { RemoveFromSeat } from "@/app/Firebase/FirestoreService";
import { useLoadingToast } from "@/app/Context/LoadingToastContext";
//import { Pressable } from "react-native-gesture-handler";

function ModeratorScreen() {
  usePartyListener();
  const { threshold, thresholdReached } = useThreshold();
  const { setControl, controlLoadingText, controlToast } =
    useModeratorControls();
  const { setLoadingText, setToastMessage } = useLoadingToast();
  const { openDrawer } = useNavigation<DrawerNavProps>();
  const {
    partyData: {
      participantCount,
      flagsRaisedCount,
      isPaused,
      participantInSeat,
      id: partyId,
    },
  } = useSelector((state: RootState) => state.party);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!partyId) return;

    saveLastPartyData({
      role: "moderator",
      partyId,
      lastPage: "moderatorControls",
    });
  }, [partyId]);

  const getFontSize = () => {
    const baseSize = scaleArea(200) * 0.32;

    const raisedStr = flagsRaisedCount.toString().padStart(2, "0");
    const totalStr = participantCount.toString().padStart(2, "0");

    const maxLen = Math.max(raisedStr.length, totalStr.length);
    return baseSize / Math.max(1, maxLen * 0.4); // Adjust divisor for fine-tuning
  };

  const handlePress = () => {
    openDrawer();
  };

  const handlePause = () => {
    if (!isPaused) {
      setControl("pause");
    } else {
      setControl("unpause");
    }
  };

  const handleRemoveFromSeat = async () => {
    try {
      setLoadingText("Removing from seat...");
      setToastMessage("");
      await RemoveFromSeat(partyId);
      setToastMessage("Participant removed from seat!");
    } catch (err) {
      if (err instanceof AppError) {
        setToastMessage(err.message);
      } else {
        setToastMessage(
          "Error occured attempting to remove participant. Please try again."
        );
      }
    }
    setLoadingText("");
  };

  return (
    <>
      <View style={[generic.container, { justifyContent: "flex-start" }]}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 3 }} /*Flag, hamburger button, Threshold  */>
            <View
              style={{
                flex: -1,
                alignSelf: "flex-end",
                marginTop: -scaleHeight(55),
              }}
            >
              <FlagIndicator
                color={Colors.red}
                useRounded={false}
                absolute={false}
              />
            </View>
            <View style={styles.flagAndHamburgerRow}>
              <View style={{ flex: -1, alignSelf: "flex-end" }}>
                <ThresholdIndicator
                  color={Colors.yellow}
                  threshold={threshold ?? 0}
                />
              </View>
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
          <View /* "Who's in Seat" and Flag raise count */
            style={{
              flexDirection: "row",
              flex: 5,
              //bottom: insets.bottom ? 0 : 10,
            }}
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
                {participantInSeat ? (
                  <Popover
                    from={(sourceRef, showPopover) => (
                      <Pressable
                        onLongPress={showPopover}
                        hitSlop={scaleArea(60)}
                        style={{ width: "120%" }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                          }}
                        >
                          <Ionicons
                            name="person-outline"
                            size={scaleArea(50)}
                            color="black"
                          />
                          <AutoSizeText
                            style={[styles.whosInSeatText]}
                            mode={ResizeTextMode.max_lines}
                            numberOfLines={2}
                            fontSize={fontStyles.xsmall.fontSize}
                          >
                            {participantInSeat.name}
                          </AutoSizeText>
                        </View>
                      </Pressable>
                    )}
                    placement={Placement.RIGHT}
                    arrowSize={{ height: 0, width: 0 }}
                    popoverStyle={{
                      backgroundColor: Colors.yellow,
                      marginLeft: -scaleWidth(20),
                    }}
                    displayArea={{
                      x: 0,
                      y: -scaleHeight(538),
                      width: Dimensions.get("screen").width,
                      height: Dimensions.get("screen").height,
                    }}
                  >
                    <View style={{ paddingHorizontal: scaleArea(8) }}>
                      <OpacityPressable onPress={handleRemoveFromSeat}>
                        <Text style={{ paddingVertical: scaleArea(12) }}>
                          Remove from seat
                        </Text>
                      </OpacityPressable>
                    </View>
                  </Popover>
                ) : (
                  <Text
                    style={[
                      generic.title,
                      { ...fontStyles.xsmall, textAlign: "center" },
                    ]}
                  >
                    Empty
                  </Text>
                )}
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
              <View
                style={[
                  styles.fractionContainer,
                  {
                    backgroundColor: thresholdReached
                      ? Colors.buzzerRed
                      : Colors.culturedWhite,
                  },
                ]}
              >
                <View style={{ top: -scaleHeight(20) }}>
                  <Text style={[styles.number]}>
                    {flagsRaisedCount.toString().padStart(2, "0")}
                  </Text>
                </View>
                <View style={{ transform: [{ rotate: "20deg" }] }}>
                  <Text style={[styles.number, { fontSize: getFontSize() }]}>
                    /
                  </Text>
                </View>
                <View style={{ top: scaleHeight(20) }}>
                  <Text style={[styles.number, { fontSize: getFontSize() }]}>
                    {participantCount.toString().padStart(2, "0")}
                  </Text>
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
                  onLongPress={() => setControl("reset")}
                  hitSlop={scaleArea(50)}
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
                  onLongPress={handlePause}
                  hitSlop={scaleArea(50)}
                >
                  <View style={styles.controlButtons}>
                    <Feather
                      name={isPaused ? "play" : "pause"}
                      size={scaleArea(50)}
                      color={Colors.black}
                    />
                  </View>
                </Pressable>

                <Text style={styles.controlButtonLabel}>
                  {isPaused ? "Unpause Participants" : "Pause Participants"}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <>
        {controlLoadingText && (
          <LoadingOverlay loadingText={controlLoadingText} />
        )}
        <Toast message={controlToast} />
      </>
    </>
  );
}

export default ModeratorScreen;

const styles = StyleSheet.create({
  hamburger: {
    //alignSelf: "flex-start",
    marginRight: scaleWidth(24),
    marginTop: scaleHeight(20),
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
    //backgroundColor: Colors.culturedWhite,
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
    width: "80%",
    textAlign: "center",
  },
});
