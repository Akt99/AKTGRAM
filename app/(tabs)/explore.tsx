import { FlatList, StyleSheet, Text, View } from "react-native";
import BaseScreen from "../../components/ui/BaseScreen";

const MOCK_DATA = [
  { id: "1", title: "🔥 Trending creators" },
  { id: "2", title: "📸 Photography" },
  { id: "3", title: "🎵 Music & artists" },
  { id: "4", title: "💻 Tech & startups" },
  { id: "5", title: "🎮 Gaming" },
];

export default function ExploreScreen() {
  return (
    <BaseScreen>
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.subtitle}>Discover people & content</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingTop: 0, // header already inside list
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
