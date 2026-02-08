import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommentsScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
        {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFD600" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Comments</Text>

        {/* Spacer to center title */}
        <View style={{ width: 24 }} />
      </View>
     {/* BODY */}
      <Text style={styles.subtitle}>Post ID</Text>
      <Text style={styles.postId}>{postId}</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
  },
  headerTitle:{
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
  },
  postId: {
    color: "#FFD600",
    fontSize: 13,
    marginTop: 6,
  },
});
