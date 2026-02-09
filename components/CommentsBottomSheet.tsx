import { auth, db } from "@/firebase/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { forwardRef, useEffect, useMemo, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { addComment } from "../app/utils/addComment";

type Comment = {
  id: string;
  text: string;
  uid: string;
  authorName: string;
  createdAt: any;
};

type Props = {
  postId: string | null;
};

const CommentsBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ postId }, ref) => {
    console.log("🟦 CommentsBottomSheet mounted. ref:", ref, "postId:", postId);
    useEffect(() => {
      console.log("🟦 CommentsBottomSheet postId changed:", postId, "ref:", ref);
    }, [postId, ref]);
    const snapPoints = useMemo(() => ["55%"], []);
    const [input, setInput] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);

    // 🔥 LISTEN TO COMMENTS FOR ACTIVE POST
    useEffect(() => {
      if (!postId) {
        setComments([]);
        return;
      }

      const q = query(
        collection(db, "posts", postId, "comments"),
        orderBy("createdAt", "asc")
      );

      const unsub = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];

        setComments(data);
      });

      return unsub;
    }, [postId]);

    const handleAddComment = () => {
      if (!input.trim()) return;
      if (!postId) return;

      const user = auth.currentUser;
      if (!user) return;

      addComment(postId, input.trim(), user);
      setInput("");
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} pressBehavior="close" />
        )}
        backgroundStyle={{ backgroundColor: "#0f0f0f" }}
        handleIndicatorStyle={{ backgroundColor: "#444" }}
        onDismiss={() => console.log("🟦 CommentsBottomSheet onDismiss")}
        onChange={(index) => console.log("🟦 CommentsBottomSheet onChange", index)}
        onPresent={() => console.log("🟦 CommentsBottomSheet onPresent")}
      >
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Comments</Text>
            <TouchableOpacity
              onPress={() => {
                try {
                  // forwardRef points to BottomSheetModal instance
                  (ref as any)?.current?.dismiss?.();
                } catch (err) {
                  console.error("Failed to dismiss bottom sheet:", err);
                }
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <BottomSheetFlatList
            data={comments}
            keyExtractor={(item: Comment) => item.id}
            renderItem={({ item }: { item: Comment }) => (
              <View style={styles.comment}>
                <Text style={styles.author}>{item.authorName}</Text>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            )}
          />

          {/* Input */}
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Add a comment..."
              placeholderTextColor="#777"
              style={styles.input}
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Text style={styles.send}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

export default CommentsBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  comment: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
  },

  author: {
    fontSize: 13,
    color: "#FFD600",
    marginBottom: 2,
  },

  text: {
    fontSize: 15,
    color: "#e5e5e5",
    lineHeight: 20,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#222",
    paddingVertical: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#fff",
    paddingVertical: 8,
  },

  send: {
    color: "#FFD600",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
  },
});
