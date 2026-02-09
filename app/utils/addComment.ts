import { db } from "@/firebase/firebaseConfig";
import { User } from "firebase/auth";
import {
    addDoc,
    collection,
    doc,
    increment,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

export async function addComment(
  postId: string,
  text: string,
  user: User
) {
  const commentsRef = collection(db, "posts", postId, "comments");
  const postRef = doc(db, "posts", postId);

  // add comment
  await addDoc(commentsRef, {
    text,
    uid: user.uid,
    authorName: user.displayName ?? "Anonymous",
    createdAt: serverTimestamp(),
  });

  // increment comment count
  await updateDoc(postRef, {
    commentCount: increment(1),
  });
}
