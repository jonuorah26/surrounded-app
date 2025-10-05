import "dotenv/config";

export default {
  expo: {
    name: "Versus",
    slug: "surrounded-app",
    version: "1.0.0",
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      eas: {
        projectId: "b3c242a9-ad3c-44de-8dda-ba5c78380b78",
      },
    },
    android: {
      package: "com.anonymous.surroundedapp",
      googleServicesFile: "./google-services.json",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain", // or "cover"
        backgroundColor: "#1e90ff",
      },
    },
    ios: {
      bundleIdentifier: "com.anonymous.surroundedapp",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain", // or "cover"
        backgroundColor: "#1e90ff",
      },
    },
    web: {
      output: "static",
      publicPath: "/surrounded-app/",
      build: {
        publicPath: process.env.PUBLIC_URL || "/",
      },
      config: {
        basename: "/surrounded-app",
      },
    },
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain", // or "cover"
      backgroundColor: "#1e90ff",
    },
  },
};
