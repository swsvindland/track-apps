import { ExpoConfig } from "@expo/config";

// const CLERK_PUBLISHABLE_KEY = "pk_test_c2F2ZWQtbGVvcGFyZC01NC5jbGVyay5hY2NvdW50cy5kZXYk";
const CLERK_PUBLISHABLE_KEY = "pk_live_Y2xlcmsud29ya291dC10cmFjay5jb20k";

const defineConfig = (): ExpoConfig => ({
  owner: "swsvindland",
  name: "Body Track",
  slug: "body-track",
  version: "2.0.0",
  scheme: "body-track",
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
  assetBundlePatterns: ["**/*"],
  ios: {
    userInterfaceStyle: "automatic",
    supportsTablet: true,
    bundleIdentifier: "com.svindland.bodytrack",
  },
  android: {
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
    CLERK_PUBLISHABLE_KEY,
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
