import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/provider/AuthProvider";
import { Colors } from "@/constants/Colors";

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.containerIndicator}>
        <ActivityIndicator color={Colors.tint} size={22} />
      </View>
    );
  }

  //Redirige según el estado de autenticación
  return session ? (
    <Redirect href="/(main)" />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  );
}

const styles = StyleSheet.create({
  containerIndicator: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
