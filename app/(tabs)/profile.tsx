// app/(tabs)/profile.tsx
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BaseScreen from "../../components/ui/BaseScreen";
import { colors } from "../../constants/theme";
import { logout } from "../utils/logout";

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("../Login");
  };

  return (
    <BaseScreen>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Account & preferences</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Signed in with</Text>
        <Text style={styles.value}>Google Account</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.85}
      >
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "JB-Bold",
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: 4,
  },

  subtitle: {
    fontFamily: "JB-Regular",
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 24,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 32,
  },

  label: {
    fontFamily: "JB-Regular",
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },

  value: {
    fontFamily: "JB-Medium",
    fontSize: 14,
    color: colors.textPrimary,
  },

  logoutButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    fontFamily: "JB-Bold",
    fontSize: 14,
    letterSpacing: 1,
    color: colors.primary,
  },
});