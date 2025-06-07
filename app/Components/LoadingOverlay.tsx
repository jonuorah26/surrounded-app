import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../Constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import { scaleArea } from "../Constants/Dimensions";
import { fontStyles, OVERLAY_Z_INDEX } from "../Constants/GenericStyles";

type Props = {
  loadingText?: string;
};

export default function LoadingOverlay({ loadingText }: Props) {
  return (
    loadingText && (
      <View
        style={[styles.container, { backgroundColor: Colors.disablingOverlay }]}
      >
        <View style={{ alignItems: "center", gap: 20 }}>
          <ActivityIndicator
            animating={true}
            color={Colors.yellow}
            size={scaleArea(200)}
          />
          {loadingText && (
            <Text style={{ ...fontStyles.large, textAlign: "center" }}>
              {loadingText}
            </Text>
          )}
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: OVERLAY_Z_INDEX,
    justifyContent: "center",
  },
});
