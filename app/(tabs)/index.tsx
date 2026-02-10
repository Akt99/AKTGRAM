import FloatingActionButton from "@/components/ui/FloatingActionButton";
import CommentsBottomSheet from "../../components/CommentsBottomSheet";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PostCard from "../../components/PostCard";
import BaseScreen from "../../components/ui/BaseScreen";
import { useFeed } from "../hooks/useFeed";

export default function HomeScreen() {
  const router = useRouter();
  const { posts, loading } = useFeed();
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const sheetRef = useRef<BottomSheetModal | null>(null);

  return (
    <BaseScreen>
      <FlatList
        style={{ flex: 1 }}
        data={loading ? [] : posts.slice(0, page * 10)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.content, { paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (loading || loadingMore) return;
          if ((posts?.length ?? 0) > page * 10) {
            setLoadingMore(true);
            setTimeout(() => {
              setPage((p) => p + 1);
              setLoadingMore(false);
            }, 300);
          }
        }}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Home</Text>

            {/* DEBUG: manual comments opener */}
            <TouchableOpacity
              style={{ paddingVertical: 8 }}
              onPress={() => {
                console.log("DEBUG: manual open comments. sheetRef:", sheetRef.current);
                if (!activePostId && posts?.length) setActivePostId(posts[0].id);
                setTimeout(() => {
                  console.log("calling present() (debug)", sheetRef.current);
                  sheetRef.current?.present();
                  setTimeout(() => {
                    console.log("calling expand() (debug)", sheetRef.current);
                    sheetRef.current?.expand?.();
                  }, 120);
                }, 120);
              }}
            >
              <Text style={{ color: "#9ca3af", marginBottom: 8 }}></Text>
            </TouchableOpacity>

            {loading && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}

            {!loading && posts.length === 0 && (
              <Text style={styles.empty}>
                No posts yet 👀  
                Be the first one to post!
              </Text>
            )}
          </>
        }
        renderItem={({ item }) => (
          <PostCard
            post={{
              ...item,
              likeCount: item.likeCount ?? 0,
              commentCount: item.commentCount ?? 0,
              authorName: item.authorName ?? "Unknown",
              authorPhoto: item.authorPhoto ?? null,
            }}
            onCommentPress={(postId)=>{
              console.log("OPEN COMMENTS FOR", postId, "sheetRef:", sheetRef.current);
              // ensure activePostId updates before presenting the sheet
              setActivePostId(postId);
              setTimeout(() => {
                console.log("calling present() (from comment) ", sheetRef.current);
                sheetRef.current?.present();
                setTimeout(() => {
                  console.log("calling expand() (from comment)", sheetRef.current);
                  sheetRef.current?.expand?.();
                }, 120);
              }, 120);
            }}
          />
        )}
        ListFooterComponent={() => (
          <View style={{ paddingVertical: 12 }}>
            {loadingMore ? (
              <ActivityIndicator size="small" />
            ) : (posts.length > page * 10 && <Text style={{ textAlign: "center", color: "#9ca3af" }}>Scroll to load more</Text>)}
            {posts.length <= page * 10 && !loading && (
              <Text style={{ textAlign: "center", color: "#9ca3af" }}>No more posts</Text>
            )}
          </View>
        )}
      />

      {/* ➕ FAB */}
      <FloatingActionButton
        onPress={() => router.push("/create-post" as any)}
      />

      {/* 💬 ONE GLOBAL COMMENTS BOTTOM SHEET */}
      <CommentsBottomSheet
        ref={sheetRef}
        postId={activePostId}
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

  skeleton: {
    height: 80,
    borderRadius: 12,
    backgroundColor: "#2a2a2d",
    marginBottom: 12,
  },
});
