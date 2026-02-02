// app/navigation/RootNavigator.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import Home from "../(tabs)/index"; // adapt path
import Login from "../Login";
import { AuthContext } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const ctx = useContext(AuthContext)!;
  if (ctx.loading) return null; // show splash/loading

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {ctx.user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}