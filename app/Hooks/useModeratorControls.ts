import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/Store";
import { modifyPause, resetFlags } from "../Firebase/FirestoreService";
import { updateIsPaused } from "../Store/PartyReducer";
import { AppError } from "../Firebase/Types";
import { useLoadingToast } from "../Context/LoadingToastContext";

type Controls = "pause" | "unpause" | "reset" | "";

export const useModeratorControls = () => {
  const [control, setControl] = useState<Controls>("");
  const { setToastMessage: setToast, setLoadingText } = useLoadingToast();
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

  return { setControl };
};
