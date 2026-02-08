import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore";

export async function addComment(postId: string, text: string, user: any) {
  const commentsRef = collection(db, "posts", postId, "comments");
  const postRef = doc(db, "posts", postId);

  await addDoc(commentsRef, {
    text,
    uid: user.uid,
    authorName: user.displayName,
    createdAt: new Date(),
  });

  await updateDoc(postRef, {
    commentCount: increment(1),
  });
}
