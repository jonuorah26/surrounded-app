import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../Constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import { scaleArea, scaleHeight, scaleWidth } from "../Constants/Dimensions";
import { fontStyles } from "../Constants/GenericStyles";

type Props = {
  headerText: string;
  subText?: string;
  subText2?: string;
};

export default function Overlay({ headerText, subText, subText2 }: Props) {
  return (
    <View
      style={[styles.container, { backgroundColor: Colors.disablingOverlay }]}
    >
      <View style={{ alignItems: "center", gap: scaleHeight(50) }}>
        <Text
          style={{ ...fontStyles.xlarge, width: "95%", textAlign: "center" }}
        >
          {headerText}
        </Text>
        {subText && (
          <Text
            style={{
              ...fontStyles.medium,
              textAlign: "center",
              width: "95%",
            }}
          >
            {subText}
          </Text>
        )}
        {subText2 && (
          <Text
            style={{
              ...fontStyles.large,
              textAlign: "center",
              width: "95%",
            }}
          >
            {subText2}
          </Text>
        )}
      </View>
    </View>
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
    zIndex: 10,
    justifyContent: "center",
  },
});
