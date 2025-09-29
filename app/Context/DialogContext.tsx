import { createContext, ReactNode, use, useContext, useState } from "react";
import { AlertButton } from "react-native";
import CustomDialog from "../Components/CustomDialog";

const DialogContext = createContext<{
  dialog: (title?: string, message?: string, buttons?: AlertButton[]) => void;
  clear: () => void;
  isOpen: boolean;
}>({ dialog: () => {}, clear: () => {}, isOpen: false });

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttons, setButtons] = useState<AlertButton[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const dialog = (title = "", message = "", buttons: AlertButton[] = []) => {
    setTitle(title);
    setMessage(message);
    setButtons(buttons);
    setIsOpen(true);
  };

  const clear = () => {
    setTitle("");
    setMessage("");
    setButtons([]);
    setIsOpen(false);
  };

  return (
    <DialogContext.Provider value={{ dialog, clear, isOpen }}>
      {children}
      <CustomDialog title={title} message={message} buttons={buttons} />
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
