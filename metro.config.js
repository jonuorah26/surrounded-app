// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const path = require("path");

const config = getDefaultConfig(__dirname);

// --- PATCH: ensure correct asset and public paths for GitHub Pages ---

config.transformer = config.transformer || {};
config.transformer.publicPath = "/surrounded-app/";

// Optional local dev middleware to strip base path
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url.startsWith("/surrounded-app/")) {
        req.url = req.url.replace("/surrounded-app", "");
      }
      return middleware(req, res, next);
    };
  },
};

// Allow .mjs globally (some packages need it)
config.resolver.sourceExts = [
  "web.ts",
  "web.tsx",
  "web.js",
  "ts",
  "tsx",
  "js",
  "jsx",
  "cjs",
  "mjs",
  "json",
];

// Exclude ONLY .mjs in @firebase packages
config.resolver.blockList = exclusionList([
  new RegExp(`${__dirname}/node_modules/react-native-google-mobile-ads/.*`),
  new RegExp(`${__dirname}/node_modules/@firebase/.*\\.mjs$`),
]);

// 👇 Redirect react-native-google-mobile-ads to stub
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "react-native-google-mobile-ads": path.resolve(
    __dirname,
    "stubs/react-native-google-mobile-ads.js"
  ),
};

// Disable stricter exports resolution
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
