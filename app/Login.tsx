// app/(auth)/Login.tsx
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../firebase/firebaseConfig";
import "../googleSignIn"; // runs GoogleSignin.configure()

export default function Login() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      await GoogleSignin.revokeAccess();



      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        console.log("❌ No idToken returned from Google");
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);

      console.log("🔥 Firebase Google login success");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("❌ Google Sign-In error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Company Logo */}
      <View style={styles.starBadge}>
        <Ionicons name="star" size={18} color="#FFD600" />
      </View>

      {/* Brand */}
      <Text style={styles.brand}>AKTGRAM</Text>
      <Text style={styles.tagline}>Connect with the world</Text>

      {/* Hero Image */}
      <Image
        source={require("../assets/images/aktgramicon.png")}
        style={styles.logo}
      />

      {/* Google Button */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={signInWithGoogle}
        activeOpacity={0.85}
      >
        <Text style={styles.googleText}>CONTINUE WITH GOOGLE</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Built for builders • Powered by Firebase & Expo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 36,
  },
  starBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#1b1b1d",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  brand: {
    fontFamily: "JB-Bold",
    fontSize: 34,
    letterSpacing: 2.5,
    color: "#FFFFFF",
    marginBottom: 6,
  },

  tagline: {
    fontFamily: "JB-Regular",
    fontSize: 13,
    color: "#888",
    marginBottom: 28,
  },

  googleButton: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  googleText: {
    fontFamily: "JB-Medium",
    fontSize: 14,
    letterSpacing: 1,
    color: "#000000",
  },

  footerText: {
    fontFamily: "JB-Regular",
    fontSize: 11,
    color: "#666",
    marginTop: 8,
  },
});
