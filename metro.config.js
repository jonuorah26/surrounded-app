// // metro.config.js
// const { getDefaultConfig } = require("expo/metro-config");

// const config = getDefaultConfig(__dirname);

// config.resolver.alias = {
//   "@": __dirname,
// };

// // -----------------------------------------------------------------------------
// // Firebase / Expo SDK 53: allow “.cjs” files and use classic Node “exports”
// // resolution so Firebase sub‑packages are bundled correctly.
// // -----------------------------------------------------------------------------
// config.resolver.sourceExts = ["ts", "tsx", "js", "jsx", "cjs", "json"];
// config.resolver.sourceExts = config.resolver.sourceExts || [];
// if (!config.resolver.sourceExts.includes("cjs")) {
//   config.resolver.sourceExts.push("cjs");
// }

// // Disable the new, stricter “package.json exports” resolution until every
// // dependency (Firebase, React‑Native‑WebView, etc.) ships full export maps.
// config.resolver.unstable_enablePackageExports = false;

// // -----------------------------------------------------------------------------
// // That’s it – export the tweaked config.
// // -----------------------------------------------------------------------------
// module.exports = config;

// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

const config = getDefaultConfig(__dirname);

// Allow .mjs globally (some packages need it)
config.resolver.sourceExts = ["ts", "tsx", "js", "jsx", "cjs", "mjs", "json"];

// Exclude ONLY .mjs in @firebase packages
config.resolver.blockList = exclusionList([
  new RegExp(`${__dirname}/node_modules/@firebase/.*\\.mjs$`),
]);

// Disable stricter exports resolution
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
