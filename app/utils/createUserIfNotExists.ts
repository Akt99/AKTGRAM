import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
// Adjusted import path for firebase config
import { db } from "../../firebase/firebaseConfig";
export async function createUserIfNotExists(user: any) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });
  }
}
