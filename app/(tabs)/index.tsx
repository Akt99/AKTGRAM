import FloatingActionButton from "@/components/ui/FloatingActionButton";
import CommentsBottomSheet from "../../components/CommentsBottomSheet";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import PostCard from "../../components/PostCard";
import BaseScreen from "../../components/ui/BaseScreen";
import { useFeed } from "../hooks/useFeed";

export default function HomeScreen() {
  const router = useRouter();
  const { posts, loading } = useFeed();
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const sheetRef = useRef<BottomSheetModal | null>(null);

  return (
    <BaseScreen>
      <FlatList
        data={loading ? [] : posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
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
              <Text style={{ color: "#9ca3af", marginBottom: 8 }}>Open comments (debug)</Text>
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
