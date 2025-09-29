declare module "*/useAds" {
  export function useAds(): {
    showAd: (onClose: () => void) => void;
  };
}
