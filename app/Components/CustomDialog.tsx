import * as React from "react";
import { AlertButton } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useDialog } from "../Context/DialogContext";
import { Colors } from "../Constants";

type Props = {
  title?: string;
  message?: string;
  buttons?: AlertButton[];
};

export default function CustomDialog({ title, message, buttons }: Props) {
  const { clear, isOpen } = useDialog();

  React.useEffect(() => {
    if (isOpen) console.log("dialog open");
  }, [isOpen]);

  return (
    <Dialog
      visible={isOpen}
      onDismiss={clear}
      style={{ backgroundColor: Colors.drawerBackgroundColor }}
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
              onPress={() =>
                button.onPress
                  ? () => {
                      button.onPress?.();
                      clear();
                    }
                  : clear()
              }
              textColor={
                button.style === "destructive" ? Colors.buzzerRed : Colors.blue
              }
            >
              {button.text}
            </Button>
          ))
        ) : (
          <Button onPress={() => clear()}>OK</Button>
        )}
      </Dialog.Actions>
    </Dialog>
  );
}
