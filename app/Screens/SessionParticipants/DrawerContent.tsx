import React from "react";
import { View, Text, Pressable } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Colors } from "@/app/Constants/Colors";
import { fontStyles } from "@/app/Constants/GenericStyles";
import { scaleHeight, scaleWidth } from "@/app/Constants/Dimensions";

const Divider = () => (
  <View
    style={{
      width: scaleWidth(290),
      height: scaleHeight(1.5),
      backgroundColor: Colors.disabledGray,
    }}
  ></View>
);

export default function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ paddingBottom: scaleHeight(54) }}>
        <Text
          style={{
            fontSize: fontStyles.large.fontSize,
            color: Colors.culturedWhite,
          }}
        >
          Menu
        </Text>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable onPress={() => /*props.navigation.navigate("Settings")*/ {}}>
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.culturedWhite,
              alignSelf: "center",
            }}
          >
            View Participants
          </Text>
        </Pressable>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable onPress={() => /*props.navigation.navigate("Settings")*/ {}}>
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.culturedWhite,
              alignSelf: "center",
            }}
          >
            Edit Vote Out Threshold
          </Text>
        </Pressable>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable onPress={() => /*props.navigation.navigate("Settings")*/ {}}>
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.culturedWhite,
              alignSelf: "center",
            }}
          >
            Edit Session Capacity
          </Text>
        </Pressable>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: scaleHeight(24),
        }}
      >
        <Pressable onPress={() => /*props.navigation.navigate("Settings")*/ {}}>
          <Text
            style={{
              fontSize: fontStyles.medium.fontSize,
              color: Colors.red,
              alignSelf: "center",
            }}
          >
            End Session
          </Text>
        </Pressable>
      </View>
      <Divider />
    </DrawerContentScrollView>
  );
}
