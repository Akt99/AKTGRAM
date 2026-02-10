import {
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";

export type Post = {
  id: string;
  text: string;
  caption: string;
  uid: string;
  authorName?: string | null;
  authorPhoto?: string | null;
  createdAt: any;
  likeCount?: number;
  commentCount?: number;
};

export function useFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(data);
      setLoading(false);
    });

    return unsub;
  }, []);

  return { posts, loading };
}
