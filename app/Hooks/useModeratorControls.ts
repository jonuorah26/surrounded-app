import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/Store";
import { modifyPause, resetFlags } from "../Firebase/FirestoreService";
import { updateIsPaused } from "../Store/PartyReducer";
import { AppError } from "../Firebase/Types";

type Controls = "pause" | "unpause" | "reset" | "";

export const useModeratorControls = () => {
  const [control, setControl] = useState<Controls>("");
  const [toast, setToast] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const { id: partyId } = useSelector(
    (state: RootState) => state.party.partyData
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (control === "") return;

    const executeControl = async () => {
      try {
        setToast("");
        switch (control) {
          case "pause":
            setLoadingText("Pausing...");
            await modifyPause(partyId, true);
            //dispatch(updateIsPaused(true));
            setToast("Participants paused!");
            break;
          case "unpause":
            setLoadingText("Unpausing...");
            await modifyPause(partyId, false);
            //dispatch(updateIsPaused(false));
            setToast("Participants unpaused!");
            break;
          case "reset":
            setLoadingText("Resetting flags...");
            await resetFlags(partyId);
            setToast("Participants' flags reset!");
        }
      } catch (err) {
        switch (control) {
          case "pause":
            setToast("Error occured. Failed to pause participants.");
            break;
          case "unpause":
            setToast("Error occured. Failed to unpause participants.");
            break;
          case "reset":
            if (err instanceof AppError) {
              setToast(err.message);
            } else {
              setToast("Error occured. Failed to reset participants' flags.");
            }
            break;
        }
      }
      setLoadingText("");
      setControl("");
    };
    executeControl();
  }, [control]);

  return { setControl, controlToast: toast, controlLoadingText: loadingText };
};
