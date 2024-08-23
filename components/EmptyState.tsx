import { View, Text } from "react-native";
import React from "react";

export default function EmptyState() {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text>Aún no hay ninguna publicación</Text>
    </View>
  );
}
