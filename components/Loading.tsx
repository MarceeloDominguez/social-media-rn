import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function Loading() {
  return (
    <View style={styles.containerLoading}>
      <ActivityIndicator size={22} color={Colors.tint} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
