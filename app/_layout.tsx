// app/_layout.tsx
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/AuthContext";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "JB-Regular": require("../assets/images/fonts/JetBrainsMono-Regular.ttf"),
    "JB-Medium": require("../assets/images/fonts/JetBrainsMono-Medium.ttf"),
    "JB-Bold": require("../assets/images/fonts/JetBrainsMono-Bold.ttf"),
  });

  // ⛔ DO NOT render app until fonts are ready
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0A0A0A",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
    <AuthProvider>
      <Slot />
    </AuthProvider>
    </SafeAreaProvider>
  );
}