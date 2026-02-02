import { Redirect, Tabs } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";

export default function TabsLayout() {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setChecked(true);
    });
    return unsub;
  }, []);

  // ⏳ Wait for Firebase to respond
  if (!checked) return null;

  // 🔒 BLOCK access to tabs if not logged in
  if (!loggedIn) {
    return <Redirect href="/Login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}