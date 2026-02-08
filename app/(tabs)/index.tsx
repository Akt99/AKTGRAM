import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";
import PostCard from "../../components/PostCard";
import BaseScreen from "../../components/ui/BaseScreen";
import { useFeed } from "../hooks/useFeed";

export default function HomeScreen() {
  const router = useRouter();
  const { posts, loading } = useFeed();

  return (
    <BaseScreen>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Home</Text>

        {/* 🔄 LOADING STATE */}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {/* 📭 EMPTY STATE */}
        {!loading && posts.length === 0 && (
          <Text style={styles.empty}>
            No posts yet 👀  
            Be the first one to post!
          </Text>
        )}

        {/* 📰 FEED */}
        {!loading &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                   ...post,
                  likeCount: post.likeCount ?? 0,
                  commentCount: post.commentCount ?? 0,
              }}
              />

          ))}
      </ScrollView>

      {/* ➕ FAB */}
      <FloatingActionButton
        onPress={() => router.push("/create-post" as any)}
      />
    </BaseScreen>
  );
}

/* ---------------- COMPONENTS ---------------- */



function SkeletonCard() {
  const shimmer = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.skeleton, { opacity: shimmer }]} />
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
  },

  empty: {
    color: "#9ca3af",
    marginTop: 20,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  cardText: {
    fontSize: 15,
    color: "#ffffff",
    lineHeight: 20,
    marginBottom: 8,
  },

  meta: {
    flexDirection: "row",
    gap: 16,
  },

  metaText: {
    fontSize: 13,
    color: "#9ca3af",
  },

  skeleton: {
    height: 80,
    borderRadius: 12,
    backgroundColor: "#2a2a2d",
    marginBottom: 12,
  },
});
