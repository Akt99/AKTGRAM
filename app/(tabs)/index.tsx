import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Your feed will appear here 👇</Text>

      {/* Placeholder posts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome to AKTGRAM 🎉</Text>
        <Text style={styles.cardText}>
          This is the home feed. Soon you’ll see posts from people you follow.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next steps</Text>
        <Text style={styles.cardText}>
          • Fetch posts from Firestore{"\n"}
          • Like / comment system{"\n"}
          • Infinite scroll
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
  },
});