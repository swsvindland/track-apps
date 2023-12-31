import { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  owner: "swsvindland",
  name: "Water Track",
  slug: "water-track",
  scheme: "water-track",
  version: "4.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/94bb81a4-fa24-4be0-936f-c47d6f1ac1de",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    buildNumber: "8",
    userInterfaceStyle: "automatic",
    supportsTablet: true,
    bundleIdentifier: "com.svindland.watertrack",
  },
  android: {
    versionCode: 8,
    userInterfaceStyle: "automatic",
    package: "com.svindland.watertrack",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#fff",
    },
  },
  extra: {
    eas: {
      projectId: "f3848044-ce0d-40d1-abf6-fd57378c04be",
    },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
