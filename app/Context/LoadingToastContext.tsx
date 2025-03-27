import React, { createContext, useState, useContext } from "react";
import Toast from "../Components/Toast";
import LoadingOverlay from "../Components/LoadingOverlay";

export type LoadingToastSetters = {
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
  setLoadingText: React.Dispatch<React.SetStateAction<string>>;
};

type LoadingToastContextType = LoadingToastSetters;

const LoadingToastContext = createContext<LoadingToastContextType>({
  setLoadingText: () => {},
  setToastMessage: () => {},
});

export function LoadingToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toastMsg, setToastMessage] = useState("");
  const [loadingText, setLoadingText] = useState("");

  return (
    <LoadingToastContext.Provider value={{ setToastMessage, setLoadingText }}>
      {children}
      <Toast message={toastMsg} />
      {loadingText && <LoadingOverlay loadingText={loadingText} />}
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
