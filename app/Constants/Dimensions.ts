import React from "react";
import { Dimensions } from "react-native";

// Base dimensions from a standard device (e.g., iPhone 11: 414 x 896)
const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

const { width, height } = Dimensions.get("window");
//const { width, height } = Dimensions.get("screen");

export const SH = (n: number) => height * n;
export const SW = (n: number) => width * n;
export const SA = (n: number) => height * width * n;

// Scale factor based on width
export const scaleWidth = (size: number) => (width / BASE_WIDTH) * size;

// Scale factor based on height
export const scaleHeight = (size: number) => (height / BASE_HEIGHT) * size;

// Scale factor based on screen area
export const scaleArea = (size: number) => {
  const BASE_AREA = BASE_WIDTH * BASE_HEIGHT; // Reference device area
  const SCREEN_AREA = width * height; // Current device area
  return Math.sqrt(SCREEN_AREA / BASE_AREA) * size;
};

export const scaleFont = (size: number) =>
  Math.sqrt((width * height) / (BASE_WIDTH * BASE_HEIGHT)) * size;
