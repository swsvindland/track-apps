import { ExpoConfig } from "@expo/config";

const CLERK_PUBLISHABLE_KEY = !__DEV__
  ? "pk_live_Y2xlcmsud29ya291dC10cmFjay5jb20k"
  : "pk_test_c2F2ZWQtbGVvcGFyZC01NC5jbGVyay5hY2NvdW50cy5kZXYk";
const defineConfig = (): ExpoConfig => ({
  owner: "swsvindland",
  name: "Macro Track",
  slug: "macro-track",
  scheme: "macro-track",
  version: "1.0.0",
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
    bundleIdentifier: "com.svindland.bptrack",
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
      projectId: "94bb81a4-fa24-4be0-936f-c47d6f1ac1de",
    },
    CLERK_PUBLISHABLE_KEY,
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
