export const useAds = () => {
  const showAd = (onClose: () => void) => {
    // Immediately call onClose on web (no ads)
    onClose();
  };

  return { showAd };
};
