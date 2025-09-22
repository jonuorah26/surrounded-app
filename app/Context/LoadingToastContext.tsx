import React, { createContext, useState, useContext } from "react";
import Toast from "../Components/Toast";
import LoadingOverlay from "../Components/LoadingOverlay";
import { Portal } from "react-native-paper";
import { useAds } from "../Hooks/useAds";

export type LoadingToastSetters = {
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
  setLoadingText: React.Dispatch<React.SetStateAction<string>>;
  showAd: (onClose: () => void) => void;
};

type LoadingToastContextType = LoadingToastSetters;

const LoadingToastContext = createContext<LoadingToastContextType>({
  setLoadingText: () => {},
  setToastMessage: () => {},
  showAd: (onClose: () => void) => {},
});

export function LoadingToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toastMsg, setToastMessage] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const { showAd } = useAds();

  return (
    <LoadingToastContext.Provider
      value={{ setToastMessage, setLoadingText, showAd }}
    >
      {children}
      <Toast message={toastMsg} setMessage={setToastMessage} />
      <LoadingOverlay loadingText={loadingText} />
    </LoadingToastContext.Provider>
  );
}

export function useLoadingToast() {
  const context = useContext(LoadingToastContext);
  if (!context) {
    throw new Error(
      "useLoadingToast must be used within a LoadingToastProvider"
    );
  }
  return context;
}
