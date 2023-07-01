import { ExpoConfig } from "@expo/config";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_c2F2ZWQtbGVvcGFyZC01NC5jbGVyay5hY2NvdW50cy5kZXYk";

const defineConfig = (): ExpoConfig => ({
  name: "Body Track",
  slug: "body-track",
  version: "2.0.0",
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
      projectId: "your-project-id",
    },
    CLERK_PUBLISHABLE_KEY,
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;