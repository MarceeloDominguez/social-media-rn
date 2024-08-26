import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>ProfileScreen {id}</Text>
    </View>
  );
}
