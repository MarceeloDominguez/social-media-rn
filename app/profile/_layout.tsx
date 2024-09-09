import React from "react";
import { Stack } from "expo-router";

export default function ProfileStack() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="index" />
      <Stack.Screen options={{ headerShown: true }} name="edit" />
    </Stack>
  );
}
