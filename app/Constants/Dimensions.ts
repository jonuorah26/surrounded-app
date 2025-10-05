import React from "react";
import { Dimensions, DimensionValue, PixelRatio, Platform } from "react-native";

// Base dimensions for mobile, tablet, and desktop
// Base dimensions from a standard device (e.g., iPhone 11: 414 x 896)
const MOBILE_BASE = { width: 414, height: 896 }; // iPhone 11
const TABLET_BASE = { width: 834, height: 1194 }; // iPad Pro 11"
const DESKTOP_BASE = { width: 1440, height: 800 }; // 15" laptop

const { width, height } = Dimensions.get("window");

console.log("width:", width);
console.log("height:", height);

// Helper function for linear interpolation
const lerp = (start: number, end: number, t: number) =>
  start + (end - start) * t;

// Determine category based on width and interpolate base dimensions smoothly
// Categories: mobile < tablet < desktop
let BASE_WIDTH: number;
let BASE_HEIGHT: number;

if (width < TABLET_BASE.width) {
  // Mobile to tablet interpolation
  const t =
    (width - MOBILE_BASE.width) / (TABLET_BASE.width - MOBILE_BASE.width);
  BASE_WIDTH = lerp(
    MOBILE_BASE.width,
    TABLET_BASE.width,
    Math.min(Math.max(t, 0), 1)
  );
  BASE_HEIGHT = lerp(
    MOBILE_BASE.height,
    TABLET_BASE.height,
    Math.min(Math.max(t, 0), 1)
  );
} else if (width < DESKTOP_BASE.width) {
  // Tablet to desktop interpolation
  const t =
    (width - TABLET_BASE.width) / (DESKTOP_BASE.width - TABLET_BASE.width);
  BASE_WIDTH = lerp(
    TABLET_BASE.width,
    DESKTOP_BASE.width,
    Math.min(Math.max(t, 0), 1)
  );
  BASE_HEIGHT = lerp(
    TABLET_BASE.height,
    DESKTOP_BASE.height,
    Math.min(Math.max(t, 0), 1)
  );
} else {
  // Desktop or larger
  BASE_WIDTH = DESKTOP_BASE.width;
  BASE_HEIGHT = DESKTOP_BASE.height;
}

export const VH = (n: number) => height * (n / 100);
export const VW = (n: number) => width * (n / 100);
export const VA = (n: number) => height * width * (n / 100);

// Scale factor based on width (no clamping)
export const scaleWidth = (size: number) => {
  return (width / BASE_WIDTH) * size;
};

// Scale factor based on height (no clamping)
export const scaleHeight = (size: number) => {
  return (height / BASE_HEIGHT) * size;
};

// Scale factor based on screen area (no clamping)
export const scaleArea = (size: number) => {
  const BASE_AREA = BASE_WIDTH * BASE_HEIGHT; // Reference device area
  const SCREEN_AREA = width * height; // Current device area
  return Math.sqrt(SCREEN_AREA / BASE_AREA) * size;
};

export const scaleFont = (size: number) => {
  return Math.sqrt((width * height) / (BASE_WIDTH * BASE_HEIGHT)) * size;
};

// Set a base font size (like the browser default)
const BASE_REM = 12;

export const rem = (multiplier: number) => {
  if (Platform.OS === "web") {
    // On web, return real rem CSS unit
    return `${multiplier}rem` as any;
  }
  // On native, scale numerically
  return (PixelRatio.getFontScale() * BASE_REM * multiplier) as any;
};
