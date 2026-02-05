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
    <Tabs
      screenOptions={{
        headerShown: false,

        // 🖤 BLACK TAB BAR
        tabBarStyle: {
          backgroundColor: "#0B0B0B",
          borderTopColor: "#1A1A1A",
          height: 62,
        },

        // 💛 ACTIVE / INACTIVE COLORS
        tabBarActiveTintColor: "#FFD600",
        tabBarInactiveTintColor: "#777",

        // 🧠 LABEL STYLING
        tabBarLabelStyle: {
          fontFamily: "JB-Medium",
          fontSize: 11,
          marginBottom: 6,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
