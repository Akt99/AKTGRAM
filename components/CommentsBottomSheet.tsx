import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { forwardRef, useMemo, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
//import {db} from "@/firebase/firebaseConfig";

type Comment = {
  id: string;
  text: string;
  uid: string;
  authorName: string;
  createdAt: any; // Firestore Timestamp (to be refined later)
};

type Props = {
  comments: Comment[];
  onAddComment: (text: string) => void;
};

const CommentsBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ comments, onAddComment }, ref) => {
    const snapPoints = useMemo(() => ["55%"], []);
    const [input, setInput] = useState("");


    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} />
        )}
        backgroundStyle={{ backgroundColor: "#0f0f0f" }}
        handleIndicatorStyle={{ backgroundColor: "#444" }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Comments</Text>

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
              onChangeText={setInput}
            />
            <TouchableOpacity onPress={() => {
                if (!input.trim()) return;
                onAddComment(input.trim());
                setInput("");
                }}>
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
