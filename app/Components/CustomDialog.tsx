import * as React from "react";
import { AlertButton } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useDialog } from "../Context/DialogContext";
import { Colors } from "../Constants";

type Props = {
  title?: string;
  message?: string;
  buttons?: AlertButton[];
  manual?: {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function CustomDialog({
  title,
  message,
  buttons,
  manual,
}: Props) {
  const { clear, isOpen: dialogOpen } = useDialog();

  const dismissAction =
    manual === undefined ? clear : () => manual.setOpen(false);
  const isOpen = manual === undefined ? dialogOpen : manual.isOpen;

  return (
    <Dialog
      visible={isOpen}
      onDismiss={dismissAction}
      style={{
        backgroundColor: Colors.drawerBackgroundColor,
        maxWidth: "1000px" as any,
        width: "95%",
        alignSelf: "center",
      }}
    >
      <Dialog.Title style={{ color: Colors.culturedWhite }}>
        {title}
      </Dialog.Title>
      <Dialog.Content>
        <Text style={{ color: Colors.culturedWhite }}>{message}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        {buttons?.length ? (
          buttons.map((button) => (
            <Button
              onPress={() => {
                button.onPress?.();
                dismissAction();
              }}
              textColor={
                button.style === "destructive" ? Colors.buzzerRed : Colors.blue
              }
            >
              {button.text}
            </Button>
          ))
        ) : (
          <Button onPress={dismissAction}>OK</Button>
        )}
      </Dialog.Actions>
    </Dialog>
  );
}
