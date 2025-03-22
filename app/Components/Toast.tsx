import React, { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import { Colors } from "../Constants/Colors";

type Props = {
  message: string;
};

export default function Toast({ message }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const show = message.length > 0;

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  return (
    <Snackbar
      visible={isVisible}
      onDismiss={() => setIsVisible(false)}
      action={{
        label: "Dismiss",
        labelStyle: { color: Colors.yellow },
        onPress: () => setIsVisible(false),
      }}
    >
      {message}
    </Snackbar>
  );
}
