import { auth } from "@/firebase/firebaseConfig";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addComment } from "../app/utils/addComment";
import { toggleLike } from "../app/utils/toggleLike";
import CommentsBottomSheet from "./CommentsBottomSheet";

type PostCardProps = {
  post: {
    id: string;
    text: string;
    likeCount: number;
    commentCount: number;
  };
};

export default function PostCard({ post }: PostCardProps) {
  const user = auth.currentUser;
  const commentsRef = useRef<BottomSheetModal>(null);
  const router = useRouter();

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.text}>{post.text}</Text>

        <View style={styles.actions}>
          {/* ❤️ LIKE */}
          <TouchableOpacity
            disabled={!user}
            onPress={() => {
              if (!user) return;
              toggleLike(post.id, user.uid);
            }}
          >
            <Text style={styles.actionText}>❤️ {post.likeCount}</Text>
          </TouchableOpacity>

          {/* 💬 COMMENTS → NAVIGATION */}
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/post/[postId]/comments",
                params: { postId: post.id },
              })
            }
          >
            <Text style={styles.actionText}>💬 {post.commentCount}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comments Bottom Sheet (kept intentionally, not active for now) */}
      <CommentsBottomSheet
        ref={commentsRef}
        comments={[]} // wired later via Firestore listener
        onAddComment={(text) => {
          if (!user) return;
          addComment(post.id, text, user);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  actionText: {
    color: "#aaa",
    fontSize: 13,
  },
});
