import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/provider/AuthProvider";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack screenOptions={{ headerShown: false, animation: "fade" }} />;
}
