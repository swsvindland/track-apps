import { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  owner: "swsvindland",
  name: "Body Track",
  slug: "body-track",
  version: "2.0.0",
  scheme: "body-track",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#2E586A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/94bb81a4-fa24-4be0-936f-c47d6f1ac1de",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    buildNumber: "8",
    userInterfaceStyle: "automatic",
    supportsTablet: true,
    bundleIdentifier: "com.svindland.bodytrack",
  },
  android: {
    versionCode: 8,
    userInterfaceStyle: "automatic",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#fff",
    },
  },
  extra: {
    eas: {
      projectId: "60c1bbb4-e957-4230-9043-4b4ecd847a64",
    },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
