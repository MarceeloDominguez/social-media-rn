import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function FollowButton() {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.buttonText}>Seguir</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tint,
    height: 30,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2,
  },
  buttonText: {
    color: Colors.background,
    fontFamily: "RobotoMedium",
  },
});
