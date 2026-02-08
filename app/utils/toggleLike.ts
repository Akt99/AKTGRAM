import { db } from "@/firebase/firebaseConfig";
import { deleteDoc, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export async function toggleLike(postId: string, userId: string) {
  const likeRef = doc(db, "posts", postId, "likes", userId);
  const postRef = doc(db, "posts", postId);

  const snap = await getDoc(likeRef);

  if (snap.exists()) {
    // UNLIKE
    await deleteDoc(likeRef);
    await updateDoc(postRef, {
      likeCount: increment(-1),
    });
  } else {
    // LIKE
    await setDoc(likeRef, {
      createdAt: serverTimestamp(),
    });
    await updateDoc(postRef, {
      likeCount: increment(1),
    });
  }
}
