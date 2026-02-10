import { auth } from "@/firebase/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { toggleLike } from "../app/utils/toggleLike";

type PostCardProps = {
  post: {
    id: string;
    text: string;
    likeCount: number;
    commentCount: number;
    authorName?: string | null;
    authorPhoto?: string | null;
  };
  onCommentPress?: (postId: string) => void;
};

export default function PostCard({ post, onCommentPress }: PostCardProps) {
    console.log("✅ PostCard LOADED FROM components/PostCard.tsx");

  const user = auth.currentUser;
  const scale = useSharedValue(1);

  const initials =
    (post.authorName ?? "U")
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {post.authorPhoto ? (
          <Image source={{ uri: post.authorPhoto }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        )}
        <Text style={styles.authorName}>{post.authorName ?? "Unknown"}</Text>
      </View>

      <Text style={styles.text}>{post.text}</Text>

      <View style={styles.actions}>
        {/* ❤️ LIKE */}
        <TouchableOpacity
          onPress={() => {
            if (!user) return;
            scale.value = withSpring(1.2, {}, () => {
              scale.value = withSpring(1);
            });
            toggleLike(post.id, user.uid);
          }}
        >
          <View style={styles.actionButton}>
            <Ionicons name="heart-outline" size={18} color="#FF375F" />
            <Text style={styles.actionText}>{post.likeCount}</Text>
          </View>
        </TouchableOpacity>

        {/* 💬 COMMENT */}
        <TouchableOpacity
          onPress={() => {
            try {
              onCommentPress?.(post.id);
            } catch (err) {
              console.error("Error in onCommentPress:", err);
            }
          }}
          activeOpacity={0.7}
        >
          <View style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={18} color="#9CA3AF" />
            <Text style={styles.actionText}>{post.commentCount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2a2a2d",
  },
  avatarFallback: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2a2a2d",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFD600",
    fontWeight: "700",
    fontSize: 12,
  },
  authorName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  text: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: "#aaa",
    fontSize: 13,
  },
});
