// app/create-post.tsx
import BaseScreen from "@/components/ui/BaseScreen";
import { useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase/firebaseConfig";

const MAX_CHARS = 280;

export default function CreatePost() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const remaining = MAX_CHARS - text.length;
  const isDisabled = text.trim().length === 0 || loading;

  const handlePost = async () => {
    if (isDisabled) return;

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to post.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "posts"), {
        uid: user.uid,                          // ✅ matches Firestore rules
        text: String(text.trim()),              // ✅ primitive string
        authorName: user.displayName ?? "Unknown",
        authorPhoto: user.photoURL ?? null,
        createdAt: serverTimestamp(),            // ✅ required timestamp
        likeCount: 0,
        commentCount: 0,
      });

      router.back();
    } catch (error) {
      console.error("Post creation failed:", error);
      Alert.alert("Error", "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseScreen>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity disabled={loading} onPress={() => router.back()}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePost}
            disabled={isDisabled}
            style={[
              styles.postButton,
              isDisabled && styles.postButtonDisabled,
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.postText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Text input */}
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#777"
          multiline
          maxLength={MAX_CHARS}
          value={text}
          onChangeText={setText}
          autoFocus
          editable={!loading}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            style={[
              styles.counter,
              remaining <= 20 && styles.counterWarning,
            ]}
          >
            {remaining}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  cancel: {
    fontSize: 16,
    color: "#777",
  },

  postButton: {
    backgroundColor: "#FFD600",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: 64,
    alignItems: "center",
  },

  postButtonDisabled: {
    opacity: 0.4,
  },

  postText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: "#fff",
    textAlignVertical: "top",
    paddingTop: 12,
  },

  footer: {
    alignItems: "flex-end",
    paddingTop: 8,
  },

  counter: {
    fontSize: 12,
    color: "#777",
  },

  counterWarning: {
    color: "#FFD600",
  },
});
