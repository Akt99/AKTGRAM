// app/create-post.tsx
import BaseScreen from "@/components/ui/BaseScreen";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db, storage } from "../firebase/firebaseConfig";

const MAX_CHARS = 280;

export default function CreatePost() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

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

      // If an image was selected, upload it to Firebase Storage first
      let imageURL: string | null = null;
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const fileRef = storageRef(storage, `posts/${user.uid}/${Date.now()}.jpg`);
        await uploadBytes(fileRef, blob);
        imageURL = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, "posts"), {
        uid: user.uid,                          // ✅ matches Firestore rules
        text: String(text.trim()),              // ✅ primitive string
        authorName: user.displayName ?? "Unknown",
        authorPhoto: user.photoURL ?? null,
        imageURL: imageURL ?? null,
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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Permission to access photos is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      // expo-image-picker v14 returns assets array
      const uri = (result as any).assets?.[0]?.uri ?? (result as any).uri;
      if (uri) setImage(uri);
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

        {/* Image picker + preview */}
        <View style={styles.imageRow}>
          <TouchableOpacity onPress={pickImage} disabled={loading} style={styles.imageButton}>
            <Text style={{ color: "#FFD600", fontWeight: "600" }}>Add Photo</Text>
          </TouchableOpacity>
          {image && (
            <View style={styles.previewRow}>
              <Image source={{ uri: image }} style={styles.preview} />
              <TouchableOpacity onPress={() => setImage(null)}>
                <Text style={{ color: "#777", marginLeft: 8 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

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
  imageRow: {
    marginTop: 12,
    marginBottom: 8,
  },
  imageButton: {
    paddingVertical: 8,
  },
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  preview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#222",
  },
});
