import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export const logout = async () => {
  try {
    // 1️⃣ Firebase sign out
    await signOut(auth);

    // 2️⃣ Google sign out (important!)
    await GoogleSignin.signOut();

    console.log("✅ User logged out successfully");
  } catch (error) {
    console.error("❌ Logout error:", error);
  }
};