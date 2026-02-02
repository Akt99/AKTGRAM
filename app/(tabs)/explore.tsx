import { FlatList, StyleSheet, Text, View } from "react-native";

const MOCK_DATA = [
  { id: "1", title: "🔥 Trending creators" },
  { id: "2", title: "📸 Photography" },
  { id: "3", title: "🎵 Music & artists" },
  { id: "4", title: "💻 Tech & startups" },
  { id: "5", title: "🎮 Gaming" },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>Discover people & content</Text>

      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 12 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
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
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4,
  },
  item: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#ffffff",
  },
});