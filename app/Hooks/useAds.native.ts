import { useEffect, useRef } from "react";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { ONE_MIN } from "../Constants";

const adsRemoved = false; //FIXME: just for testing

const BUFFER_TIME_BETWEEN_ADS = 2 * ONE_MIN;

export const useAds = () => {
  const interstitialRef = useRef(
    InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL)
  );
  const lastAdShownTimeRef = useRef<number | null>(null);

  useEffect(() => {
    interstitialRef.current.load();

    const unsubscribeError = interstitialRef.current.addAdEventListener(
      AdEventType.ERROR,
      () => {
        interstitialRef.current.load();
      }
    );

    return unsubscribeError;
  }, []);

  const showAd = (onClose: () => void) => {
    const interstitial = interstitialRef.current;

    const now = new Date().getTime();
    const doShowAd =
      lastAdShownTimeRef.current === null ||
      now - lastAdShownTimeRef.current >= BUFFER_TIME_BETWEEN_ADS;

    console.log("lastAdShownTimeRef.current", lastAdShownTimeRef.current);
    console.log("now", now);

    if (!adsRemoved && interstitial.loaded && doShowAd) {
      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          lastAdShownTimeRef.current = new Date().getTime();
          unsubscribe();
          onClose();
          interstitial.load();
          console.log("lastAdShownTimeRef.current", lastAdShownTimeRef.current);
        }
      );

      interstitial.show();
    } else {
      onClose();
    }
  };

  return {
    showAd,
  };
};
