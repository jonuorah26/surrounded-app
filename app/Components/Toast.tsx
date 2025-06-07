import React, { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import { Colors } from "../Constants/Colors";

type Props = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function Toast({ message, setMessage }: Props) {
  return (
    <Snackbar
      visible={message.length > 0}
      onDismiss={() => setMessage("")}
      action={{
        label: "Dismiss",
        labelStyle: { color: Colors.yellow },
        onPress: () => setMessage(""),
      }}
      //style={{ backgroundColor: "#323232" }}
    >
      {message}
    </Snackbar>
  );
}
