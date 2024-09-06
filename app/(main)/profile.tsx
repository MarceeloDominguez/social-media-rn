import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/lib/supabase";

export default function ProfileScreen() {
  const { profile } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => supabase.auth.signOut()}
      >
        <Text style={styles.textButton}>Cerrar sesión</Text>
      </TouchableOpacity>
      <Link href={`/profile/${profile?.id}`} asChild>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Ir a mi perfil</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 22,
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.tint,
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textButton: {
    fontFamily: "RobotoBold",
    color: "#fff",
    fontSize: 13,
  },
});
