import { Colors } from "@/app/Constants/Colors";
import { scaleArea, scaleWidth } from "@/app/Constants/Dimensions";
import { DrawerNavProps } from "@/app/Types";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
};

export function DrawerAppBar({ title }: Props) {
  const { toggleDrawer, navigate, goBack } = useNavigation<DrawerNavProps>();
  const insets = useSafeAreaInsets();

  return (
    <Appbar.Header
      style={{
        backgroundColor: Colors.drawerBackgroundColor,
        marginTop: -insets.top,
      }}
    >
      <Appbar.Action
        icon="chevron-left"
        color={Colors.yellow}
        onPress={() => {
          goBack();
          toggleDrawer();
        }}
        size={scaleArea(40)}
        hitSlop={scaleArea(200)}
      />
      <Appbar.Content
        title={title}
        titleStyle={{ color: Colors.culturedWhite }}
        style={{ marginLeft: -scaleWidth(15) }}
      />
    </Appbar.Header>
  );
}
