import React, { ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";

type Props = PressableProps & {
  children?: ReactNode;
};

function OpacityPressable({ children, ...props }: Props) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
    >
      {children}
    </Pressable>
  );
}

export default OpacityPressable;
